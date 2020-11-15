import React from 'react';
import PropTypes from 'prop-types';

import { classNames } from '../../utils/functions';

const FormNativeSelectInput = props => {
  return (
    <div
      className={classNames([
        'form-select-input',
        ['form-select-input-error', props.error]
      ])}
      style={props.addStyle && props.addStyle}
    >
      {props.left}
      <select
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        style={{
          textTransform: 'capitalize',
          ...props.addSelectStyle
        }}
      >
        {props.options.map((item, index) => (
          <option
            key={`${item}-${index}`}
            value={item.value}
            style={{ textTransform: 'capitalize' }}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

FormNativeSelectInput.defaultProps = {
  options: []
};

FormNativeSelectInput.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  addStyle: PropTypes.shape(),
  addSelectStyle: PropTypes.shape(),
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()])
};

export default FormNativeSelectInput;
