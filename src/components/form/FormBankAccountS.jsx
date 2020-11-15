import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '@material-ui/core';

import { classNames } from '../../utils/functions';

const FormBankAccount = props => {
  return (
    <div
      className={classNames(['form-input-s', ['form-error', props.error]])}
      style={props.style}
    >
      {props.left}
      <input
        readOnly
        type="static"
        value={props.value}
        style={{ cursor: 'default' }}
      />
      <Checkbox
        value={props._id}
        disabled={props.checked}
        style={{
          padding: 0,
          color: props.checked ? 'rgb(44,116,24)' : 'unset'
        }}
        checked={props.checked}
        onChange={props.onChange}
      />
    </div>
  );
};

FormBankAccount.propTypes = {
  style: PropTypes.shape(),
  _id: PropTypes.string,
  error: PropTypes.bool,
  checked: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  left: PropTypes.element
};

export default FormBankAccount;
