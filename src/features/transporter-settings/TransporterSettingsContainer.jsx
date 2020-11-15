import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { authClass } from '../../utils/auth.util';
import ApiCalls from '../../service/RequestHandler';
import { newGrowl } from '../../components/ui/GrowlComponent';
import TransporterSettingsComponent from './TransporterSettingsComponent';

const canBeEmpty = ['iban'];

const apiCallType = {
  user: ApiCalls.updateUserProfile,
  transporter: ApiCalls.updateTransporterProfile
};

class TransporterSettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.user = authClass.getUser;

    this.state = {
      activity: true,
      errors: {},
      password: "******",
      hideBankAccount: props.params.hideBankAccount,
      bankAccounts: [],
      isDialogVisible: false,
      dialogData: { values: [] },
      notifications: this.user.notifications,
      twoFactorLogin: this.user.twoFactorLogin,
      iban: '',
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      mobile: this.user.mobile,
      oldPassword: "",
      newPassword: "",
      weightUnit: { value: '', label: 'Weight' },
      currency: { value: '', label: 'Currency' },
      language: { value: '', label: 'Language' },
      measurementUnit: { value: '', label: 'Measurement' },
      isUpdate: false
    };
  }

  async componentDidMount() {
    await this.getProfile();
    this.getBankAccounts();
  }


  async getProfile() {
    try {
      let response = await ApiCalls.getTransporterProfileById({
        _id: this.user._id
      });
      response = response.data;
      this.setState({
        // activity: false,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        mobile: response.mobile,
        password: this.state.password,
        language: { value: response.config.language },
        currency: { value: response.config.currency },
        weightUnit: { value: response.config.weightUnit },
        measurementUnit: { value: response.config.measurementUnit }
      });
    } catch (error) {
      // this.setState({ activity: false });
    }
  }

  async getBankAccounts() {
    // this.setState({ activity: true });
    try {
      let response = await ApiCalls.getBankInfo();
      this.setState({
        iban: '',
        activity: false,
        isDialogVisible: false,
        dialogData: { values: [] },
        bankAccounts: response.data
      });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  handleAddBankAccount = async () => {
    if (this.isValid()) {
      this.setState({ activity: true });

      try {
        await ApiCalls.addBankAccount({ iban: this.state.iban });
        this.getBankAccounts();
      } catch (error) {
        this.setState({ activity: false });
      }
    }
  };

  handleUpdateDefaultCard = async e => {
    this.setState({ activity: true });

    try {
      await ApiCalls.updateDefaultCard({
        _id: e.target.value
      });
      this.getBankAccounts();
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleChangePassword = async () => {
    if (this.isValid()) {
      this.setState({
        activity: true
      });
      const changePassword = {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword
      };

      try {
        const response = await ApiCalls.changePasswordTransporter(changePassword);
        this.setState({
          activity: false,
          isDialogVisible: false,
          oldPassword: "",
          newPassword: ""
        });
        newGrowl.showGrowl(
          'success',
          'Success',
          'Your Password have been Changed Successfully.'
        );
      } catch (error) {
        newGrowl.showGrowl(
          'error',
          'Error',
          'Invalid Password'
        );
        this.setState({
          activity: false,
          oldPassword: "",
          newPassword: ""
        });
      }
    }
  };

  handleUpdateProfile = async () => {
    this.setState({
      activity: true
    });
    const profileToUpdate = {
      email: this.state.email,
      config: {
        currency: this.state.currency.value,
        language: this.state.language.value,
        weightUnit: this.state.weightUnit.value,
        measurementUnit: this.state.measurementUnit.value
      }
    };

    try {
      const response = await ApiCalls.updateTransporterProfile(profileToUpdate);
      this.setState({
        activity: false,
        isUpdate: false
      });
      newGrowl.showGrowl(
        'success',
        'Success',
        'Your settings have been updated.'
      );
      await authClass.setUserOnUpdate(response.data);
    } catch (error) {
      this.setState({ activity: false, isUpdate: true });
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    if (this.state.errors[name]) {
      this.setState(prevState => ({
        [name]: value,
        errors: { ...prevState.errors, [name]: false }
      }));
    }
    else if (name === "oldPassword" || name === "newPassword") {
      this.setState({ [name]: value });
    }
    else {
      this.setState({ [name]: value, isUpdate: true });
    }
  };

  handleToggleChange = async e => {
    const { checked, name } = e.target;
    try {
      const response = await apiCallType[authClass.getUser.userType]({
        [name]: checked
      });
      await authClass.setUser(response.data);
      this.setState({ [name]: checked });
    } catch (error) {
      console.log(error);
    }
  };

  handleDialogVisibility = (visibility, dialogData) => {
    if (visibility === true) {
      this.setState({
        dialogData: dialogData,
        isDialogVisible: visibility
      });
    } else {
      if (
        canBeEmpty.indexOf(this.state.dialogData.name) !== -1 ||
        this.isValid()
      ) {
        this.setState({
          dialogData: { values: [] },
          isDialogVisible: false
        });
      }
    }
  };

  isValid = () => {
    let errors = {},
      isValid = true;

    this.state.dialogData.values.forEach(item => {
      if (!this.state[item.name]) {
        isValid = false;
        errors[item.name] = true;
      }
    });

    this.setState({ errors });
    return isValid;
  };

  render() {
    return (
      <TransporterSettingsComponent
        {...this.state}
        handleChange={this.handleChange}
        handleUpdateProfile={this.handleUpdateProfile}
        handleChangePassword={this.handleChangePassword}
        handleAddBankAccount={this.handleAddBankAccount}
        handleDialogVisibility={this.handleDialogVisibility}
        handleUpdateDefaultCard={this.handleUpdateDefaultCard}
        handleToggleChange={this.handleToggleChange}
      />
    );
  }
}

TransporterSettingsContainer.propTypes = {
  params: PropTypes.shape({ hideBankAccount: PropTypes.bool })
};

export default TransporterSettingsContainer;
