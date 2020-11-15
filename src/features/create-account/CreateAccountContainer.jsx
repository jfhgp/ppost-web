import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ApiCalls from '../../service/RequestHandler';
import { authClass } from '../../utils/auth.util';
import CreateAccountComponent from './CreateAccountComponent';
import { newGrowl } from '../../components/ui/GrowlComponent';
import { validateCreateAccount } from './validators/create-account-validator';

const apiCallType = {
  user: ApiCalls.signup,
  transporter: ApiCalls.signupTransporter
};

export default class CreateAccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: false,
      userType: props.match.params.type,
      verify: false,
      errors: {},
      countryCode: '',

      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      password: '',
      agreeToTerms: false,
      preference: false
    };

    this.handleTelInputRef = ref => (this.telInput = ref);
  }

  handleSubmit = async e => {
    e.preventDefault();

    if (this.isValid()) {
      const countryCode = this.telInput.iti.getSelectedCountryData().dialCode;
      this.setState({ activity: true });
      try {
        const response = await apiCallType[this.state.userType]({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          mobile: countryCode + this.state.mobile
        });
        const data = response.data;
        if (data.token) {
          const userDataToSave = {
            token: data.token
          };
          await authClass.setUser(userDataToSave);
          // authClass.setUser = userDataToSave;
          this.setState({
            activity: false,
            verify: true,
            countryCode
          });
        }
      } catch (error) {
        newGrowl.showGrowl('error', 'Error', error.response.data.message);
        this.setState({ activity: false });
      }
    }
  };

  handleChange = (key, value) => {
    if (this.state.errors[key]) {
      this.setState(prevState => ({
        [key]: value,
        errors: { ...prevState.errors, [key]: false }
      }));
    } else {
      this.setState({ [key]: value });
    }
  };

  showPreference = () => {
    this.setState({
      preference: true
    });
  };

  isValid() {
    const { errors, isValid } = validateCreateAccount(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  handleNavigateTo = route => {
    const { _id, firstName, lastName } = authClass.getUser;
    const data = {
      _id,
      firstName,
      lastName
    };

    if (this.state.userType === 'transporter') {
      ApiCalls.createIdenfyToken(data);
    }
    this.props.history.push(route);
  };

  render() {
    return (
      <CreateAccountComponent
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleTelInputRef={this.handleTelInputRef}
        handleNavigateTo={this.handleNavigateTo}
        showPreference={this.showPreference}
        handleLoginModalOpen={this.props.handleLoginModalOpen}
        handleLoginModalClose={this.props.handleLoginModalClose}
      />
    );
  }
}

CreateAccountContainer.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  match: PropTypes.shape({
    params: PropTypes.shape({ type: PropTypes.string })
  }),
  handleLoginModalOpen: PropTypes.func,
  handleLoginModalClose: PropTypes.func
};
