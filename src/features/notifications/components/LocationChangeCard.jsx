import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import moment from 'moment';
import { timeFormat } from '../../../constants/project-constants';
import routes from '../../../constants/route-constants';
import { dateFormat } from '../../../constants/project-constants';

const LocationChangeCard = props => {
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
      <p className="heading">Current Location</p>
      <div
        className="p-grid "
        style={{
          margin: 0,
          padding: '0',
          flexGrow: 1
        }}
      >
        <div className="p-col-12 p-lg-6" style={{ padding: 0 }}>
          <div className="subheading-big" style={{ padding: '1em' }}>
            <p>Pickup</p>
            <img
              alt=""
              src={require('../../../static/icons/icon-Pickup.png')}
            />
            <span>{order.pickup.address}</span>


          </div>
        </div>
        <div
          className="p-col-12 p-lg-6"
          style={{ padding: '0', backgroundColor: '#fff' }}
        >



          <div className="subheading-big" style={{ padding: '1em' }}>
            <p>Dropoff</p>

            <img
              alt=""
              src={require('../../../static/icons/icon-DropOff.png')}
            />
            <span>{order.dropoff.address}</span>
          </div>

        </div>
      </div>
      {log.changelog ? (
        <div>
          <p className="heading">Requested Location</p>
          <div
            className="p-grid"
            style={{
              margin: 0,
              padding: '0',
              flexGrow: 1
            }}
          >
            <div className="p-col-12 p-lg-6" style={{ padding: 0 }}>
              <div className="subheading-big" style={{ padding: '1em' }}>
                <p>Pickup</p>
                <img
                  alt=""
                  src={require('../../../static/icons/icon-Pickup.png')}
                />
                <span>{requestedLog.pickup.address}</span>


              </div>
            </div>
            <div
              className="p-col-12 p-lg-6"
              style={{ padding: '0', backgroundColor: '#fff' }}
            >



              <div className="subheading-big" style={{ padding: '1em' }}>
                <p>Dropoff</p>

                <img
                  alt=""
                  src={require('../../../static/icons/icon-DropOff.png')}
                />
                <span>{requestedLog.dropoff.address}</span>
              </div>

            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

LocationChangeCard.defaultProps = {
  goTo: routes.orders
};

LocationChangeCard.propTypes = {
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

export default LocationChangeCard;
