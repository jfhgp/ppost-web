import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { authClass } from '../../../utils/auth.util';
import ApiCalls from '../../../service/RequestHandler';
import CustomerProfileComponent from './CustomerProfileComponent';
import * as authUtil from '../../../utils/auth.util';
import {
  readImageAsBase64,
  uploadFile,
  generateOrderNumber
} from '../../../utils/functions';
// Components
import TravellingInformationAddContainer from '../travelling-information/add/TravellingInformationAddContainer';
import TravellingInformationUpdateContainer from '../travelling-information/update/TravellingInformationUpdateContainer';
import { newGrowl } from '../../../components/ui/GrowlComponent';
const canBeEmpty = ['iban'];
class CustomerProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: '',
      user: authClass.getUser,
      component: '',
      activity: false,
      componentData: null,
      isDialogVisible: false,
      profile: {},

      errors: {},
      hideBankAccount: props.params.hideBankAccount,
      bankAccounts: [],
      dialogData: { values: [] },
      isDialogVisibleAddBankAccount: false,
      weightUnit: { value: '', label: 'Weight' },
      currency: { value: '', label: 'Currency' },
      language: { value: '', label: 'Language' },
      measurementUnit: { value: '', label: 'Measurement' },
      files: "",
      iban: ''
    };
  }

  async componentDidMount() {
    const user = await authUtil.getUser();
    this.setState({
      activity: false, userType: user.userType, user, language: { value: user.config.language },
      currency: { value: user.config.currency },
      weightUnit: { value: user.config.weightUnit },
      measurementUnit: { value: user.config.measurementUnit }
    });

    this.getProfile();
    this.getBankAccounts();
  }

  onFileDrop = async (file, item) => {
    readImageAsBase64(file, result => {
      this.setState(prevState => ({
        files: file,
      }));
    });
    this.uploadFile(file);
  }

  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await ApiCalls.uploadTFile(formData);
      this.handleUpdateUserProfile(response.data.path)
    } catch (error) {
      throw error;
    }
  }

  handleUpdateUserProfile = async (data) => {
    this.setState({
      activity: true
    });
    const profileToUpdate = {
      picture: data
    };
    try {
      const response = await ApiCalls.updateUserProfile(profileToUpdate);
      this.setState({
        activity: false,
        isUpdate: false,
        user: response.data
      });
      window.location.reload();
      await authClass.setUserOnUpdate(response.data);
    } catch (error) {
      this.setState({ activity: false, isUpdate: true });
    }
  };




  async getBankAccounts() {
    // this.setState({ activity: true });
    try {
      let response = await ApiCalls.getBankInfo();
      this.setState({
        iban: '',
        activity: false,
        isDialogVisibleAddBankAccount: false,
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

  handleDialogVisibility = (visibility, dialogData) => {
    if (visibility === true) {
      this.setState({
        dialogData: dialogData,
        isDialogVisibleAddBankAccount: visibility
      });
    } else {
      if (
        canBeEmpty.indexOf(this.state.dialogData.name) !== -1 ||
        this.isValid()
      ) {
        this.setState({
          dialogData: { values: [] },
          isDialogVisibleAddBankAccount: false
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

  async getProfile() {
    if (this.state.userType === 'transporter') {
      try {
        const response = await ApiCalls.getTransporterProfileById({
          _id: this.props.match.params.id
        });

        this.setState({
          activity: false, profile: response.data, language: { value: response.data.config.language },
          currency: { value: response.data.config.currency },
          weightUnit: { value: response.data.config.weightUnit },
          measurementUnit: { value: response.data.config.measurementUnit }
        });
      } catch (error) {
        this.setState({ activity: false });
      }
    } else {
      this.setState({ activity: false, profile: this.state.user });
      //   try {
      //  
      //     const response = await ApiCalls.getTransporterProfileById({
      //       _id: authClass.getUser._id
      //     });

      //     this.setState({ activity: false, profile: response.data });
      //   } catch (error) {
      //     this.setState({ activity: false });
      //   }
      // }
    }
  }

  handleSetCurrentComponent = (component, componentData = null) => {
    this.setState({
      component,
      componentData,
      isDialogVisible: true
    });
  };

  handleGetComponent = component => {
    switch (component) {
      case 'travelling-add': {
        return TravellingInformationAddContainer;
      }
      case 'travelling-update': {
        return TravellingInformationUpdateContainer;
      }
      default: {
        return () => null;
      }
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    if (this.state.errors[name]) {
      this.setState(prevState => ({
        [name]: value,
        errors: { ...prevState.errors, [name]: false }
      }));
    } else {
      this.setState({ [name]: value, isUpdate: true });
    }
  };

  handleInformation = travelling => {
    this.setState({
      component: '',
      componentData: null,
      isDialogVisible: false,
      profile: { ...this.state.profile, travelling }
    });
  };

  handleCloseDialog = () => {
    this.setState({
      component: '',
      componentData: null,
      isDialogVisible: false
    });
  };

  render() {
    return (
      <CustomerProfileComponent
        {...this.state}
        profile={this.state.profile}
        handleInformation={this.handleInformation}
        handleCloseDialog={this.handleCloseDialog}
        handleGetComponent={this.handleGetComponent}
        handleDialogVisibility={this.handleDialogVisibility}
        handleSetCurrentComponent={this.handleSetCurrentComponent}
        handleUpdateDefaultCard={this.handleUpdateDefaultCard}
        handleAddBankAccount={this.handleAddBankAccount}
        handleChange={this.handleChange}
        onFileDrop={this.onFileDrop}
      />
    );
  }
}

CustomerProfileContainer.propTypes = {
  params: PropTypes.shape({ hideBankAccount: PropTypes.bool })
};

export default CustomerProfileContainer;
