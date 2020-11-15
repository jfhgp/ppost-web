/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { authClass } from '../../../utils/auth.util';
import { withStore } from '../../../utils/store.util';
import ApiCalls from '../../../service/RequestHandler';
import RequestsDetailsComponent from './RequestsDetailsComponent';

class RequestsDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      error: false,
      activity: true,
      details: undefined,
      myDrivers: undefined,
      myVehicles: undefined,

      driver: '',
      vehicle: ''
    };

    this.vehicleLabelRef = {};
    this._id = props.match.params.id;
  }

  async componentDidMount() {
    await this.getDetails();
    this.getMyVehicles();
    this.getMyDrivers();
  }

  async getDetails() {
    try {
      const response = await ApiCalls.getOrderById({ _id: this._id });
      this.setState({ activity: false, details: response.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  async getMyVehicles() {
    try {
      const response = await ApiCalls.getMyVehicles();
      this.setState({ myVehicles: response.data });
    } catch (error) {
      //
    }
  }

  async getMyDrivers() {
    try {
      const response = await ApiCalls.getMyDrivers();
      this.setState({ myDrivers: response.data });
    } catch (error) {
      //
    }
  }

  handleChange = e => {
    const state = {};
    if (e.target.name === 'vehicle') {
      state.mode = e.currentTarget.dataset.mode;
      state.error = false;
    }
    this.setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  handleAcceptRequest = () => {
    if (this.state.vehicle) {
      this.props.store.setWithRender('messageDialog', {
        open: true,
        title: 'Accept Request',
        message: `Are you sure you want to accept this request ?`,
        action: this.onConfirm
      });
    } else {
      this.setState({ error: true });
    }
  };

  onConfirm = async () => {
    this.setState({ activity: true });
    try {
      const response = await ApiCalls.updateOrderStatus({
        _id: this._id,
        status: 'accepted',
        vehicle: this.state.vehicle,
        driver: this.state.driver
      });

      if (response.data.status === 'accepted') {
        this.setState({ activity: false, details: response.data });
      } else {
        this.setState({ activity: false });
      }
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handlePicturesClick = images => {
    this.props.store.setMultiWithRender({
      lightBoxIsOpen: true,
      lightBoxImages: images.map(item => ({ src: item }))
    });
  };

  handleVehicleLabelRef = ref => (this.vehicleLabelRef = ref);

  render() {
    return (
      <RequestsDetailsComponent
        {...this.state}
        user={authClass.getUser}
        handleChange={this.handleChange}
        vehicleLabelRef={this.vehicleLabelRef}
        handleAcceptRequest={this.handleAcceptRequest}
        handlePicturesClick={this.handlePicturesClick}
        handleVehicleLabelRef={this.handleVehicleLabelRef}
      />
    );
  }
}

RequestsDetailsContainer.propTypes = {
  store: PropTypes.shape({
    setWithRender: PropTypes.func,
    setMultiWithRender: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string })
  })
};

export default withStore(RequestsDetailsContainer);
