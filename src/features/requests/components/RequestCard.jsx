import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import moment from 'moment';

import { authClass } from '../../../utils/auth.util';
import routes from '../../../constants/route-constants';
import { dateFormat } from '../../../constants/project-constants';
import { getPrimaryColors } from '../../../utils/functions';

const RequestCard = props => {
  const { request, spaceSearch } = props;
  const rates = request.rates || {};
  const user = authClass.getUser;
  return (
    <Link
      target={props.target}
      to={`/${user.userType}/${props.goTo}/${routes.requestDetails}/${request._id}`}
      params={spaceSearch}
    >
      <div className="r-list-request-card">
        <div className="multiple-items">
          <div className="item">
            <img alt="" src={require('../../../static/icons/icon-orderID.png')} />
            <span>{request.orderNumber}</span>
          </div>
          <div className="item">

            <span style={{ fontSize: 30 }}>{request.id}</span>
          </div>
        </div>
        <div className="multiple-items">
          <div className="item">
            <img alt="" src={require('../../../static/icons/icon-Date.png')} />
            <span>{moment(request.pickupDate).format(dateFormat)}</span>
          </div>
          <div className="item">
            <img
              alt=""
              src={require('../../../static/icons/icon-package.png')}
            />
            <span style={{ textTransform: 'capitalize' }}>
              {request.deliveryType}
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
            <span>{request.pickup.address}</span>
          </div>
          <div className="item">
            <img
              alt=""
              src={require('../../../static/icons/icon-DropOff.png')}
            />
            <span style={{}}>{request.dropoff.address}</span>
          </div>
        </div>
        <div>
          {rates._id ? (
            <div className="item">
              <img
                alt=""
                src={require('../../../static/icons/icon-Price.png')}
              />
              <span>
                Price : {user.config.currency}{' '}
                {user.userType === 'transporter'
                  ? (rates.price * 0.8).toFixed(2)
                  : rates.price.toFixed(2)}
              </span>
            </div>


          ) : null}
          <div className="multiple-items">
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
                    {request.status}
                  </span>
                </div>
              )}

            {request.bonus ? (
              <div className="item">
                <span style={{ color: getPrimaryColors('error'), fontWeight: "bold" }}>Bonus : {request.config.currency} {request.bonus}</span>
              </div>
            ) : null}


          </div>
        </div>
      </div>
    </Link>
  );
};

RequestCard.defaultProps = {
  goTo: routes.orders
};

RequestCard.propTypes = {
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

export default RequestCard;
