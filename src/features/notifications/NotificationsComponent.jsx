import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import moment from 'moment';
import { Dialog } from '@material-ui/core';
import Page from '../../components/layout/Page';
import routes from '../../constants/route-constants';
import EmptyPlaceholder from '../../components/ui/EmptyPlaceholder';
import { Tooltip } from '@material-ui/core';
import ContainerLayout from '../../components/layout/ContainerLayout';
import RescheduleRequest from './components/RescheduleRequest';

const NotificationsComponent = props => {
  const {
    activity,
    notifications,
    handleAcceptModification,
    handleCloseDialog,
    isDialogVisible,
    component
  } = props;
  console.log("THis is the all notification props", props)
  return (
    <Page activity={activity} className="notifications-container" noActivity>
      <div className="page-title">
        <span>Notifications</span>
      </div>
      <ContainerLayout addStyle={{ padding: '2rem' }}>
        {notifications.length ? (
          notifications.map((notification, index) => (
            <div
              className="p-col-12 notification"
              key={notification._id}
              style={{ padding: '0 0.5em' }}
              data-index={index}
              data-id={notification._id}
              onClick={e => props.handleNotificationClick(e, notification.read)}
            >
              <div
                style={{
                  backgroundColor:
                    notification.status === 'new' ? 'rgb(225,225,225)' : '#fff'
                }}
              >
                {notification.type === 'reschedule' || notification.type === 'change_location' || notification.type === 'price_change' ? (
                  <Link
                    to="#"
                    onClick={() =>
                      props.handleChange({
                        open: true,
                        comp: notification
                      })
                    }
                  >
                    <div>
                      <img
                        alt=""
                        src={
                          (notification.user && notification.user.picture) ||
                          `${process.env.PUBLIC_URL}/assets/layout/images/avatar_3.png`
                        }
                      />
                    </div>
                    <div>
                      <p style={{ margin: '0 1em 0 0' }}>
                        {notification.message}
                      </p>
                      <div className="text-right" style={{ flexGrow: 1 }}>
                        {moment(notification.createdAt).fromNow()}
                      </div>
                    </div>
                  </Link>
                ) : (
                    <Link
                      to={`/${props.userType}/${routes.orders}/${routes.orderDetail}/${notification.order._id}`}
                    >
                      <div>
                        <img
                          alt=""
                          src={
                            (notification.user && notification.user.picture) ||
                            `${process.env.PUBLIC_URL}/assets/layout/images/avatar_3.png`
                          }
                        />
                      </div>
                      <div>
                        <p style={{ margin: '0 1em 0 0' }}>
                          {notification.message}
                        </p>
                        <div className="text-right" style={{ flexGrow: 1 }}>
                          {moment(notification.createdAt).fromNow()}
                        </div>
                      </div>
                    </Link>
                  )}

                <Tooltip
                  title={notification.read ? 'Mark as unread' : 'Mark as read'}
                >
                  <button
                    data-index={index}
                    data-id={notification._id}
                    onClick={e => props.handleMarkAsRead(e, notification.read)}
                  >
                    <i className="fas fa-circle" />
                  </button>
                </Tooltip>
              </div>
            </div>
          ))
        ) : (
            <div className="p-col-12">
              <EmptyPlaceholder message="We could not find any notifications." />
            </div>
          )}
      </ContainerLayout>
      <Dialog maxWidth="md" open={isDialogVisible} onClose={handleCloseDialog}>
        <RescheduleRequest
          {...props}
          handleAcceptModification={handleAcceptModification}
          handleCloseDialog={handleCloseDialog}
          notification={component}
        />
      </Dialog>
    </Page>
  );
};

NotificationsComponent.propTypes = {
  activity: PropTypes.bool,
  userType: PropTypes.string,
  handleMarkAsRead: PropTypes.func,
  handleNotificationClick: PropTypes.func,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      status: PropTypes.string,
      type: PropTypes.string,
      createdAt: PropTypes.string,
      message: PropTypes.string,
      order: PropTypes.shape({ _id: PropTypes.string })
    })
  )
};

export default NotificationsComponent;
