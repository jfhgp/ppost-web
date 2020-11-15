import React from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { classNames } from '../../utils/functions';
import { dateFormatDatePicker } from '../../constants/project-constants';

const FormDateInputField = props => {
  const { value, error, placeholder, onChange } = props;

  return (
    <div
      className={classNames([
        'form-date-input',
        ['date-input-container-error', error]
      ])}
    >
      {props.left}
      <DatePicker
        minDate={props.minDate}
        disabled={props.disabled}
        selected={value}
        placeholderText={placeholder}
        dateFormat={dateFormatDatePicker}
        onChange={onChange}
      />
    </div>
  );
};

FormDateInputField.defaultProps = {
  minDate: new Date()
};

FormDateInputField.propTypes = {
  error: PropTypes.bool,
  left: PropTypes.element,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  minDate: PropTypes.oneOfType([PropTypes.bool, PropTypes.instanceOf(Date)])
};

export default FormDateInputField;
