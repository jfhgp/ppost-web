import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';

import { authClass } from '../../../../utils/auth.util';
import ApiCalls from '../../../../service/RequestHandler';
import { newGrowl } from '../../../../components/ui/GrowlComponent';

const apiCallType = {
  user: ApiCalls.changePasswordUser,
  transporter: ApiCalls.changePasswordTransporter
};

export default class PIChangePasswordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: false,
      oldPassword: '',
      newPassword: '',
      errors: {}
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ activity: true });

      try {
        await apiCallType[authClass.getUser.userType]({
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword
        });

        newGrowl.showGrowl('success', 'Password changed successfully.');
        this.props.handleDialogClose();
      } catch (error) {
        newGrowl.showGrowl('error', error.response.data.message);
        this.setState({ activity: false });
      }
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      [name]: value,
      errors: { ...prevState.errors, [name]: false }
    }));
  };

  isValid() {
    const errors = {};
    let isValid = true;

    if (!this.state.oldPassword) {
      errors.oldPassword = true;
      isValid = false;
    }
    if (!this.state.newPassword) {
      errors.newPassword = true;
      isValid = false;
    }

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent style={{ padding: '1rem' }}>
          <div className="p-grid">
            <div className="p-col-12" style={{ padding: 0 }}>
              <form onSubmit={this.handleSubmit} autoComplete="off">
                <div style={{ padding: 7 }}>
                  <TextField
                    label="Current Password"
                    name="oldPassword"
                    value={this.state.oldPassword}
                    onChange={this.handleChange}
                    fullWidth
                    variant="outlined"
                    placeholder="current password"
                    error={errors.oldPassword}
                  />
                </div>
                <div style={{ padding: 7 }}>
                  <TextField
                    label="New Password"
                    name="newPassword"
                    value={this.state.newPassword}
                    onChange={this.handleChange}
                    fullWidth
                    variant="outlined"
                    placeholder="new password"
                    error={errors.newPassword}
                  />
                </div>
                <DialogActions>
                  <Button
                    disabled={this.state.activity}
                    onClick={this.props.handleDialogClose}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={this.state.activity}
                    onClick={this.handleSubmit}
                    color="primary"
                  >
                    Change
                  </Button>
                </DialogActions>
              </form>
            </div>
          </div>
        </DialogContent>
      </React.Fragment>
    );
  }
}

PIChangePasswordContainer.propTypes = {
  handleDialogClose: PropTypes.func
};
