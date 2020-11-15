import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStore } from '../../../utils/store.util';
import ApiCalls from '../../../service/RequestHandler';
import DriverRequests from '../components/DriverRequests';
import MyDriversProfileComponent from './MyDriversProfileComponent';
import TravellingInformationAddContainer from '../../profile/travelling-information/add/TravellingInformationAddContainer';
import TravellingInformationUpdateContainer from '../../profile/travelling-information/update/TravellingInformationUpdateContainer';
class MyDriversProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,
      profile: {},
      component: '',
      isDialogVisible: false
    };

    this.driverId = props.match.params.driverId;
  }

  componentDidMount() {
    this.getProfile();
  }

  async getProfile() {
    try {
      const _id = this.props.match.params.driverId;
      // eslint-disable-next-line no-console
      console.log('THis is the driver id', _id);
      const response = await ApiCalls.getTransporterProfileById({ _id });
      this.setState({ activity: false, profile: response.data });
      // const response = await ApiCalls.getMyDrivers();
      // ([
      //   ApiCalls.getMyDrivers(),
      //   ApiCalls.getOrdersByDriver({
      //     driverId: this.driverId,
      //     status: this.state.status
      //   })
      // ]);
      // const profile = response.data.filter(
      //   item => item._id === this.props.match.params.driverId
      // );

      //this.setState({ activity: false, profile: profile[0] });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  // async getOrders(status) {
  //   this.setState({ activity: true });
  //   try {
  //     const response = await ApiCalls.getOrdersByDriver({
  //       driverId: this.driverId,
  //       status
  //     });
  //     const profile = { ...this.state.profile };
  //     profile.orders = response.data;

  //     this.setState({ activity: false, profile });
  //   } catch (error) {
  //     this.setState({ activity: false });
  //   }
  // }

  handleDeleteDriver = async () => {
    this.props.store.setWithRender('messageDialog', {
      open: true,
      className: 'danger',
      actionBtnLabel: 'Delete',
      title: 'Are you sure you want to delete?',
      action: this.deleteDriver
    });
  };

  deleteDriver = async () => {
    this.setState({ activity: true });
    try {
      const response = await ApiCalls.deleteDriverById(this.driverId);
      this.setState({
        activity: false,
        profile: response.data.filter(item => item._id === this.driverId)[0]
      });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleBlockDriver = async () => {
    this.props.store.setWithRender(
      'messageDialog',
      this.state.profile.blocked
        ? {
            open: true,
            actionBtnLabel: 'Yes',
            title: 'Are you sure you want to unblock?',
            action: this.blockDriver
          }
        : {
            open: true,
            className: 'danger',
            actionBtnLabel: 'Block',
            title: 'Are you sure you want to block?',
            action: this.blockDriver
          }
    );
  };

  blockDriver = async () => {
    this.setState({ activity: true });
    try {
      const response = await ApiCalls.blockDriver({
        driver: this.driverId,
        blocked: !this.state.profile.blocked
      });
      response.orders = this.state.profile.orders;
      this.setState({ activity: false, profile: response });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleSetCurrentComponent = (component, componentData = null) => {
    this.setState({
      component,
      componentData,
      isDialogVisible: true
    });
  };

  handleGetComponent = component => {
    switch (component) {
      case 'travelling-add': {
        return TravellingInformationAddContainer;
      }
      case 'travelling-update': {
        return TravellingInformationUpdateContainer;
      }
      case 'driver-requests': {
        return DriverRequests;
      }
      default: {
        return () => null;
      }
    }
  };

  handleInformation = travelling => {
    this.setState({
      component: '',
      componentData: null,
      isDialogVisible: false,
      profile: { ...this.state.profile, travelling }
    });
  };

  handleCloseDialog = () => {
    this.setState({
      component: '',
      componentData: null,
      isDialogVisible: false
    });
  };

  getVehicleCardPicture = mode => {
    switch (mode) {
      case 'car':
        return require('../../../static/icons/car-box-icon.png');
      case 'sea':
        return require('../../../static/icons/sea-box-icon.png');
      case 'air':
        return require('../../../static/icons/air-box-icon.png');
      case 'bus':
        return require('../../../static/icons/bus-box-icon.png');
      case 'train':
        return require('../../../static/icons/train-box-icon.png');
      case 'van':
        return require('../../../static/icons/van-box-icon.png');
      case 'truck':
        return require('../../../static/icons/truck-box-icon.png');
      // case 'bike':
      //   return require('../../../static/icons/bike-box-icon.png');

      default:
        return require('../../../static/icons/car-box-icon.png');
    }
  };

  render() {
    return (
      <MyDriversProfileComponent
        {...this.state}
        handleInformation={this.handleInformation}
        handleCloseDialog={this.handleCloseDialog}
        handleBlockDriver={this.handleBlockDriver}
        handleDeleteDriver={this.handleDeleteDriver}
        handleGetComponent={this.handleGetComponent}
        handleSetCurrentComponent={this.handleSetCurrentComponent}
        getVehicleCardPicture={this.getVehicleCardPicture}
      />
    );
  }
}

MyDriversProfileContainer.propTypes = {
  store: PropTypes.shape({
    setWithRender: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({ driverId: PropTypes.string })
  })
};

export default withStore(MyDriversProfileContainer);
