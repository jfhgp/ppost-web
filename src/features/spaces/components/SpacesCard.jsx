import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import moment from 'moment';

import { authClass } from '../../../utils/auth.util';
import routes from '../../../constants/route-constants';
import { dateFormat } from '../../../constants/project-constants';

const SpacesCard = props => {
  const { space } = props;
  const rates = space.rates || {};
  const user = authClass.getUser;

  return (
    <Link
      target={props.target}
      to={`/${user.userType}/${routes.space}/${space._id}/all`}
      
    >
      <div className="r-list-request-card">
        {/* <div className="item">
          <img alt="" src={require('../../../static/icons/icon-orderID.png')} />
          <span>{space.orderNumber}</span>
        </div> */}
        <div className="multiple-items">
          <div className="item">
            {/* <img
              alt=""
              src={require('../../../static/icons/icon-package.png')}
            />
            <span style={{ textTransform: 'capitalize' }}>
              {space.deliveryType}
            </span> */}
          </div>
          <div className="item">
            <img
              alt=""
              src={require('../../../static/icons/icon-package.png')}
            />
            <span>Added on: {moment(space.createdAt).format(dateFormat)}</span>
          </div>
        </div>
        <div style={{ flexGrow: 1 }}>
          <div className="item">
            <img
              alt=""
              src={require('../../../static/icons/icon-Pickup.png')}
              style={{ alignSelf: 'flex-start' }}
            />
            <span>{space.name}</span>
          </div>
        </div>
        <div className="multiple-items">
          <div className="item">
            <img
              alt=""
              src={require('../../../static/icons/icon-Pickup.png')}
              style={{ alignSelf: 'flex-start' }}
            />
            <span style={{ textTransform: 'capitalize' }}>
              Area: {space.area}
            </span>
          </div>
          <div className="item">
            <img
              alt=""
              src={require('../../../static/icons/icon-Pickup.png')}
              style={{ alignSelf: 'flex-start' }}
            />
            <span>Floor: {space.floor}</span>
          </div>
        </div>
        {/* <div>
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
            {space.status === 'pending' ? (
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
                  {space.status === 'pending' ? 'waiting' : space.status}
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
                  {space.status === 'pending' ? 'waiting' : space.status}
                </span>
              </div>
            )} */}

        {/* <Link to={`${props.goTo}/${routes.spaceDetails}/${space._id}`}>
          <div className="item">
            <img
              alt=""
              src={require('../../../static/icons/icon-detail.png')}
            />
            <span>Details</span>
          </div>
        </Link> */}
        {/* </div>
        </div> */}
      </div>
    </Link>
  );
};

SpacesCard.defaultProps = {
  goTo: routes.spaces
};

SpacesCard.propTypes = {
  space: PropTypes.shape({
    _id: PropTypes.string,
    deliveryType: PropTypes.string,
    pickupDate: PropTypes.string,
    pickup: PropTypes.shape()
  }),
  target: PropTypes.string,
  goTo: PropTypes.string,
  user: PropTypes.shape()
};

export default SpacesCard;
