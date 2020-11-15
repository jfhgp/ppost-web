import React from 'react';
import PropTypes from 'prop-types';

import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';
import { authClass } from '../../../../utils/auth.util';

const PIBasicSettingsContainer = props => {
  const { errors, handleChange } = props;
  return (
    <React.Fragment>
      <DialogTitle>Change Information</DialogTitle>
      <DialogContent style={{ padding: '1rem' }}>
        <div className="p-grid">
          {authClass.getUser.userType === 'user' ? (
            <React.Fragment>
              <div className="p-col-12">
                <TextField
                  label="First Name"
                  name="firstName"
                  value={props.firstName}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="first name"
                  error={errors.firstName}
                />
              </div>
              <div className="p-col-12">
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={props.lastName}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="last name"
                  error={errors.lastName}
                />
              </div>
            </React.Fragment>
          ) : null}
          <div className="p-col-12">
            <TextField
              label="Email"
              type="email"
              name="email"
              value={props.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              placeholder="email"
              error={errors.email}
            />
          </div>
          {/* <div className="p-col-12">
            <TextField
              label="Phone"
              type="tel"
              name="mobile"
              value={props.mobile}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              placeholder="mobile"
              error={errors.mobile}
            />
          </div> */}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleDialogClose}>Cancel</Button>
        <Button
          onClick={props.setProfile}
          disabled={props.disabled}
          color="primary"
        >
          Done
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

PIBasicSettingsContainer.propTypes = {
  email: PropTypes.string,
  mobile: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.shape(),
  lastName: PropTypes.string,
  setProfile: PropTypes.func,
  userType: PropTypes.string,
  firstName: PropTypes.string,
  handleChange: PropTypes.func,
  handleDialogClose: PropTypes.func
};

export default PIBasicSettingsContainer;
