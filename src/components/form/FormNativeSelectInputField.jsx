import React from 'react';
import PropTypes from 'prop-types';

import ReactSelect from 'react-select';

import { classNames, getPrimaryColors } from '../../utils/functions';

const FormNativeSelectInputField = props => {
  const { value, valueKey } = props;
  return (
    <div
      className={classNames([
        'form-select-input-field',
        ['form-error', props.error]
      ])}
      style={props.style}
    >
      {props.left}
      {props.type === 'react-select' ? (
        <ReactSelect
          isLoading={props.isLoading}
          styles={{
            container: provided => ({ ...provided, width: '100%' }),
            control: provided => ({
              ...provided,
              margin: '2px 0',
              padding: '2px 0',
              backgroundColor: 'transparent',
              border: 'unset',
              boxShadow: 'unset'
            }),
            singleValue: provided => ({
              ...provided,
              fontSize: '1.2em',
              color: getPrimaryColors(
                value[valueKey] ? 'primary' : 'font-color'
              )
            }),
            input: provided => ({
              ...provided,
              fontSize: '1.2em',
              color: getPrimaryColors(
                value[valueKey] ? 'primary' : 'font-color'
              )
            }),
            option: (provided, { isDisabled, isFocused, isSelected }) => ({
              ...provided,
              backgroundColor: isDisabled
                ? null
                : isSelected
                ? '#fff'
                : isFocused
                ? '#fff'
                : null,
              color: isDisabled ? '#ccc' : isSelected ? '#000' : '#000',
              cursor: isDisabled ? 'not-allowed' : 'pointer',

              ':active': {
                ...provided[':active'],
                backgroundColor: !isDisabled && (isSelected ? '#fff' : '#fff')
              },
              ':hover': {
                ...provided[':hover'],
                backgroundColor: '#ccc'
              }
            })
          }}
          getOptionValue={props.getOptionValue}
          getOptionLabel={props.getOptionLabel}
          formatOptionLabel={props.formatOptionLabel}
          options={props.options}
          value={value}
          onChange={e =>
            props.onChange({ target: { name: props.name, value: e } })
          }
          isDisabled={props.isDisabled}
        />
      ) : null}

      {props.input ? props.input : null}
    </div>
  );
};

FormNativeSelectInputField.defaultProps = {
  options: [],
  valueKey: 'value',
  isDisabled: false
};

FormNativeSelectInputField.propTypes = {
  error: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  left: PropTypes.element,
  input: PropTypes.element,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  formatOptionLabel: PropTypes.func,
  placeholder: PropTypes.string,
  valueKey: PropTypes.string,
  style: PropTypes.shape(),
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape()
  ])
};

export default FormNativeSelectInputField;
