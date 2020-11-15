import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { authClass } from '../../../utils/auth.util';
import { withStore } from '../../../utils/store.util';
import ApiCalls from '../../../service/RequestHandler';
import ServiceAreasComponent from './ServiceAreasComponent';
import ServiceAreasAddContainer from '../../service-areas/add/ServiceAreasAddContainer';
import ServiceAreasDrawContainer from '../../service-areas/draw/ServiceAreasDrawContainer';
import ServiceAreasEditContainer from '../../service-areas/add/ServiceAreasEditContainer';
import ServiceAreasEditDrawContainer from '../../service-areas/draw/ServiceAreaEditDrawContainer';

class ServiceAreasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: '',
      activity: true,
      dialogData: {},
      serviceAreas: [],
      isDialogVisible: false
    };
  }

  componentDidMount() {
    if (this.props.forceGetFromId && this.props._id) {
      this.getAllServiceAreas();
    }
    if (!this.props.forceGetFromId) {
      this.getAllServiceAreas();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.forceGetFromId && !prevProps._id && this.props._id) {
      this.getAllServiceAreas();
    }
  }

  getAllServiceAreas = async () => {
    try {
      const response = await ApiCalls.getAllServiceAreas({
        _id: this.props._id || authClass.getUser._id
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
      className: 'danger',
      actionBtnLabel: 'Delete',
      title: 'Are you sure you want to delete?',
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

  handleSetCurrentComponent = (component, dialogData = {}) => {
    this.setState({
      component,
      dialogData,
      isDialogVisible: true,
      id: this.props._id
    });
  };

  handleGetComponent = component => {
    switch (component) {
      case 'service-area-add': {
        return ServiceAreasAddContainer;
      }
      case 'service-area-draw': {
        return ServiceAreasDrawContainer;
      }
      case 'service-area-view': {
        return ServiceAreasEditContainer;
      }
      case 'service-area-draw-view': {
        return ServiceAreasEditDrawContainer;
      }
      default: {
        return () => null;
      }
    }
  };

  handleCloseDialog = () => {
    if (this.state.component === 'service-area-draw') {
      this.setState({
        dialogData: {},
        component: 'service-area-add'
      });
    } else {
      this.setState({
        dialogData: {},
        isDialogVisible: false
      });
    }
  };

  handleServiceAreasAfterAction = serviceAreas => {
    this.setState({ serviceAreas, dialogData: {}, isDialogVisible: false });
  };

  render() {
    return (
      <>
        <div className="heading-with-add-icon">
          <h3>Service Area</h3>
          {!this.props.disableAdd ? (
            <i
              aria-hidden="true"
              className="fa fa-plus-circle"
              style={{ cursor: 'pointer' }}
              onClick={() => this.handleSetCurrentComponent('service-area-add')}
            ></i>
          ) : null}
        </div>
        <div
          id="service-area"
          style={{
            border: '1px solid #fa7816',
            height: 200,
            overflow: 'hidden',
            overflowY: 'auto'
          }}
        >
          <ServiceAreasComponent
            {...this.state}
            id={this.props._id}
            handleCloseDialog={this.handleCloseDialog}
            handleGetComponent={this.handleGetComponent}
            handleDeleteServiceArea={this.handleDeleteServiceArea}
            handleSetCurrentComponent={this.handleSetCurrentComponent}
            handleServiceAreasAfterAction={this.handleServiceAreasAfterAction}
          />
        </div>
      </>
    );
  }
}

ServiceAreasContainer.propTypes = {
  _id: PropTypes.string,
  disableAdd: PropTypes.bool,
  forceGetFromId: PropTypes.bool,
  store: PropTypes.shape({ setWithRender: PropTypes.func })
};

export default withStore(ServiceAreasContainer);
