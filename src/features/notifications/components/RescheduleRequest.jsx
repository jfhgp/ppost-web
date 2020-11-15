import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../../constants/route-constants';
import { DialogTitle, DialogActions, DialogContent } from '@material-ui/core';

import ApiCalls from '../../../service/RequestHandler';
import RescheduleCard from './RescheduleCard';
import LocationChangeCard from './LocationChangeCard';
import TimeChangeCard from "./TimeChangeCard";
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';
import { authClass } from '../../../utils/auth.util';
import EmptyPlaceholder from '../../../components/ui/EmptyPlaceholder';

class RescheduleRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log: {},
      rates: {}
    };
  }

  async componentDidMount() {
    this.getModificationlog();
    this.getOrderDetails();
  }

  async getModificationlog() {
    try {
      const response = await ApiCalls.modificationLog({
        _id: this.props.notification.modificationLog
      });

      this.setState({ log: response.data });
    } catch (error) {
      console.log(error)
    }
  }


  async getOrderDetails() {
    const { order } = this.props.notification;
    try {
      const { data } = await ApiCalls.getOrderById({ _id: order._id });
      this.setState({ rates: data.rates });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  render() {
    const { log } = this.state;
    const { notification, activity } = this.props;

    return (
      <div className="cancel-request-dialog">
        <DialogTitle>{(notification.type === "change_location") ? "Change Location Request" : (notification.type === "price_change") ? "Change Price Request" : "Request Reschedule"}</DialogTitle>

        <DialogContent>

          {(notification.type === "reschedule") ? (
            <RescheduleCard
              {...this.state}
              request={notification}
              user={authClass.getUser}
            // goTo={routes.orders}
            />
          ) : (notification.type === "change_location") ? (
            <LocationChangeCard
              {...this.state}
              request={notification}
              user={authClass.getUser}
            // goTo={routes.orders}
            />
          ) :
              (
                <TimeChangeCard
                  {...this.state}
                  request={notification}
                  user={authClass.getUser}
                // goTo={routes.orders}
                />
              )

          }
          {log.status === 'approved' ? (
            <div className="p-col-12">
              <h3
                className="heading"
                style={{ textAlign: 'center', color: 'green' }}
              >
                This request has been accepted already
              </h3>
            </div>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Link
            to={`/${this.props.userType}/${routes.orders}/${routes.orderDetail}/${notification.order._id}`}
          >
            <FormSubmitBtn
              label="See More Details"
              disabled={activity}
              style={{
                width: 'unset',
                borderRadius: 4
              }}
            />
          </Link>
          <FormSubmitBtn
            label="Cancel"
            disabled={activity}
            onSubmit={this.props.handleCloseDialog}
            style={{
              width: 'unset',
              borderRadius: 4
            }}
          />
          {log.status === 'pending' ? (
            <FormSubmitBtn
              label="Accept"
              disabled={activity}
              onSubmit={() => {
                if (
                  window.confirm(
                    'Are you sure you wish to accept this request?'
                  )
                )
                  this.props.handleAcceptModification(
                    notification.modificationLog
                  );
              }}
              style={{
                width: 'unset',
                borderRadius: 4
              }}
            />
          ) : null}
        </DialogActions>
      </div>
    );
  }
}

RescheduleRequests.propTypes = {
  handleCloseDialog: PropTypes.func,
  handleAcceptModification: PropTypes.func,
  profile: PropTypes.shape({ _id: PropTypes.string })
};

export default RescheduleRequests;
