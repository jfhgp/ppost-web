import React, { Component } from 'react';
import NotificationsList from '../components/NotificationsList';
import ApiCalls from '../service/RequestHandler';

export class UserNotifications extends Component {
  state = { data: [] };
  constructor() {
    super();
  }

  componentDidMount() {
    this.getNotifications();
  }

  async didSelectNotification(notification) {
    // const order = await Api.getOrderById({ id: notification.order._id });
  }

  async getNotifications() {
    try {
      const response = await ApiCalls.getNotifications();
      this.setState({ data: response.data });
    } catch (error) {
      //
    }
  }

  render() {
    return (
      <div style={{ flex: 1 }}>
        <NotificationsList
          data={this.state.data}
          didSelectNotification={this.didSelectNotification.bind(this)}
        />
      </div>
    );
  }
}
