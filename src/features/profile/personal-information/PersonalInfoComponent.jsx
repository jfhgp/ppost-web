import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import FileUpload from '../../../components/form/FileUpload';
import PIChangePasswordContainer from './password/PIChangePasswordContainer';
import PIBasicSettingsContainer from './basic-settings/PIBasicSettingsContainer';

const PersonalInfoComponent = props => {
  const {
    handleDialogClose,
    handleDialogData,
    changeInput,
    errors,
    comp: Comp
  } = props;
  const picture = props.picture || require('../../../upload/img.png');

  return (
    <div className="p-grid personal-info">
      <div className="p-col-12">
        <Typography variant="h5">Account Settings</Typography>
        <Typography variant="body1">
          Your basic settings like name, email, mobile and more.
        </Typography>
      </div>
      <div className="p-col-12" id="profile-image">
        <div>
          <img src={picture} alt="profile" />
          <FileUpload
            className="profile-image-upload"
            hideMessage
            element={
              <div>
                <PhotoCamera style={{ fontSize: 20 }} />
              </div>
            }
            onDrop={acceptedFiles => props.setPicture(acceptedFiles[0])}
          />
        </div>
      </div>
      <div className="p-col-12">
        <div className="personal-details">
          <p>Name</p>
          <p>
            {props.firstName || 'John Doe'} {props.lastName}
          </p>
        </div>
        <div className="personal-details">
          <p>Email</p>
          <p>{props.email}</p>
        </div>
        <div className="personal-details">
          <p>Phone</p>
          <p>+{props.mobile}</p>
        </div>
        <div className="p-col-12 text-right">
          <IconButton
            onClick={() => handleDialogData(PIBasicSettingsContainer)}
            disabled={props.activity || props.mainActivity}
          >
            <Edit style={{ fontSize: '1rem' }} />
          </IconButton>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div className="personal-details" style={{ padding: 0 }}>
            <p>Password</p>
            <p>***************</p>
          </div>
          <Button onClick={() => handleDialogData(PIChangePasswordContainer)}>
            Change
          </Button>
        </div>
      </div>

      {props.canUpdate ? (
        <React.Fragment>
          <div className="p-col-12">
            <p className="heading-body" style={{ marginTop: '1.5rem' }}>
              Actions
            </p>
          </div>
          <div className="p-col-12 text-right">
            <Button
              disabled={props.activity || props.mainActivity}
              onClick={props.updateProfile}
            >
              Save
            </Button>
          </div>
        </React.Fragment>
      ) : null}
      <Dialog
        open={props.isDialogVisible}
        onClose={handleDialogClose}
        maxWidth="sm"
        className="p-information-dialog"
      >
        <Comp
          errors={errors}
          email={props.email}
          mobile={props.mobile}
          lastName={props.lastName}
          handleChange={changeInput}
          firstName={props.firstName}
          setProfile={props.setProfile}
          handleDialogClose={handleDialogClose}
          disabled={!props.canDone || props.activity || props.mainActivity}
        />
      </Dialog>
    </div>
  );
};

PersonalInfoComponent.propTypes = {
  setDialogVisibility: PropTypes.func,
  changeInput: PropTypes.func,
  setProfile: PropTypes.func,
  setPicture: PropTypes.func,
  errors: PropTypes.shape(),
  canDone: PropTypes.bool,
  isDialogVisible: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  mobile: PropTypes.string,
  picture: PropTypes.string,
  activity: PropTypes.bool,
  mainActivity: PropTypes.bool,
  canUpdate: PropTypes.bool,
  updateProfile: PropTypes.func,
  handleDialogClose: PropTypes.func,
  handleDialogData: PropTypes.func,
  comp: PropTypes.func
};

export default PersonalInfoComponent;
