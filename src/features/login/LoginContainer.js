import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoginComponent from './LoginComponent';
import ApiCalls from '../../service/RequestHandler';
import { validateLogin } from './validations/login-validator';
import { newGrowl } from '../../components/ui/GrowlComponent';
import { Route, Redirect, Switch, NavLink } from 'react-router-dom';
import LoginModalContext from '../../context/LoginModalContext';

const apiCallType = {
  user: {
    false: ApiCalls.login,
    true: ApiCalls.twoFactorLoginUser
  },
  transporter: {
    false: ApiCalls.loginTransporter,
    true: ApiCalls.twoFactorLoginTransporter
  }
};

export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: false,
      verify: false,
      showPassword: false,
      isForgotPassword: false,
      mobile: '',
      password: '',
      errors: {},
      fullMobile: '',
      verifyType: 'login',
      redirectToReferrer: "false",
      //userType: props.match.params.type
      userType: props.userType || 'user'
    };

    this.formRef = {};
    this.fieldRef = {};
  }
  static contextType = LoginModalContext;

  componentDidMount() {
    this.setState({});
  }

  onSubmit = async e => {
    console.log("thsi props location", this.props.location)
    e.preventDefault();
    const mobile = this.telInput.iti.getNumber().slice(1);

    if (this.isValid()) {
      this.setState({ activity: true });
      const { showPassword } = this.state;
      try {
        const response = await apiCallType[this.state.userType][showPassword]({
          mobile: mobile,
          password: this.state.password
        });
        if (response.data.twoFactorLogin && !response.data._id) {
          this.setState({ showPassword: true, fullMobile: mobile });
        }
        if (!response.data.twoFactorLogin || response.data._id) {
          this.setState({
            verify: true,
            verifyType: response.data.isVerified ? 'login' : 'createAccount',
            fullMobile: mobile,
            redirectToReferrer: true
          });
        }
      } catch (error) {
        if (error.response) {
          newGrowl.showGrowl('error', 'Error', error.response.data.message);
        }
      } finally {
        this.setState({ activity: false });
      }
    }
  };

  handleModalViewChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  onInputChange = e => {
    e.persist();
    const key = e.target.name;
    if (this.state.errors[key]) {
      this.setState(prevState => ({
        [key]: e.target.value,
        errors: { ...prevState.errors, [key]: false }
      }));
    } else {
      this.setState({ [key]: e.target.value });
    }
  };

  isValid() {
    const { errors, isValid } = validateLogin(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  navigateTo = route => {
    this.props.history.push(route);
  };

  modalClose = () => {
    const loginModalClose = this.context;
    loginModalClose();
  };

  handleFormRef = ref => (this.formRef = ref);
  handleFieldRef = ref => (this.fieldRef = ref);
  handleTelInputRef = ref => (this.telInput = ref);

  render() {

    // const { from } = this.props.location || { from: { pathname: '/home' } };
    // const { redirectToReferrer } = this.state;
    // console.log("refere", this.props.location.state, redirectToReferrer)
    // if (redirectToReferrer) {
    //   return (
    //     <Redirect to={from} />
    //   )
    // }
    return (
      <LoginComponent
        {...this.state}
        onSubmit={this.onSubmit}
        onInputChange={this.onInputChange}
        navigateTo={this.navigateTo}
        handleFormRef={this.handleFormRef}
        handleFieldRef={this.handleFieldRef}
        formRef={this.formRef}
        fieldRef={this.fieldRef}
        tellInputRef={this.handleTelInputRef}
        handleLoginModalOpen={this.props.handleLoginModalOpen}
        handleLoginModalClose={this.props.handleLoginModalClose}
        modalClose={this.modalClose}
        handleModalViewChange={this.handleModalViewChange}
      />
    );
  }
}

LoginContainer.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  match: PropTypes.shape({
    params: PropTypes.shape({ type: PropTypes.string })
  }),
  handleLoginModalOpen: PropTypes.func,
  handleLoginModalClose: PropTypes.func,
  userType: PropTypes.string
};
