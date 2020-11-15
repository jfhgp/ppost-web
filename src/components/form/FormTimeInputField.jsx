import React from 'react';
import PropTypes from 'prop-types';

import { TimePicker } from 'material-ui-pickers';

import { classNames } from '../../utils/functions';
import { timeFormat } from '../../constants/project-constants';

const FormTimeInputField = props => {
  const { value, error, placeholder, onChange } = props;

  return (
    <div
      className={classNames([
        'form-time-input',
        ['date-input-container-error', error]
      ])}
    >
      {props.left}
      <TimePicker
        format={timeFormat}
        placeholder={placeholder}
        ampm={false}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

FormTimeInputField.propTypes = {
  value: PropTypes.instanceOf(Date),
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  format: PropTypes.string,
  onChange: PropTypes.func,
  left: PropTypes.element
};

export default FormTimeInputField;
