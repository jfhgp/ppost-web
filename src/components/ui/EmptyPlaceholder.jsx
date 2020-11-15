import React from 'react';
import PropTypes from 'prop-types';

const EmptyPlaceholder = props => {
  return (
    <div className="empty-placeholder">
      <i className="fas fa-exclamation" />
      <p>{props.message}</p>
    </div>
  );
};

EmptyPlaceholder.propTypes = {
  message: PropTypes.string
};

export default EmptyPlaceholder;
