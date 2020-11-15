import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const Parcel = props => {
  return (
    <Link to={props.goto}>
      <div className="_card">
        <div className="_content">
          <h2>{props.name}</h2>
          <p>{props.details}</p>
        </div>
      </div>
    </Link>
  );
};

Parcel.propTypes = {
  name: PropTypes.string,
  details: PropTypes.string,
  goto: PropTypes.string
};

export default Parcel;
