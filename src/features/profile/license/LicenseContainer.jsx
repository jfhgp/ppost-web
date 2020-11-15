import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ApiCalls from '../../../service/RequestHandler';
import LicenseComponent from './LicenseComponent';
import { withStore } from '../../../utils/store.util';
import { readImageAsBase64 } from '../../../utils/functions';

class LicenseContainer extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      license: PropTypes.arrayOf(PropTypes.shape()),
      active: PropTypes.bool
    }),
    store: PropTypes.shape({
      setMultiWithRender: PropTypes.func,
      updateProfile: PropTypes.func
    }),
    activity: PropTypes.bool,
    canUpdate: PropTypes.bool,
    setProfile: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      license: props.profile.license || [],
      currentKey: '0',
      files: {},
      canDone: false,
      activity: false
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.profile.active === undefined &&
      this.props.profile.active !== undefined
    ) {
      this.setState({ license: this.props.profile.license || [] });
    }
  }

  handleUpdateProfile = async () => {
    this.setState({ activity: true });
    try {
      const result = await Promise.all(
        Object.keys(this.state.files).map(item =>
          this.uploadFile(this.state.files[item], item)
        )
      );

      const newProfile = { ...this.props.profile };
      newProfile.license = result;
      this.setState({ activity: false });
      this.props.store.updateProfile(newProfile);
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  uploadFile = async (file, item) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await ApiCalls.uploadTFile(formData);
        return { name: item, path: response.data.path };
      } catch (error) {
        throw error;
      }
    } else {
      return Promise.resolve(item);
    }
  };

  handleSetProfile = async () => {
    const profile = { ...this.props.profile };
    profile.license = this.state.license;

    this.props.setProfile(profile);
    this.setState({ canDone: false });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageClick = () => {
    this.props.store.setMultiWithRender({
      lightBoxIsOpen: true,
      lightBoxImages: this.state.license.map(item => ({ src: item.path }))
    });
  };

  handleFileDrop = file => {
    readImageAsBase64(file, result => {
      this.setState(
        prevState => {
          const { currentKey } = this.state;
          const newLicense = [...prevState.license];
          const name = currentKey === '0' ? 'licenseFront' : 'licenseBack';

          newLicense[currentKey] = {
            name,
            path: result
          };

          return {
            license: newLicense,
            files: {
              ...prevState.files,
              [name]: file
            },
            canDone: true
          };
        },
        () => window.scrollTo(0, document.body.scrollHeight)
      );
    });
  };

  render() {
    return (
      <LicenseComponent
        {...this.state}
        mainActivity={this.props.activity}
        canUpdate={this.props.canUpdate}
        handleChange={this.handleChange}
        handleSetProfile={this.handleSetProfile}
        handleImageClick={this.handleImageClick}
        handleFileDrop={this.handleFileDrop}
        handleUpdateProfile={this.handleUpdateProfile}
      />
    );
  }
}

export default withStore(LicenseContainer);
