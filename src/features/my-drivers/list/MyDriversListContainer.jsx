import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { authClass } from '../../../utils/auth.util';
import { withStore } from '../../../utils/store.util';
import ApiCalls from '../../../service/RequestHandler';
import MyDriversListComponent from './MyDriversListComponent';

class MyDriversListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myDrivers: [],
      locations: [],
      fetched: false,
      activity: true,
      layout: 'grid',
      status: 'all',
      filteredDrivers: [],
      isDialogVisible: false
    };

    this.googleMapsComponentRef = null;
    this.shouldListLayoutComponentUpdate = false;
    this.headings = [
      { label: 'Name', sortBy: false },
      { label: 'Phone', sortBy: false },
      { label: 'Status', sortBy: false }
      // { label: 'Current Orders', sortBy: false },
      // { label: 'Delivered Orders Earnings', sortBy: false }

      // { label: 'Order #', sortBy: 'orderNumber', key: ['orderNumber'] },
      // { label: 'Type', sortBy: false },
      // { label: 'Pickup Date', sortBy: 'pickupDate', key: ['pickupDate'] },
      // { label: 'Pickup', sortBy: false },
      // { label: 'Dropoff', sortBy: false },
      // { label: 'Price', sortBy: 'price', key: ['rates', 'price'] },
      // { label: 'Status', sortBy: 'status', key: ['status'] }
    ];
    this.options = [
      { keys: ['firstName', 'lastName'], getLabel: true, type: 'concat' },
      { key: 'mobile' },
      {
        keys: ['active'],
        getLabel: true,
        type: 'bool',
        options: {
          true: 'Active',
          false: 'InActive'
        }
      }
      // {},
      // {}
    ];
  }

  componentDidMount() {
    this.getMyDrivers();
  }

  async getMyDrivers() {
    try {
      const response = await ApiCalls.getMyDrivers();
      const filteredData = this.getDriverData(response.data, this.state.status);
      this.shouldListLayoutComponentUpdate = true;

      await this.setState({
        fetched: true,
        activity: false,
        myDrivers: response.data,
        locations: filteredData.locations,
        filteredDrivers: filteredData.myDrivers
      });
      this.shouldListLayoutComponentUpdate = false;
      this.googleMapsComponentRef.setCenterAndZoom(filteredData.locations);
    } catch (error) {
      this.setState({ activity: false, fetched: true });
    }
  }

  getDriverData = (drivers, status) => {
    let locations = [];
    const myDrivers = [];
    drivers.forEach(driver => {
      if (driver.location) {
        locations.push(driver.location);
      }

      if (status === 'all') {
        myDrivers.push(driver);
      } else if (driver.active.toString() === status) {
        myDrivers.push(driver);
      }
    });
    return { locations, myDrivers };
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleActiveFilter = async e => {
    const value = e.target.value;
    const filteredData = this.getDriverData(this.state.myDrivers, value);
    this.shouldListLayoutComponentUpdate = true;
    await this.setState({
      status: value,
      filteredDrivers: filteredData.myDrivers,
      locations: filteredData.locations
    });
    this.shouldListLayoutComponentUpdate = false;
  };

  // handleDeleteDriver = async driverId => {
  //   this.props.store.setWithRender('messageDialog', {
  //     open: true,
  //     title: 'Delete Driver',
  //     message: `Are you sure you want to delete this driver ?`,
  //     action: () => this.deleteDriver(driverId)
  //   });
  // };

  // deleteDriver = async driverId => {
  //   this.setState({ activity: true });
  //   try {
  //     const response = await ApiCalls.deleteDriverById(driverId);
  //     this.setState({ activity: false, myDrivers: response.data });
  //   } catch (error) {
  //     this.setState({ activity: false });
  //   }
  // };

  // handleBlockDriver = async driver => {
  //   this.props.store.setWithRender(
  //     'messageDialog',
  //     driver.blocked
  //       ? {
  //           open: true,
  //           title: 'Unblock Driver',
  //           message: `Are you sure you want to unblock this driver ?`,
  //           action: () => this.blockDriver(driver)
  //         }
  //       : {
  //           open: true,
  //           title: 'Block Driver',
  //           message: `Are you sure you want to block this driver ?`,
  //           action: () => this.blockDriver(driver)
  //         }
  //   );
  // };

  // blockDriver = async driver => {
  //   this.setState({ activity: true });
  //   try {
  //     const response = await ApiCalls.blockDriver({
  //       driver: driver._id,
  //       blocked: !driver.blocked
  //     });
  //     const myDrivers = this.state.myDrivers.map(item => {
  //       if (item._id === driver._id) {
  //         return response;
  //       }
  //       return item;
  //     });
  //     this.setState({ activity: false, myDrivers });
  //   } catch (error) {
  //     this.setState({ activity: false });
  //   }
  // };

  handleSetMyDrivers = myDrivers => {
    const filteredDrivers = this.getDriverData(myDrivers, this.state.status);
    this.setState({
      myDrivers,
      isDialogVisible: false,
      filteredDrivers: filteredDrivers.myDrivers
    });
  };

  handleDialogVisibility = value => {
    this.setState({
      isDialogVisible: typeof value === 'boolean' ? value : false
    });
  };

  handleGoogleMapsComponentRef = ref => (this.googleMapsComponentRef = ref);

  render() {
    return (
      <MyDriversListComponent
        {...this.state}
        options={this.options}
        user={authClass.getUser}
        headings={this.headings}
        history={this.props.history}
        handleChange={this.handleChange}
        handleActiveFilter={this.handleActiveFilter}
        handleSetMyDrivers={this.handleSetMyDrivers}
        handleDialogVisibility={this.handleDialogVisibility}
        handleGoogleMapsComponentRef={this.handleGoogleMapsComponentRef}
        shouldListLayoutComponentUpdate={this.shouldListLayoutComponentUpdate}
      />
    );
  }
}

MyDriversListContainer.propTypes = {
  history: PropTypes.shape(),
  store: PropTypes.shape({
    setWithRender: PropTypes.func,
    setMultiWithRender: PropTypes.func
  })
};

export default withStore(MyDriversListContainer);
