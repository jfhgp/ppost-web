import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ApiCalls from '../../../service/RequestHandler';
import VisaComponent from './VisaComponent';
import { withStore } from '../../../utils/store.util';
import { readImageAsBase64 } from '../../../utils/functions';

class VisaContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visa: props.profile.visa || [],
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
      this.setState({ visa: this.props.profile.visa });
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
      newProfile.visa = result;
      this.setState({ activity: false });
      this.props.store.updateProfile(newProfile);
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  async uploadFile(file, item) {
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
  }

  handleSetProfile = async () => {
    const profile = { ...this.props.profile };
    profile.visa = this.state.visa;

    this.props.setProfile(profile);
    this.setState({ canDone: false });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageClick = () => {
    this.props.store.setMultiWithRender({
      lightBoxIsOpen: true,
      lightBoxImages: this.state.visa.map(item => ({ src: item.path }))
    });
  };

  handleFileDrop = file => {
    readImageAsBase64(file, result => {
      this.setState(
        prevState => {
          const { currentKey } = this.state;
          const newVisa = [...prevState.visa];
          const name = currentKey === '0' ? 'visaFront' : 'visaBack';

          newVisa[currentKey] = {
            name,
            path: result
          };

          return {
            visa: newVisa,
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
      <VisaComponent
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

VisaContainer.propTypes = {
  profile: PropTypes.shape({
    visa: PropTypes.arrayOf(PropTypes.shape()),
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

export default withStore(VisaContainer);
