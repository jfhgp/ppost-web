import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DialogTitle, DialogActions } from '@material-ui/core';
import FormInputS from '../../../../components/form/FormInputS';
import { capitalize } from '../../../../utils/functions';
import ApiCalls from '../../../../service/RequestHandler';
// import { withStore } from '../../../../utils/store.util';
import FormSubmitBtn from '../../../../components/form/FormSubmitBtn';
import { newGrowl } from '../../../../components/ui/GrowlComponent';
import FormNativeSelectInputField from '../../../../components/form/FormNativeSelectInputField';

const getVehicleName = vehicle => {
  if (vehicle._id) {
    switch (vehicle.mode) {
      case 'train':
      // fall through
      case 'sea':
      // fall through
      case 'bus': {
        return `${capitalize(vehicle.mode)} - ${vehicle.information}`;
      }
      case 'air': {
        return `${capitalize(vehicle.mode)} - ${vehicle.airline} ${
          vehicle.flightNumber
        }`;
      }
      default:
        return `${capitalize(vehicle.mode)} - ${vehicle.make} ${
          vehicle.model
        } ${vehicle.numberPlate}`;
    }
  }
  return 'Select a vehicle';
};

const driverModes = ['car', 'van', 'truck', 'bike'];

class AcceptOrderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      error: false,
      activity: true,
      myDrivers: [],
      myVehicles: [],
      promo: '',
      vehicle: { label: 'Select a vehicle', value: '' },
      driver: { firstName: 'Select a driver', lastName: '', _id: '' }
    };
  }

  componentDidMount() {
    this.getMyDrivers();
    this.getMyVehicles();
  }

  async getMyVehicles() {
    try {
      const response = await ApiCalls.getMyVehicles();
      this.setState({ myVehicles: response.data, activity: false });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  async getMyDrivers() {
    try {
      const response = await ApiCalls.getMyDrivers();
      this.setState({
        myDrivers: response.data.filter(item => item.active === true)
      });
    } catch (error) {
      //
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    const temp = {};
    if (name === 'vehicle') {
      temp.mode = value.mode;
      temp.error = false;
    }

    this.setState({
      ...temp,
      [name]: value
    });
  };

  handleAcceptRequest = async () => {
    if (this.state.vehicle._id) {
      this.setState({ activity: true });
      const params = {
        _id: this.props.details._id,
        status: 'accepted',
        promoCode: this.state.promo,
        vehicle: this.state.vehicle._id,
        ...(this.state.driver._id ? { driver: this.state.driver._id } : {})
      };
      // eslint-disable-next-line no-console
      try {
        const response = await ApiCalls.updateOrderStatus(params);

        if (response.data.status === 'accepted') {
          this.props.handleSetDetails(response.data);
        } else {
          this.setState({ activity: false });
        }
      } catch (error) {
        newGrowl.showGrowl('error', 'Error', error.response.data.message);
        this.setState({ activity: false });
      }
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { activity } = this.state;

    return (
      <div className="accept-request-dialog">
        <DialogTitle>Accept Request</DialogTitle>
        <div>
          <div style={{ paddingBottom: '1rem' }}>
            <FormInputS
              name="promo"
              value={this.state.promo}
              onChange={this.handleChange}
              placeholder="Enter Promo Code"
            />
          </div>
          <div>
            <FormNativeSelectInputField
              valueKey="_id"
              isLoading={activity}
              name="vehicle"
              type="react-select"
              style={{ padding: 0 }}
              error={this.state.error}
              value={this.state.vehicle}
              onChange={this.handleChange}
              options={this.state.myVehicles}
              getOptionValue={item => item._id}
              formatOptionLabel={item => getVehicleName(item)}
            />
          </div>
          {driverModes.indexOf(this.state.mode) !== -1 ? (
            <div style={{ paddingTop: '1em' }}>
              <FormNativeSelectInputField
                valueKey="_id"
                name="driver"
                isLoading={activity}
                type="react-select"
                style={{ padding: 0 }}
                value={this.state.driver}
                onChange={this.handleChange}
                options={
                  this.state.vehicle.drivers.length
                    ? this.state.vehicle.drivers.filter(
                        item => item.active === true
                      )
                    : this.state.myDrivers
                }
                getOptionValue={item => item._id}
                formatOptionLabel={item => `${item.firstName} ${item.lastName}`}
              />
            </div>
          ) : null}
        </div>
        <DialogActions>
          <FormSubmitBtn
            label="Back"
            disabled={activity}
            onSubmit={this.props.handleDialogClose}
            style={{ width: 'unset', borderRadius: 4 }}
          />
          <FormSubmitBtn
            label="Accept Request"
            disabled={activity}
            onSubmit={this.handleAcceptRequest}
            style={{
              width: 'unset',
              borderRadius: 4
            }}
          />
        </DialogActions>
      </div>
    );
  }
}

AcceptOrderComponent.propTypes = {
  details: PropTypes.shape(),
  handleSetDetails: PropTypes.func,
  handleDialogClose: PropTypes.func
  // store: PropTypes.shape({ setWithRender: PropTypes.func })
};

export default AcceptOrderComponent;
// export default withStore(AcceptOrderComponent);
