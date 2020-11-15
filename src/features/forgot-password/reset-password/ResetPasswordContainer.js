import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStore } from '../../../utils/store.util';
import ApiCalls from '../../../service/RequestHandler';
import ResetPasswordComponent from './ResetPasswordComponent';
import { newGrowl } from '../../../components/ui/GrowlComponent';
import { validateResetPassword } from './validators/reset-password-validator';

const apiCallType = {
  user: ApiCalls.resetUPassword,
  transporter: ApiCalls.resetTPassword
};

class ResetPasswordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirm: '',
      activity: false,
      // userType: props.match.params.type,
      userType: props.userType,
      errors: {}
    };
    this.recoveryCode = props.store.getFromStore('f-p-code');
    this.email = props.store.getFromStore('f-p-email');
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (this.isValid()) {
      const { password, userType } = this.state;
      this.setState({ activity: true });
      try {
        await apiCallType[userType]({
          recoveryCode: this.recoveryCode,
          mobile: this.email,
          password
        });
        this.props.store.removeMultipleFromStore(['f-p-code', 'f-p-email']);
        newGrowl.showGrowl('success', 'Success', 'Password has been reset');
        // this.props.history.push(`/${routes.login}/${this.state.userType}`);
      } catch (error) {
        newGrowl.showGrowl('error', 'Error', error.response.data.message);
        this.setState({ error: true, activity: false });
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

  isValid() {
    const { errors, isValid } = validateResetPassword({
      password: this.state.password,
      confirm: this.state.confirm
    });

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    return (
      <ResetPasswordComponent
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
    // if (this.email && this.recoveryCode) {
    //   return (
    //     <ResetPasswordComponent
    //       {...this.state}
    //       handleChange={this.handleChange}
    //       handleSubmit={this.handleSubmit}
    //     />
    //   );
    // }
    // return (
    //   <Redirect
    //     to={`/${routes.forgotPassword}/${this.state.userType}/mobile`}
    //   />
    // );
  }
}

ResetPasswordContainer.propTypes = {
  store: PropTypes.shape({
    getFromStore: PropTypes.func,
    removeMultipleFromStore: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({ type: PropTypes.string })
  }),
  history: PropTypes.shape({ push: PropTypes.func }),
  userType: PropTypes.string
};

export default withStore(ResetPasswordContainer);
