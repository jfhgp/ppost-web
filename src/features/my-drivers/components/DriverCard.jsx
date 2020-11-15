import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import routes from '../../../constants/route-constants';

const DriverCard = props => {
  const { driver } = props;
  const picture =
    driver.picture || require('../../../static/icons/image-user.png');

  return (
    <Link to={`${routes.myDrivers}/${driver._id}`}>
      <div className="m-d-l-driver-card">
        <div className="text-center">
          <img alt="Driver Picture" src={picture} />
        </div>
        <div className="item">
          <img
            alt=""
            src={require('../../../static/icons/cart-icon-name.png')}
          />
          <span>
            Name : {driver.firstName} {driver.lastName}
          </span>
        </div>
        <div className="item">
          <img
            alt=""
            src={require('../../../static/icons/cart-icon-phone.png')}
          />
          <span>Phone : +{driver.mobile}</span>
        </div>
        <div className="item">
          <img
            alt=""
            src={require('../../../static/icons/cart-icon-name.png')}
          />
          <span>Status : {driver.active ? 'Active' : 'Inactive'}</span>
        </div>
        <div className="item">
          <img
            alt=""
            src={require('../../../static/icons/cart-icon-orders.png')}
          />
          <span>Orders : 1</span>
        </div>
        <div className="item">
          <img
            alt=""
            src={require('../../../static/icons/cart-icon-earning.png')}
          />
          <span>Earnings : $ 56.55 (15)</span>
        </div>
        {/* <div className="multiple-items" style={{ marginTop: '1rem' }}>
        <Link to={`${routes.myDrivers}/${driver._id}`}>
          <div className="item">
            <img
              alt=""
              src={require('../../../static/icons/icon-detail.png')}
            />
            <span>View</span>
          </div>
        </Link>
      </div> */}
      </div>
    </Link>
  );
};

DriverCard.propTypes = {
  driver: PropTypes.shape()
};

export default DriverCard;
