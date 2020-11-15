import React, { Component } from 'react';
import PropTypes from 'prop-types';

import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import 'intl-tel-input/build/js/utils';

class FormTelInput extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    styles: PropTypes.object
  };

  constructor() {
    super();

    this.input = null;
    this.iti = null;
    this.handleRef = ref => (this.input = ref);
  }

  componentDidMount() {
    this.iti = intlTelInput(this.input, {
      separateDialCode: true,
      initialCountry: 'pk'
    });
  }

  render() {
    return (
      <input
        name={this.props.name || ''}
        type="tel"
        id={this.props.id || 'phone'}
        className={this.props.className}
        ref={this.handleRef}
        value={this.props.value}
        onChange={this.props.onChange}
        style={this.props.styles}
      />
    );
  }
}

export default FormTelInput;
