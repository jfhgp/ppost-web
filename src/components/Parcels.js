import React from 'react';
import PropTypes from 'prop-types';

const Parcels = props => {
  return (
    <div className="_parcel_body">
      <div className="_container">{props.children}</div>
    </div>
  );
};

Parcels.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

export default Parcels;
