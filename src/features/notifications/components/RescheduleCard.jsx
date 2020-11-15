import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import moment from 'moment';
import { timeFormat } from '../../../constants/project-constants';
import routes from '../../../constants/route-constants';
import { dateFormat } from '../../../constants/project-constants';

const RescheduleCard = props => {
  const { request, user, log } = props;
  const order = request.order || {};
  const requestedLog = log.changelog || {};
  return (
    <div className="p-col-12 p-md-12 p-lg-12">
      <p className="heading">Order Summary</p>
      <div className="r-list-request-card">
        <div className="item">
          <img alt="" src={require('../../../static/icons/icon-orderID.png')} />
          <span>{order.orderNumber}</span>
        </div>
        <div className="multiple-items">
          <div className="item">
            <img alt="" src={require('../../../static/icons/icon-Date.png')} />
            <span>{moment(order.pickupDate).format(dateFormat)}</span>
          </div>
          <div className="item">
            <img
              alt=""
              src={require('../../../static/icons/icon-package.png')}
            />
            <span style={{ textTransform: 'capitalize' }}>
              {order.deliveryType}
            </span>
          </div>
        </div>
        <div style={{ flexGrow: 1 }}>
          <div className="item">
            <img
              alt=""
              src={require('../../../static/icons/icon-Pickup.png')}
              style={{ alignSelf: 'flex-start' }}
            />
            <span>{order.pickup.address}</span>
          </div>
          <div className="item">
            <img
              alt=""
              src={require('../../../static/icons/icon-DropOff.png')}
            />
            <span style={{}}>{order.dropoff.address}</span>
          </div>
        </div>
        <div>
          {/* {rates ? (
          <div className="item">
            <img alt="" src={require('../../../static/icons/icon-Price.png')} />
            <span>
              Price : {user.config.currency}{' '}
              {user.userType === 'transporter'
                ? (rates.price * 0.8).toFixed(2)
                : rates.price.toFixed(2)}
            </span>
          </div>
        ) : null} */}
          {/* <div className="multiple-items">
          {request.status === 'pending' ? (
            <div className="item">
              <img
                alt=""
                src={require('../../../static/icons/icon-status.png')}
              />
              <span
                style={{
                  textTransform: 'capitalize',
                  backgroundColor: '#f0ad4e',
                  paddingLeft: 10,
                  paddingRight: 10
                }}
              >
                {request.status === 'pending' ? 'waiting' : request.status}
              </span>
            </div>
          ) : (
            <div className="item">
              <img
                alt=""
                src={require('../../../static/icons/icon-status.png')}
              />
              <span
                style={{
                  textTransform: 'capitalize'
                }}
              >
                {request.status === 'pending' ? 'waiting' : request.status}
              </span>
            </div>
          )}

          <Link to={`${props.goTo}/${routes.requestDetails}/${request._id}`}>
          <div className="item">
            <img
              alt=""
              src={require('../../../static/icons/icon-detail.png')}
            />
            <span>Details</span>
          </div>
        </Link>
        </div> */}
        </div>
      </div>
      <p className="heading">Current Schedule</p>
      <div className="r-list-request-card">
        <div className="multiple-items">
          <div className="item">
            <span>
              Pickup Date : {moment(order.pickupDate).format(dateFormat)}
            </span>
          </div>
          <div className="item">
            <span>
              Pickup Time : {order.pickupTime.from} -{order.pickupTime.to}
            </span>
          </div>
        </div>
        <div className="multiple-items">
          <div className="item">
            <span>
              Delivery Date : {moment(order.deliveryDate).format(dateFormat)}
            </span>
          </div>
          <div className="item">
            <span>
              Delivery Time :{order.deliveryTime.from} -{order.deliveryTime.to}
            </span>
          </div>
        </div>
      </div>
      {log.changelog ? (
        <div>
          <p className="heading">Requested Schedule</p>
          <div className="r-list-request-card">
            <div className="multiple-items">
              <div className="item">
                <span>
                  Pickup Date :{' '}
                  {moment(requestedLog.pickupDate).format(dateFormat)}
                </span>
              </div>
              <div className="item">
                <span>
                  Pickup Time : {requestedLog.pickupTime.from} -
                  {requestedLog.pickupTime.to}
                </span>
              </div>
            </div>
            <div className="multiple-items">
              <div className="item">
                <span>
                  Delivery Date :{' '}
                  {moment(requestedLog.deliveryDate).format(dateFormat)}
                </span>
              </div>
              <div className="item">
                <span>
                  Delivery Time :{requestedLog.deliveryTime.from} -
                  {requestedLog.deliveryTime.to}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

RescheduleCard.defaultProps = {
  goTo: routes.orders
};

RescheduleCard.propTypes = {
  request: PropTypes.shape({
    _id: PropTypes.string,
    deliveryType: PropTypes.string,
    pickupDate: PropTypes.string,
    pickup: PropTypes.shape()
  }),
  target: PropTypes.string,
  goTo: PropTypes.string,
  user: PropTypes.shape()
};

export default RescheduleCard;
