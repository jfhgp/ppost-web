import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStore } from '../../../utils/store.util';
import ApiCalls from '../../../service/RequestHandler';
import FPVerifyCodeComponent from './FPVerifyCodeComponent';
import { newGrowl } from '../../../components/ui/GrowlComponent';

const apiCallType = {
  user: ApiCalls.confirmURecovery,
  transporter: ApiCalls.confirmTRecovery
};

class FPVerifyCodeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      activity: false,
      // userType: props.match.params.type,
      userType: props.userType,
      error: false
    };

    this.email = props.store.getFromStore('f-p-email');
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { code, userType } = this.state;
    if (code) {
      this.setState({ activity: true });
      try {
        await apiCallType[userType]({
          recoveryCode: code,
          mobile: this.email
        });

        await this.props.store.setToStore('f-p-code', code);
        await this.props.nextStep();
        // this.props.history.push(
        //   `/${routes.forgotPassword}/${this.state.userType}/reset-password`
        // );
      } catch (error) {
        newGrowl.showGrowl('error', 'Error', error.response.data.message);
        this.setState({ error: true, activity: false });
      }
    } else {
      this.setState({ error: true });
    }
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value, error: false });
  };

  render() {
    return (
      <FPVerifyCodeComponent
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
    // if (this.email) {
    //   return (
    //     <FPVerifyCodeComponent
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

FPVerifyCodeContainer.propTypes = {
  store: PropTypes.shape({
    getFromStore: PropTypes.func,
    setToStore: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({ type: PropTypes.string })
  }),
  history: PropTypes.shape({ push: PropTypes.func }),
  userType: PropTypes.string,
  nextStep: PropTypes.func
};

export default withStore(FPVerifyCodeContainer);
