import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStore } from '../../../utils/store.util';
import ApiCalls from '../../../service/RequestHandler';
import { getPrimaryColors } from '../../../utils/functions';
import { newGrowl } from '../../../components/ui/GrowlComponent';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';
import FormNativeSelectInputField from '../../../components/form/FormNativeSelectInputField';

class AssignToDriverComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      activity: true,
      myDrivers: [],
      driver: { firstName: 'Select a driver', lastName: '', value: '' }
    };
  }

  componentDidMount() {
    this.getMyDrivers();
  }

  async getMyDrivers() {
    try {
      const response = await ApiCalls.getMyDrivers();
      let assigned = false;

      const myDrivers = response.data.filter(driver => {
        if (this.props.drivers.indexOf(driver._id) !== -1) {
          assigned = driver;
        }
        // return driver;
        return driver.active === true;
      });
      this.setState({
        myDrivers,
        activity: false,
        ...(assigned ? { driver: assigned } : {})
      });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  handleChange = e => {
    this.setState({
      driver: e.target.value,
      error: false
    });
  };

  handleAssignDriver = () => {
    if (this.state.driver._id) {
      this.props.store.setWithRender('messageDialog', {
        open: true,
        title: 'Are you sure you want to assign this driver?',
        actionBtnLabel: 'Yes',
        action: this.handleConfirm
      });
    } else {
      this.setState({ error: true });
    }
  };

  handleConfirm = async () => {
    this.setState({ activity: true });
    try {
      const response = await ApiCalls.assignDriver({
        _id: this.props._id,
        driver: this.state.driver._id
      });
      newGrowl.showGrowl(
        'success',
        'Success',
        `This vehicle was assigned to ${this.state.driver.firstName} ${this.state.driver.lastName}.`
      );
      this.setState({ activity: false });
      this.props.handleDriversAfterAction(response.data.drivers);
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleRemoveDriver = () => {
    if (this.state.driver._id) {
      this.props.store.setWithRender('messageDialog', {
        open: true,
        title: 'Are you sure you want to remove this driver?',
        actionBtnLabel: 'Yes',
        action: this.handleRemove
      });
    } else {
      this.setState({ error: true });
    }
  };

  handleRemove = async () => {
    this.setState({ activity: true });
    try {
      const response = await ApiCalls.removeDriver({
        _id: this.props._id,
        driver: this.state.driver._id
      });
      newGrowl.showGrowl('success', 'Success', '');
      this.setState({
        activity: false,
        driver: { firstName: 'Select a driver', lastName: '', value: '' }
      });
      this.props.handleDriversAfterAction(response.data.drivers);
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  render() {
    const { activity } = this.state;

    return (
      <>
        <div
          style={{
            fontWeight: 'bold',
            color: getPrimaryColors('primary'),
            fontSize: '18px',
            paddingLeft: 0
          }}
        >
          Assign to Driver
        </div>
        <div style={{ paddingTop: '1em' }}>
          <FormNativeSelectInputField
            valueKey="_id"
            name="driver"
            type="react-select"
            style={{ padding: 0 }}
            error={this.state.error}
            value={this.state.driver}
            onChange={this.handleChange}
            options={this.state.myDrivers}
            getOptionValue={item => item._id}
            formatOptionLabel={item => `${item.firstName} ${item.lastName}`}
          />
        </div>
        <div style={{ paddingTop: '1em', textAlign: 'right' }}>
          <FormSubmitBtn
            label="Remove Driver"
            disabled={activity || !this.props.drivers.length}
            onSubmit={this.handleRemoveDriver}
            style={{ width: 'unset', borderRadius: 4, margin: '0 10px' }}
          />
          <FormSubmitBtn
            label="Assign"
            disabled={activity}
            onSubmit={this.handleAssignDriver}
            style={{ width: 'unset', borderRadius: 4, margin: 0 }}
          />
        </div>
      </>
    );
  }
}

AssignToDriverComponent.defaultProps = {
  drivers: []
};

AssignToDriverComponent.propTypes = {
  _id: PropTypes.string,
  details: PropTypes.shape(),
  handleSetDetails: PropTypes.func,
  handleDialogClose: PropTypes.func,
  handleDriversAfterAction: PropTypes.func,
  drivers: PropTypes.arrayOf(PropTypes.string),
  store: PropTypes.shape({ setWithRender: PropTypes.func })
};

export default withStore(AssignToDriverComponent);
