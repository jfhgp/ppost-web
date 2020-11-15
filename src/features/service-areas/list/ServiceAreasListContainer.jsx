import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { authClass } from '../../../utils/auth.util';
import { withStore } from '../../../utils/store.util';
import ApiCalls from '../../../service/RequestHandler';
import ServiceAreasListComponent from './ServiceAreasListComponent';

class ServiceAreasListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,
      dialogData: {},
      serviceAreas: [],
      currentComp: undefined,
      isDialogVisible: false
    };
  }

  componentDidMount() {
    this.getAllServiceAreas();
  }

  getAllServiceAreas = async () => {
    try {
      const response = await ApiCalls.getAllServiceAreas({
        _id: authClass.getUser._id
      });
      this.setState({ activity: false, serviceAreas: response.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleDeleteServiceArea = (e, _id) => {
    e.stopPropagation();
    this.props.store.setWithRender('messageDialog', {
      open: true,
      title: 'Delete Service Area',
      message: `Are you sure you want to delete this service area ?`,
      action: () => this.deleteServiceArea(_id)
    });
  };

  deleteServiceArea = async _id => {
    this.setState({ activity: true });
    try {
      await ApiCalls.deleteServiceArea({ _id });
      this.setState({
        activity: false,
        serviceAreas: this.state.serviceAreas.filter(item => item._id !== _id)
      });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleDialogVisibility = (value, currentComp, dialogData) => {
    this.setState({
      isDialogVisible: typeof value === 'boolean' ? value : false,
      currentComp: typeof currentComp === 'function' ? currentComp : undefined,
      dialogData: typeof dialogData === 'object' ? dialogData : {}
    });
  };

  handleServiceAreasAfterAction = serviceAreas => {
    this.setState({
      serviceAreas,
      isDialogVisible: false,
      currentComp: undefined,
      dialogData: {}
    });
  };

  render() {
    return (
      <ServiceAreasListComponent
        {...this.state}
        handleDialogVisibility={this.handleDialogVisibility}
        handleDeleteServiceArea={this.handleDeleteServiceArea}
        handleServiceAreasAfterAction={this.handleServiceAreasAfterAction}
      />
    );
  }
}

ServiceAreasListContainer.propTypes = {
  store: PropTypes.shape({ setWithRender: PropTypes.func })
};

export default withStore(ServiceAreasListContainer);
