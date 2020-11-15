import React from 'react';
import PropTypes from 'prop-types';

const LoginFormInput = props => {
  const {
    value,
    onChange,
    placeholder,
    left,
    right,
    disabled,
    error,
    type,
    autoFocus,
    name,
    input
  } = props;

  return (
    <React.Fragment>
      <div className={`login-form-input ${error ? 'login-form-error' : ''}`}>
        {left}
        {input ? (
          input
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            autoFocus={autoFocus}
            name={name}
          />
        )}
        {right}
      </div>
      {typeof error === 'string' ? <small>{error}</small> : null}
    </React.Fragment>
  );
};

LoginFormInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  left: PropTypes.element,
  right: PropTypes.element,
  input: PropTypes.element
};

export default LoginFormInput;
