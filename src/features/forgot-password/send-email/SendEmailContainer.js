import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStore } from '../../../utils/store.util';
import SendEmailComponent from './SendEmailComponent';
import ApiCalls from '../../../service/RequestHandler';
import { newGrowl } from '../../../components/ui/GrowlComponent';

const apiCallType = {
  user: ApiCalls.forgotUPassword,
  transporter: ApiCalls.forgotTPassword
};

class SendEmailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      activity: false,
      // userType: props.match.params.type,
      userType: props.userType,
      error: false
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const mobile = this.telInput.iti.getNumber().slice(1);

    const { userType } = this.state;
    if (mobile) {
      this.setState({ activity: true });

      try {
        await apiCallType[userType]({ mobile: mobile });
        await this.props.store.setToStore('f-p-email', mobile);
        await this.props.nextStep();
        // this.props.history.push(`/${routes.forgotPassword}/${userType}/verify`);
      } catch (error) {
        newGrowl.showGrowl('error', 'Error', error.response.data.message);
        this.setState({ activity: false, error: true });
      }
    } else {
      this.setState({ error: true });
    }
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value, error: false });
  };

  handleTelInputRef = ref => (this.telInput = ref);

  render() {
    return (
      <SendEmailComponent
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        tellInputRef={this.handleTelInputRef}
        handleModalViewChange={this.props.handleModalViewChange}
        handleLoginModalClose={this.props.handleLoginModalClose}
      />
    );
  }
}

SendEmailContainer.propTypes = {
  store: PropTypes.shape({ setToStore: PropTypes.func }),
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({ type: PropTypes.string })
  }),
  userType: PropTypes.string,
  nextStep: PropTypes.func,
  handleModalViewChange: PropTypes.func,
  handleLoginModalClose: PropTypes.func
};

export default withStore(SendEmailContainer);
