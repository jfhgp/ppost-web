import React, { Component } from 'react';

import ApiCalls from '../../../service/RequestHandler';
import VehiclesFormContainer from '../SpacesFormContainer';

class MyVehiclesUpdateContainer extends Component {
  state = {
    updateVehicleData: {}
  };

  async componentDidMount() {
    try {
      const response = await ApiCalls.getVehicleById({
        _id: this.props.match.params.id
      });
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
        heading="Space Details"
        updateVehicleData={this.state.updateVehicleData}
      />
    );
  }
}
export default MyVehiclesUpdateContainer;
