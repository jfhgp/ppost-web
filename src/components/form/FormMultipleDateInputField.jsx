import React from 'react';
import PropTypes from 'prop-types';

import MultipleDatePicker from "react-multiple-datepicker";

import { classNames } from '../../utils/functions';
import { dateFormatDatePicker } from '../../constants/project-constants';

const FormMultipleDateInputField = props => {
  const { value, error, placeholder, onChange } = props;

  return (
    <div
      className={classNames([
        'form-date-input',
        ['date-input-container-error', error]
      ])}
    >
      {props.left}
      <MultipleDatePicker
        minDate={new Date()}
        disabled={props.disabled}
        selectedDates={value}
        placeholderText={placeholder}
        dateFormat={dateFormatDatePicker}
        onSubmit={onChange}
      />
    </div>
  );
};

FormMultipleDateInputField.defaultProps = {
  minDate: new Date()
};

FormMultipleDateInputField.propTypes = {
  error: PropTypes.bool,
  left: PropTypes.element,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  minDate: PropTypes.oneOfType([PropTypes.bool, PropTypes.instanceOf(Date)])
};

export default FormMultipleDateInputField;
