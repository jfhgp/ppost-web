import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PersonalInfoComponent from './PersonalInfoComponent';
import { readImageAsBase64, deepClone } from '../../../utils/functions';
import { validatePersonalInformation } from '../profile-validators';
import { withStore } from '../../../utils/store.util';
import ApiCalls from '../../../service/RequestHandler';

class PersonalInfoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.profile,
      file: null,
      isDialogVisible: false,
      comp: () => null,
      canDone: false,
      errors: {},
      activity: false
    };

    this.handlePicture = file => this.setPicture(file);
    this.handleChange = e => this.changeInput(e);
    this.handleSetProfile = () => this.setProfile();
    this.handleDialogVisibility = (a, b, visibility) =>
      this.setDialogVisibility(visibility);
    this.handleUpdateProfile = () => this.updateProfile();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.profile.active === undefined &&
      this.props.profile.active !== undefined
    ) {
      this.setState({ ...this.props.profile });
    }
  }

  async updateProfile() {
    if (this.state.file) {
      this.setState({ activity: true });
      const formData = new FormData();
      formData.append('file', this.state.file);
      try {
        const response = await ApiCalls.uploadTFile(formData);
        const newProfile = { ...this.state };
        newProfile.picture = response.data.path;
        delete newProfile.isDialogVisible;
        delete newProfile.file;
        delete newProfile.errors;
        delete newProfile.activity;
        delete newProfile.canDone;

        this.setState({ activity: false });
        this.props.store.updateProfile(newProfile);
      } catch (error) {
        throw error;
      }
    } else {
      this.props.store.updateProfile();
    }
  }

  changeInput(e) {
    const { name, value } = e.target;
    if (this.state.errors[name]) {
      this.setState(prevState => ({
        [name]: value,
        canDone: true,
        errors: { ...prevState.errors, [name]: false }
      }));
    } else {
      this.setState({ [name]: value, canDone: true });
    }
  }

  setPicture(file) {
    readImageAsBase64(file, result => {
      this.setState(
        {
          file,
          picture: result
        },
        () => this.setProfile()
      );
    });
  }

  setProfile() {
    if (this.isValid()) {
      const newProfile = deepClone(this.state);
      delete newProfile.isDialogVisible;
      delete newProfile.file;
      delete newProfile.errors;
      delete newProfile.activity;
      delete newProfile.canDone;
      delete newProfile.comp;

      this.setState({ canDone: false, isDialogVisible: false });
      this.props.setProfile(newProfile);
    }
  }

  handleDialogData = comp => {
    this.setState({ isDialogVisible: true, comp });
  };

  handleDialogClose = () => {
    this.setState({ isDialogVisible: false, ...this.props.profile });
  };

  isValid() {
    const { errors, isValid } = validatePersonalInformation(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    return (
      <PersonalInfoComponent
        {...this.state}
        activity={this.state.activity}
        mainActivity={this.props.activity}
        canUpdate={this.props.canUpdate}
        setPicture={this.handlePicture}
        changeInput={this.handleChange}
        setProfile={this.handleSetProfile}
        updateProfile={this.handleUpdateProfile}
        handleDialogData={this.handleDialogData}
        handleDialogClose={this.handleDialogClose}
      />
    );
  }
}

PersonalInfoContainer.propTypes = {
  activity: PropTypes.bool,
  canUpdate: PropTypes.bool,
  profile: PropTypes.shape(),
  setProfile: PropTypes.func,
  store: PropTypes.shape({ updateProfile: PropTypes.func })
};

export default withStore(PersonalInfoContainer);
