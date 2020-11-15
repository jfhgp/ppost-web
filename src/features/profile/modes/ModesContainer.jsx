import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ModesComponent from './ModesComponent';

export default class ModesContainer extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      mode: PropTypes.arrayOf(PropTypes.string),
      active: PropTypes.bool
    }),
    activity: PropTypes.bool,
    canUpdate: PropTypes.bool,
    setProfile: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      modes: props.profile.mode || [],
      isDialogVisible: false,
      mode: '',
      error: false,
      canDone: false
    };

    this.handleChange = e => this.changeInput(e);
    this.handleSetProfile = () => this.setProfile();
    this.handleDialogVisibility = (a, b, visibility) =>
      this.setDialogVisibility(visibility);
    this.handleAddMode = () => this.addMode();
    this.handleDeleteMode = mode => this.deleteMode(mode);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.profile.active === undefined &&
      this.props.profile.active !== undefined
    ) {
      this.setState({ modes: this.props.profile.mode });
    }
  }

  changeInput(e) {
    const { name, value } = e.target;
    if (this.state.error) {
      this.setState({
        [name]: value,
        error: false
      });
    } else {
      this.setState({ [name]: value });
    }
  }

  addMode() {
    if (this.state.mode) {
      if (this.state.modes.indexOf(this.state.mode) === -1) {
        const modes = [...this.state.modes];
        modes.push(this.state.mode);
        this.setState({ modes, mode: '', error: false, canDone: true });
      }
    } else {
      this.setState({ error: true });
    }
  }

  deleteMode(mode) {
    if (this.state.modes.length > 1) {
      const modes = this.state.modes.filter(item => item !== mode);
      this.setState({ modes, canDone: true });
    }
  }

  setProfile() {
    if (this.state.modes.length) {
      const profile = { ...this.props.profile };
      profile.mode = this.state.modes;

      this.setState({ isDialogVisible: false, canDone: false });
      this.props.setProfile(profile);
    }
  }

  setDialogVisibility(visibility) {
    if (visibility === undefined) {
      this.setState({
        isDialogVisible: false,
        modes: this.props.profile.mode,
        canDone: false
      });
    } else {
      this.setState({ isDialogVisible: visibility });
    }
  }

  render() {
    return (
      <ModesComponent
        {...this.state}
        activity={this.props.activity}
        canUpdate={this.props.canUpdate}
        setDialogVisibility={this.handleDialogVisibility}
        changeInput={this.handleChange}
        setProfile={this.handleSetProfile}
        addMode={this.handleAddMode}
        deleteMode={this.handleDeleteMode}
      />
    );
  }
}
