import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BankInformationComponent from './BankInformationComponent';
import ApiCalls from '../../../service/RequestHandler';

class BankInformationContainer extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      bankInfo: PropTypes.shape(),
      active: PropTypes.bool
    }),
    activity: PropTypes.bool,
    setProfile: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      ...props.profile.bankInfo,
      isDialogVisible: false,
      canDone: false,
      error: false,
      activity: false
    };

    this.handleChange = e => this.changeInput(e);
    this.handleSetProfile = () => this.setProfile();
    this.handleDialogVisibility = (a, b, visibility) =>
      this.setDialogVisibility(visibility);
    this.handleUpdateBankInfo = () => this.updateBankInformation();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.profile.active === undefined &&
      this.props.profile.active !== undefined
    ) {
      this.setState({ ...this.props.profile.bankInfo });
    }
  }

  async updateBankInformation() {
    // this.setState({ activity: true });
    // try {
    //   const response = await ApiCalls.addBankAccount({
    //     _id: this.state._id,
    //     iban: this.state.iban
    //   });
    //   console.log(response);
    //   // const newProfile = { ...this.props.profile };
    //   // newProfile.visa = result;
    //   this.setState({ activity: false });
    //   // this.props.store.updateProfile(newProfile);
    // } catch (error) {
    //   this.setState({ activity: false });
    // }
  }

  changeInput(e) {
    const { name, value } = e.target;
    if (this.state.error) {
      this.setState({
        [name]: value,
        canDone: true,
        errors: false
      });
    } else {
      this.setState({ [name]: value, canDone: true });
    }
  }

  setProfile() {
    if (this.state.iban) {
      const profile = { ...this.props.profile };
      profile.bankInfo = { _id: this.state._id, iban: this.state.iban };

      this.setState({ canDone: false, isDialogVisible: false });
      this.props.setProfile(profile);
    } else {
      this.setState({ error: true });
    }
  }

  setDialogVisibility(visibility) {
    if (visibility === undefined) {
      this.setState({
        isDialogVisible: false,
        ...this.props.profile.bankInfo,
        canDone: false
      });
    } else {
      this.setState({ isDialogVisible: visibility });
    }
  }

  render() {
    return (
      <BankInformationComponent
        {...this.state}
        mainActivity={this.props.activity}
        canUpdate={this.props.canUpdate}
        setDialogVisibility={this.handleDialogVisibility}
        changeInput={this.handleChange}
        setProfile={this.handleSetProfile}
        updateBankInformation={this.handleUpdateBankInfo}
      />
    );
  }
}

export default BankInformationContainer;
