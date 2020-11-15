import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';

class SelectInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: this.props.value,
      focusedValue: -1,
      isFocused: false,
      isOpen: false
    };
  }
  onMultiSelectBlur = () => {
    const { options, multiple } = this.props;

    this.setState(prevState => {
      const { values } = prevState;

      if (multiple) {
        return {
          focusedValue: -1,
          isFocused: false,
          isOpen: false
        };
      } else {
        const value = values[0];

        let focusedValue = -1;

        if (value) {
          focusedValue = options.findIndex(option => option.value === value);
        }

        return {
          focusedValue,
          isFocused: false,
          isOpen: false
        };
      }
    });
  };

  onMultiSelectClick = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  onDeleteOption = e => {
    const { value } = e.currentTarget.dataset;

    this.setState(prevState => {
      const [...values] = prevState.values;
      const index = values.indexOf(value);

      values.splice(index, 1);

      return { values };
    });
  };

  onClickOption = e => {
    const { value } = e.currentTarget.dataset;

    this.setState(prevState => {
      const [...values] = prevState.values;
      const index = values.indexOf(value);

      if (index === -1) {
        values.push(value);
      } else {
        values.splice(index, 1);
      }

      return { values };
    });
  };

  stopPropagation = e => {
    e.stopPropagation();
  };

  renderValues = () => {
    const { placeholder, multiple, options, value: optionValue } = this.props;

    if (optionValue.length === 0) {
      return <div className="_multi_select_placeholder">{placeholder}</div>;
    }

    if (multiple) {
      return optionValue.map((value, i) => {
        return (
          <span
            key={i}
            onClick={this.stopPropagation}
            className="_multi_select_multiple _multi_select_value"
          >
            {options.map(option => {
              if (option['_id'] === value) {
                return option['value'];
              }
            })}
            {i + 1 !== optionValue.length ? ',' : null}
          </span>
        );
      });
    }

    return <span className="_multi_select_multiple _multi_select_value">{optionValue}</span>;
  };

  renderOptions = () => {
    const { options } = this.props;
    const { isOpen } = this.state;

    if (!isOpen) {
      return null;
    }

    return (
      <div className="_multi_select_options">
        {options.length === 0 ? (
          <div className="_multi_select_option" disabled>
            {`No ${this.props.label}`}
          </div>
        ) : (
            options.map(this.renderOption)
          )}
      </div>
    );
  };

  renderOption = (option, index) => {
    const { multiple, name, value: optionValue } = this.props;
    const { focusedValue } = this.state;
    const { value, _id = '' } = option;

    const selected = optionValue.includes(_id);

    let className = '_multi_select_option';
    if (selected) className += ' selected';
    if (index === focusedValue) className += ' focused';

    return (
      <div
        key={_id}
        data-value={value}
        data-id={_id}
        data-name={name}
        className={className}
        onClick={this.props.onChange}
      >
        {multiple ? (
          <span className="_multi_select_checkbox">
            {selected ? <Check /> : null}
          </span>
        ) : null}
        {value}
      </div>
    );
  };

  render() {
    let errorClass = { borderColor: '#fc7171' };
    return (
      <div
        className="_multi_select"
        tabIndex="0"
        onBlur={this.onMultiSelectBlur}
      >
        <div
          style={(this.props.error && errorClass) || {}}
          className="_multi_select_selection"
          onClick={this.onMultiSelectClick}
        >
          {/* <span
            className="_multi_select_icon"
            style={{
              backgroundImage: `url(/assets/images/icon/Icon-Customer.png)`
            }}
          ></span> */}
          {this.renderValues()}
        </div>
        <span
          className="_multi_select_arrow"
          onClick={this.onMultiSelectClick}
          style={{
            backgroundImage: `url(/assets/images/icon/icon-dropdown.png)`
          }}
        ></span>
        {this.renderOptions()}
      </div>
    );
  }
}

const Check = () => (
  <svg viewBox="0 0 16 16" className="_multi_select_svg">
    <path
      d="M13 .156l-1.406 1.438-5.594 5.594-1.594-1.594-1.406-1.438-2.844 2.844 1.438 1.406 3 3 1.406 1.438 1.406-1.438 7-7 1.438-1.406-2.844-2.844z"
      transform="translate(0 1)"
    />
  </svg>
);

SelectInput.propTypes = {
  values: PropTypes.array,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.bool,
  value: PropTypes.array,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  options: PropTypes.arrayOf(object)
};

export default SelectInput;
