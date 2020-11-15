import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { authClass } from '../../../utils/auth.util';
import { withStore } from '../../../utils/store.util';
import ApiCalls from '../../../service/RequestHandler';
import MapViewComponent from './MapViewComponent';

class MapViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myDrivers: [],
      locations: [],
      fetched: false,
      activity: true,
      layout: 'grid',
      status: 'accepted',
      filteredDrivers: [],
      isDialogVisible: false,
      mapViewLocations: [],
      selectedRequest: ''
    };

    this.googleMapsComponentRef = null;
    this.shouldListLayoutComponentUpdate = false;

  }

  componentDidMount() {
    this.getRequests();
  }

  async getRequests() {
    try {
      const { data } = await ApiCalls.getMyRequests(
        {
          status: this.state.status
        }
      );
      this.setState({ mapViewLocations: data })

    } catch (error) {
      console.log(error)
    }
  }

  handleDialogVisibility = ({ visibility, item }) => {
    this.setState({
      selectedRequest: item,
      isDialogVisible: typeof visibility === 'boolean' ? visibility : false
    });
  };

  handleDialogClose = () => {
    this.setState({
      selectedRequest: {},
      isDialogVisible: false
    })
  }


  handleGoogleMapsComponentRef = ref => (this.googleMapsComponentRef = ref);

  render() {
    return (
      <MapViewComponent
        {...this.state}
        options={this.options}
        user={authClass.getUser}
        headings={this.headings}
        history={this.props.history}
        handleChange={this.handleChange}
        handleActiveFilter={this.handleActiveFilter}
        handleSetMyDrivers={this.handleSetMyDrivers}
        handleDialogClose={this.handleDialogClose}
        handleDialogVisibility={this.handleDialogVisibility}
        handleGoogleMapsComponentRef={this.handleGoogleMapsComponentRef}
        shouldListLayoutComponentUpdate={this.shouldListLayoutComponentUpdate}
      />
    );
  }
}

MapViewContainer.propTypes = {
  history: PropTypes.shape(),
  store: PropTypes.shape({
    setWithRender: PropTypes.func,
    setMultiWithRender: PropTypes.func
  })
};

export default withStore(MapViewContainer);
