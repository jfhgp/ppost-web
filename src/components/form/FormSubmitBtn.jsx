import React from 'react';
import PropTypes from 'prop-types';

import { classNames } from '../../utils/functions';

const FormSubmitBtn = props => {
  return (
    <button
      className={classNames([
        'form-submit-btn',
        props.className || '',
        ['disabled', props.disabled]
      ])}
      onClick={props.onSubmit}
      disabled={props.disabled}
      style={{ ...props.style, ...props.addStyle }}
    >
      {props.label || 'SUBMIT'}
    </button>
  );
};

FormSubmitBtn.defaultProps = {
  style: {},
  addStyle: {},
  className: ''
};

FormSubmitBtn.propTypes = {
  label: PropTypes.string,
  style: PropTypes.shape(),
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  addStyle: PropTypes.shape()
};

export default FormSubmitBtn;
