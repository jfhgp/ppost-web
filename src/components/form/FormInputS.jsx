import React from 'react';
import PropTypes from 'prop-types';

import { classNames } from '../../utils/functions';

class FormInputS extends React.Component {
  handleChange = e => {
    const { value } = e.target;
    if (this.props.inputType === 'float' && value) {
      if (/^(\d*)[.]?(\d{0,2})$/.test(value)) {
        this.props.onChange(e);
      } else {
        e.target.value = value;
      }
    } else if (this.props.inputType === 'number' && value) {
      if (/^(\d+)$/.test(value)) {
        this.props.onChange(e);
      } else {
        e.target.value = value;
      }
    } else {
      this.props.onChange(e);
    }
  };

  render() {
    return (
      <div
        className={classNames([
          'form-input-s',
          ['form-error', this.props.error]
        ])}
        style={this.props.style}
      >
        {this.props.left}
        {this.props.input ? (
          this.props.input
        ) : (
            <input
              name={this.props.name}
              type={this.props.type || 'text'}
              value={this.props.value}
              onChange={this.handleChange}
              disabled={this.props.disabled}
              placeholder={this.props.placeholder}
            />
          )}
        {this.props.right}
      </div>
    );
  }
}

FormInputS.defaultProps = {
  inputType: 'text'
};

FormInputS.propTypes = {
  error: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  left: PropTypes.element,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  right: PropTypes.element,
  style: PropTypes.shape(),
  pattern: PropTypes.string,
  inputType: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  input: PropTypes.element
};

export default FormInputS;
