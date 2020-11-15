import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectLocationReusableComponent from '../../../components/map/SelectLocationReusableComponent';

export default class ServiceAreasEditDrawContainer extends Component {
  constructor(props) {
    super(props);
    this.coordinates = props.dialogData.polygon.coordinates[0];
    this.state = {
      activity: false,
      drawPolygon: true,

      name: props.dialogData.name,
      coordinates: [...this.coordinates.slice(0, this.coordinates.length - 1)]
    };
  }

  render() {
    return (
      <SelectLocationReusableComponent
        editable={false}
        drawPolygon={true}
        heading={this.state.name}
        coordinates={this.state.coordinates}
      />
    );
  }
}

ServiceAreasEditDrawContainer.propTypes = {
  dialogData: PropTypes.shape({
    name: PropTypes.string,
    polygon: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.array)
    })
  })
};
