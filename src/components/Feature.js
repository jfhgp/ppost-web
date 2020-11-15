import React from 'react';
import PropTypes from 'prop-types';

function Feature(props) {
  return (
    <React.Fragment>
      <div style={{ position: 'relative', height: 495 }}>
        {props.children}
      </div>
    </React.Fragment>
  );
}

Feature.propTypes = {
  children: PropTypes.shape()
};

export default Feature;
