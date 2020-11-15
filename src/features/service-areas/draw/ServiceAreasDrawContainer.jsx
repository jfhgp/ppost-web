import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ApiCalls from '../../../service/RequestHandler';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';
import SelectLocationReusableComponent from '../../../components/map/SelectLocationReusableComponent';
import { getPrimaryColors } from '../../../utils/functions';

export default class ServiceAreasDrawContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: false,
      drawPolygon: false,

      name: '',
      coordinates: []
    };

    this.mapComponentRef = null;
  }

  componentDidMount() {
    try {
      const { location } = this.props.dialogData;
      if (location.length) {
        setTimeout(() => {
          this.mapComponentRef.mapRef.panTo({
            lat: location[1],
            lng: location[0]
          });
        }, 100);
      }
    } catch (error) {
      //
    }
  }

  handleSaveServiceArea = async () => {
    this.setState({ activity: true });
    const data = {
      type: 'polygon',
      name: this.state.name,
      polygon: {
        type: 'Polygon',
        coordinates: [[...this.state.coordinates, this.state.coordinates[0]]]
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
  };

  handleMapClick = e => {
    const coordinates = [...this.state.coordinates];
    coordinates.push(e.location);
    this.setState({ coordinates, name: e.address });
  };

  handleDrawPolygon = async () => {
    await this.setState({ drawPolygon: true });
    this.mapComponentRef.setZoomForMultipleMarkers(this.state.coordinates);
  };

  handleClearCoordinates = () => {
    this.setState({ coordinates: [], name: '', drawPolygon: false });
  };

  handleSubmit = () => {
    if (!this.state.drawPolygon) {
      this.handleDrawPolygon();
    } else {
      this.handleSaveServiceArea();
    }
  };

  handleMapComponentRef = ref => (this.mapComponentRef = ref);

  render() {
    return (
      <SelectLocationReusableComponent
        ref={this.handleMapComponentRef}
        showInfo
        heading="Draw Service Area"
        drawPolygon={this.state.drawPolygon}
        coordinates={this.state.coordinates}
        handleMapClick={this.handleMapClick}
        info={
          <div
            className="p-grid"
            style={{ margin: '1em 0 0 0', color: getPrimaryColors('primary') }}
          >
            <div className="p-col-12 p-lg-6">
              1. Click anywhere on the map to create a point.
            </div>
            <div className="p-col-12 p-lg-6">
              2. Click on the draw button when you have added at least 3 points.
            </div>
            <div className="p-col-12 p-lg-6">
              3. Click on the save button to save your service area.
            </div>
          </div>
        }
        actions={
          <div>
            <FormSubmitBtn
              label="Back"
              disabled={this.state.activity}
              onSubmit={this.props.handleCloseDialog}
              style={{ borderRadius: 4, width: 'unset' }}
            />
            <FormSubmitBtn
              label="Clear"
              disabled={this.state.activity}
              onSubmit={this.handleClearCoordinates}
              style={{ borderRadius: 4, width: 'unset' }}
            />
            <FormSubmitBtn
              label={this.state.drawPolygon ? 'Save' : 'Draw'}
              onSubmit={this.handleSubmit}
              style={{ borderRadius: 4, width: 'unset' }}
              disabled={
                this.state.activity || this.state.coordinates.length < 3
              }
            />
          </div>
        }
      />
    );
  }
}

ServiceAreasDrawContainer.propTypes = {
  handleCloseDialog: PropTypes.func,
  handleServiceAreasAfterAction: PropTypes.func,
  dialogData: PropTypes.shape({
    location: PropTypes.arrayOf(PropTypes.number)
  }),
  serviceAreas: PropTypes.arrayOf(PropTypes.object)
};
