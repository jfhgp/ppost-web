import React, { Component } from 'react';

import { authClass } from '../../utils/auth.util';
import ApiCalls from '../../service/RequestHandler';
import UserSettingsComponent from './UserSettingsComponent';
import { newGrowl } from '../../components/ui/GrowlComponent';

class UserSettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.user = authClass.getUser;
    this.state = {
      activity: true,
      password: "******",
      errors: {},
      isDialogVisible: false,
      dialogData: { values: [] },
      oldPassword: "",
      newPassword: "",
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      mobile: this.user.mobile,
      weightUnit: { value: '', label: 'Weight' },
      currency: { value: '', label: 'Currency' },
      language: { value: '', label: 'Language' },
      measurementUnit: { value: '', label: 'Measurement' },
      isUpdate: false
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  async getProfile() {
    try {
      const response = await ApiCalls.getUserById(this.user._id);

      this.setState({
        activity: false,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        mobile: response.mobile,
        language: { value: response.config.language },
        currency: { value: response.config.currency },
        weightUnit: { value: response.config.weightUnit },
        measurementUnit: { value: response.config.measurementUnit }
      });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  handleUpdateUserProfile = async () => {
    this.setState({
      activity: true
    });
    const profileToUpdate = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      config: {
        currency: this.state.currency.value,
        language: this.state.language.value,
        weightUnit: this.state.weightUnit.value,
        measurementUnit: this.state.measurementUnit.value
      }
    };

    try {
      const response = await ApiCalls.updateUserProfile(profileToUpdate);
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
        const response = await ApiCalls.changePasswordUser(changePassword);
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

  handleSetProfile = profile => {
    this.setState({
      activity: false,
      profile
    });
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

  handleDialogVisibility = (visibility, dialogData) => {
    if (visibility === true) {
      this.setState({
        dialogData: dialogData,
        isDialogVisible: visibility
      });
    } else {
      if (this.isValid()) {
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
      <UserSettingsComponent
        {...this.state}
        handleChange={this.handleChange}
        handleSetProfile={this.handleSetProfile}
        handleChangePassword={this.handleChangePassword}
        handleDialogVisibility={this.handleDialogVisibility}
        handleUpdateUserProfile={this.handleUpdateUserProfile}
      />
    );
  }
}

export default UserSettingsContainer;
