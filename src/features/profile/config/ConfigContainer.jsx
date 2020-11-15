import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ConfigComponent from './ConfigComponent';

class ConfigContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.profile.config,
      isDialogVisible: false,
      canDone: false
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.profile.active === undefined &&
      this.props.profile.active !== undefined
    ) {
      this.setState({ ...this.props.profile.config });
    }
  }

  changeInput = e => {
    this.setState({ [e.target.name]: e.target.value, canDone: true });
  };

  setProfile = () => {
    const profile = { ...this.props.profile };
    const config = { ...this.state };
    delete config.isDialogVisible;
    delete config.canDone;
    profile.config = config;

    this.setState({ isDialogVisible: false, canDone: false });
    this.props.setProfile(profile);
  };

  setDialogVisibility = (a, b, visibility) => {
    if (visibility === undefined) {
      this.setState({ isDialogVisible: false });
    } else {
      this.setState({ isDialogVisible: visibility });
    }
  };

  render() {
    return (
      <ConfigComponent
        {...this.state}
        activity={this.props.activity}
        canUpdate={this.props.canUpdate}
        setDialogVisibility={this.setDialogVisibility}
        changeInput={this.changeInput}
        setProfile={this.setProfile}
      />
    );
  }
}

ConfigContainer.propTypes = {
  profile: PropTypes.shape({
    config: PropTypes.shape(),
    active: PropTypes.bool
  }),
  activity: PropTypes.bool,
  canUpdate: PropTypes.bool,
  setProfile: PropTypes.func
};

export default ConfigContainer;
