import React, { Component } from 'react';

import MyVehiclesListComponent from './MyVehiclesListComponent';
import ApiCalls from '../../../service/RequestHandler';

export default class MyVehiclesListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'all',
      filtered: [],
      activity: true,
      myVehicles: [],

      search: ''
    };
  }

  componentDidMount() {
    this.getMyVehicles();
  }

  async getMyVehicles() {
    try {
      const response = await ApiCalls.getMyVehicles();
      this.handleStatusChange(response.data, { target: { value: 'all' } });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  handleStatusChange = (vehicles, filter) => {
    const status = filter.target.value;

    const myVehicles = vehicles || this.state.myVehicles;
    if (status === 'all') {
      this.setState({
        activity: false,
        filtered: myVehicles,
        myVehicles: myVehicles
      });
    } else {
      const splitStatus = status.split('-');
      const filtered = myVehicles.filter(
        item => item[splitStatus[0]].toString() === splitStatus[1]
      );

      this.setState({
        status,
        activity: false,
        filtered: filtered,
        myVehicles: myVehicles
      });
    }
  };

  handleSetVehicles = vehicles => {
    this.handleStatusChange(vehicles, { target: { value: this.state.status } });
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
      <MyVehiclesListComponent
        {...this.state}
        handleSetVehicles={this.handleSetVehicles}
        handleStatusChange={this.handleStatusChange}
        getVehicleCardPicture={this.getVehicleCardPicture}
      />
    );
  }
}
