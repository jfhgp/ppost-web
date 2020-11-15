import React from 'react';
import PropTypes from 'prop-types';

const FormSearchInput = props => {
  return (
    <div className="form-search-input" style={props.style}>
      <input
        type="text"
        name={props.name}
        autoComplete="off"
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        placeholder={props.placeholder}
      />
      {props.right}
    </div>
  );
};

FormSearchInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  right: PropTypes.element,
  style: PropTypes.shape()
};

export default FormSearchInput;
