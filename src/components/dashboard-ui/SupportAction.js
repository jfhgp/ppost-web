import React from 'react';
import PropTypes from 'prop-types';

const SupportAction = props => {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        color: '#fff',
        borderRadius: '50%',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: props.bgColor
      }}
    >
      <img
        alt=""
        src={`${process.env.PUBLIC_URL}/assets/images/icon/${props.img}`}
      />
      {/* <span style={{ marginTop: 10 }}>{props.name}</span> */}
    </div>
  );
};

SupportAction.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  bgColor: PropTypes.string
};

export default SupportAction;
