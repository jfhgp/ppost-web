import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ApiCalls from '../../../service/RequestHandler';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';
import SelectLocationReusableComponent from '../../../components/map/SelectLocationReusableComponent';

export default class ServiceAreasAddContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: false,

      name: '',
      location: []
    };

    this.mapComponentRef = null;
  }

  handleAddServiceArea = async () => {
    if (this.state.location.length) {
      this.setState({ activity: true });
      const data = {
        location: {
          type: 'location',
          name: this.state.name,
          location: this.state.location,
          driver: this.props.id
        }
      };
      try {
        const response = await ApiCalls.addServiceArea(data);
        const serviceAreas = [...this.props.serviceAreas];
        serviceAreas.push(response.data);
        this.props.handleServiceAreasAfterAction(serviceAreas);
      } catch (error) {
        this.setState({ activity: false });
      }
    }
  };

  handleSelectPlace = e => {
    this.setState({
      location: e.location,
      name: e.name
    });
    this.mapComponentRef.setZoomForSingleMarker(e.location);
  };

  handleMapComponentRef = ref => (this.mapComponentRef = ref);

  render() {
    return (
      <SelectLocationReusableComponent
        ref={this.handleMapComponentRef}
        showRadius
        editable={true}
        addressKey="name"
        heading="Add Service Area"
        location={this.state.location}
        handleMapClick={this.handleSelectPlace}
        handleSelectPlace={this.handleSelectPlace}
        actions={
          <div>
            <FormSubmitBtn
              label="Back"
              disabled={this.state.activity}
              onSubmit={this.props.handleCloseDialog}
              style={{ borderRadius: 4, width: 'unset' }}
            />
            <FormSubmitBtn
              label="Draw Service Area"
              disabled={this.state.activity}
              style={{ borderRadius: 4, width: 'unset' }}
              onSubmit={() =>
                this.props.handleSetCurrentComponent('service-area-draw', {
                  location: this.state.location
                })
              }
            />
            <FormSubmitBtn
              label="Submit"
              disabled={this.state.activity}
              onSubmit={this.handleAddServiceArea}
              style={{ borderRadius: 4, width: 'unset' }}
            />
          </div>
        }
      />
    );
  }
}

ServiceAreasAddContainer.propTypes = {
  handleCloseDialog: PropTypes.func,
  handleSetCurrentComponent: PropTypes.func,
  handleServiceAreasAfterAction: PropTypes.func,
  id: PropTypes.string,
  serviceAreas: PropTypes.arrayOf(PropTypes.shape())
};
