import React from 'react';
import PropTypes from 'prop-types';

const BackDrop = props => {
  return (
    <React.Fragment>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: `${window.innerHeight - 100}px`,
          background:
            'linear-gradient(to bottom left, #152972 26%, #3366ff 100%)',
          zIndex: 1,
          opacity: 0.6
        }}
      />
    </React.Fragment>
  );
};

BackDrop.propTypes = {};

export default BackDrop;
