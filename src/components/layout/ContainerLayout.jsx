import React from 'react';
import PropTypes from 'prop-types';

const ContainerLayout = ({ children, addStyle }) => {
  return (
    <div className="p-grid container-layout" style={addStyle && addStyle}>
      {children}
    </div>
  );
};

ContainerLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  addStyle: PropTypes.object
};

export default ContainerLayout;
