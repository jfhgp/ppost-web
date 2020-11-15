import React from 'react';
import PropTypes from 'prop-types';

import { classNames } from '../../utils/functions';

const FormTextArea = props => {
  return (
    <div
      className={classNames(['form-input-s', ['form-error', props.error]])}
      style={props.style}
    >
      {props.left}
      <textarea
        rows={props.rows}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        placeholder={props.placeholder}
      />
    </div>
  );
};

FormTextArea.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  pattern: PropTypes.string,
  title: PropTypes.string,
  left: PropTypes.element,
  rows: PropTypes.number,
  style: PropTypes.shape()
};

export default FormTextArea;
