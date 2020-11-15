import React, { Component } from 'react';

import ApiCalls from '../../../service/RequestHandler';
import VehiclesFormContainer from '../VehiclesFormContainer';

class MyVehiclesUpdateContainer extends Component {
  state = {
    updateVehicleData: {}
  };

  async componentDidMount() {
    try {
      const response = await ApiCalls.getVehicleById({
        _id: this.props.match.params.id
      });
      console.log("This is vehicle by id", response.data)
      this.setState({
        updateVehicleData: response.data
      });
    } catch (error) {
      //
    }
  }

  render() {
    return (
      <VehiclesFormContainer
        heading="Mode of Transportation Details"
        updateVehicleData={this.state.updateVehicleData}
      />
    );
  }
}
export default MyVehiclesUpdateContainer;
