import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ApiCalls from '../../service/RequestHandler';
import NotificationsComponent from './NotificationsComponent';
import { newGrowl } from '../../components/ui/GrowlComponent';

export default class NotificationsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,
      notifications: [],
      isDialogVisible: false,
      component: ''
    };

    this.userType = props.match.params.userType || 'user';
  }

  componentDidMount() {
    this.getUserNotifications();
  }

  async getUserNotifications() {
    try {
      const response = await ApiCalls.getNotifications();
      this.setState({ activity: false, notifications: response.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  handleChange = state => {
    this.setState({
      isDialogVisible: state.open,
      component: state.comp
    });
  };

  handleAcceptModification = async id => {
    this.setState({ activity: true });
    try {
      const response = await ApiCalls.acceptReschedule({
        _id: id
      });
      newGrowl.showGrowl(
        'success',
        'Success',
        'You accepted the rescheduling request successfully.'
      );
      this.setState({ activity: false, isDialogVisible: false });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleCloseDialog = () => {
    this.setState({
      isDialogVisible: false
    });
  };

  handleMarkAsRead = (e, flag) => {
    e.stopPropagation();
    const {
      id: _id,
      index
    } = e.currentTarget.parentElement.parentElement.dataset;

    this.toggleNotificationAsRead(_id, index, flag);
  };

  handleNotificationClick = async (e, flag) => {
    e.stopPropagation();

    if (!flag) {
      const { id: _id, index } = e.currentTarget.dataset;
      this.markNotificationAsRead(_id, index, flag);
    }
  };

  markNotificationAsRead = async (_id, index) => {
    this.setState({ activity: true });
    try {
      const response = await ApiCalls.markNotificationAsRead({
        _id,
        flag: true
      });
      const newNotifications = [...this.state.notifications];
      newNotifications[index] = response.data;
      this.setState({ notifications: newNotifications, activity: false });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  toggleNotificationAsRead = async (_id, index, flag) => {
    this.setState({ activity: true });
    try {
      const response = await ApiCalls.markNotificationAsRead({
        _id,
        flag: !flag
      });
      const newNotifications = [...this.state.notifications];
      newNotifications[index] = response.data;
      this.setState({ notifications: newNotifications, activity: false });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  render() {
    return (
      <NotificationsComponent
        {...this.state}
        userType={this.userType}
        handleMarkAsRead={this.handleMarkAsRead}
        handleChange={this.handleChange}
        handleCloseDialog={this.handleCloseDialog}
        handleAcceptModification={this.handleAcceptModification}
        handleNotificationClick={this.handleNotificationClick}
      />
    );
  }
}

NotificationsContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ userType: PropTypes.string })
  })
};
