/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { authClass } from '../../../utils/auth.util';
import ApiCalls from '../../../service/RequestHandler';
import TransporterProfileComponent from './TransporterProfileComponent';
import * as authUtil from '../../../utils/auth.util';

// Components
import TravellingInformationAddContainer from '../travelling-information/add/TravellingInformationAddContainer';
import TravellingInformationUpdateContainer from '../travelling-information/update/TravellingInformationUpdateContainer';

const canBeEmpty = ['iban'];
class TransporterProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: '',
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

      iban: ''
    };
  }

  async componentDidMount() {
    const { userType } = await authUtil.getUser();

    this.setState({ userType });
    this.getProfile();
    this.getBankAccounts();
  }

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
    if (this.state.userType === 'user') {
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
      try {
        const response = await ApiCalls.getTransporterProfileById({
          _id: authClass.getUser._id
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
      <TransporterProfileComponent
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
      />
    );
  }
}

TransporterProfileContainer.propTypes = {
  params: PropTypes.shape({ hideBankAccount: PropTypes.bool })
};

export default TransporterProfileContainer;
