import React from 'react';
import PropTypes from 'prop-types';

const WarningMessage = props => {
  return (
    <div className="w-message-container">
      <span className="pi pi-exclamation-triangle" />
      <span>{props.message}</span>
    </div>
  );
};

WarningMessage.propTypes = {
  message: PropTypes.string
};

export default WarningMessage;
