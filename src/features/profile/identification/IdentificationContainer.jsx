import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ApiCalls from '../../../service/RequestHandler';
import IdentificationComponent from './IdentificationComponent';
import { withStore } from '../../../utils/store.util';
import { readImageAsBase64 } from '../../../utils/functions';

class IdentificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: props.profile.identity || [],
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
      this.setState({ identity: this.props.profile.identity || [] });
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
      newProfile.identity = result;
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

  handleSetProfile = () => {
    const profile = { ...this.props.profile };
    profile.identity = this.state.identity;

    this.props.setProfile(profile);
    this.setState({ canDone: false });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageClick = () => {
    this.props.store.setMultiWithRender({
      lightBoxIsOpen: true,
      lightBoxImages: this.state.identity.map(item => ({ src: item.path }))
    });
  };

  handleFileDrop = file => {
    readImageAsBase64(file, result => {
      this.setState(
        prevState => {
          const { currentKey } = this.state;
          const newIdentity = [...prevState.identity];
          const name = currentKey === '0' ? 'front' : 'back';

          newIdentity[currentKey] = {
            name,
            path: result
          };

          return {
            identity: newIdentity,
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
      <IdentificationComponent
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

IdentificationContainer.propTypes = {
  profile: PropTypes.shape({
    identity: PropTypes.arrayOf(PropTypes.shape()),
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

export default withStore(IdentificationContainer);
