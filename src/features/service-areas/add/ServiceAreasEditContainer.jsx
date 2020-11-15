import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectLocationReusableComponent from '../../../components/map/SelectLocationReusableComponent';

export default class ServiceAreasEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: false,

      name: props.dialogData.name,
      location: [...props.dialogData.location]
    };
  }

  render() {
    return (
      <SelectLocationReusableComponent
        showRadius
        editable={false}
        addressKey="name"
        heading={this.state.name}
        location={this.state.location}
        handleSelectPlace={this.handleSelectPlace}
      />
    );
  }
}

ServiceAreasEditContainer.propTypes = {
  handleServiceAreasAfterAction: PropTypes.func,
  dialogData: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.arrayOf(PropTypes.number)
  }),
  serviceAreas: PropTypes.arrayOf(PropTypes.shape())
};
