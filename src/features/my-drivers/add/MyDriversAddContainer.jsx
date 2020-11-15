import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { validateAdd } from '../my-drivers-validator';
import ApiCalls from '../../../service/RequestHandler';
import MyDriversAddComponent from './MyDriversAddComponent';
import { newGrowl } from '../../../components/ui/GrowlComponent';

const INITIAL_STATE = {
  errors: {},
  activity: false,

  email: '',
  mobile: '',
  lastName: '',
  firstName: ''
};

class MyDriversAddContainer extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleSubmit = async () => {
    if (this.isValid()) {
      this.setState({ activity: true });
      const data = { ...this.state };
      delete data.activity;
      delete data.errors;

      try {
        const response = await ApiCalls.addDriver(data);
        newGrowl.showGrowl('success', 'Success', 'You have created a driver.');

        const myDrivers = [...this.props.myDrivers];
        myDrivers.push(response.data);
        this.props.handleSetMyDrivers(myDrivers);
      } catch (error) {
        newGrowl.showGrowl('error', 'Error', error.response.data.message);
        this.setState({ activity: false });
      }
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    if (this.state.errors[name]) {
      this.setState(prevState => ({
        [name]: value,
        errors: { ...prevState.errors, [name]: false }
      }));
    } else {
      this.setState({ [name]: value });
    }
  };

  isValid() {
    const { isValid, errors } = validateAdd(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    return (
      <MyDriversAddComponent
        {...this.state}
        onSubmit={this.handleSubmit}
        onInputChange={this.handleInputChange}
      />
    );
  }
}

MyDriversAddContainer.propTypes = {
  handleSetMyDrivers: PropTypes.func,
  myDrivers: PropTypes.arrayOf(PropTypes.object)
};

export default MyDriversAddContainer;
