import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RootRef from '@material-ui/core/RootRef';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class FormSelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeLabelWidth: 0
    };

    this.handleTypeLabelRef = ref => (this.typeLabelRef = ref);
  }

  componentDidMount() {
    this.setState({
      typeLabelWidth: this.typeLabelRef.offsetWidth
    });
  }

  render() {
    const {
      id,
      label,
      value,
      onChange,
      name,
      options,
      helperText,
      showNone,
      error,
      multiple,
      renderValue
    } = this.props;
    return (
      <FormControl fullWidth variant="outlined" error={error}>
        <RootRef rootRef={this.handleTypeLabelRef}>
          <InputLabel htmlFor={id}>{label}</InputLabel>
        </RootRef>
        <Select
          value={value}
          onChange={onChange}
          input={
            <OutlinedInput
              labelWidth={this.state.typeLabelWidth}
              name={name}
              id={id}
            />
          }
          multiple={multiple}
          renderValue={renderValue}
        >
          {showNone && (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}
          {options
            ? options.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))
            : null}
        </Select>
        {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
      </FormControl>
    );
  }
}

FormSelectInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape()),
  helperText: PropTypes.string,
  showNone: PropTypes.bool,
  error: PropTypes.bool,
  multiple: PropTypes.bool,
  renderValue: PropTypes.func
};

export default FormSelectInput;
