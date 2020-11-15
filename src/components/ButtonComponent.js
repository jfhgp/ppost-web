import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

const ButtonComponent = ({
  bgColor,
  children,
  borderRadius = 4,
  onClick,
  disabled,
  style
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      style={{
        background: bgColor,
        color: 'white',
        borderRadius: borderRadius,
        ...style
      }}
      variant="contained"
    >
      {children}
    </Button>
  );
};

ButtonComponent.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.shape(),
  bgColor: PropTypes.string,
  borderRadius: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};

export default ButtonComponent;
