import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import FormSelectInput from '../../../components/form/FormSelectInput';
import { withStore } from '../../../utils/store.util';
import {
  currencyUnits,
  measurementUnits,
  weightUnits,
  legend
} from '../../../utils/unit.util';

const ConfigComponent = props => {
  const { setDialogVisibility, changeInput } = props;

  return (
    <div className="p-grid">
      <div className="p-col-12">
        <Typography variant="h5">Preferences</Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel risus
          enim.
        </Typography>
      </div>
      <div className="p-col-12">
        <div className="personal-details">
          <p>Currency</p>
          <p>{legend[props.currency] || '-'}</p>
        </div>
      </div>
      <div className="p-col-12">
        <div className="personal-details">
          <p>Weight Unit</p>
          <p>{legend[props.weightUnit] || '-'}</p>
        </div>
      </div>
      <div className="p-col-12">
        <div className="personal-details">
          <p>Measurement Unit</p>
          <p>{legend[props.measurementUnit] || '-'}</p>
        </div>
      </div>
      <div className="p-col-12 text-right">
        <IconButton
          onClick={() => setDialogVisibility(undefined, undefined, true)}
        >
          <Edit style={{ fontSize: '1rem' }} />
        </IconButton>
      </div>
      {props.canUpdate ? (
        <React.Fragment>
          <div className="p-col-12">
            <p className="heading" style={{ marginTop: '1.5rem' }}>
              Actions
            </p>
          </div>
          <div className="p-col-12 text-right">
            <Button
              disabled={props.activity}
              onClick={() => props.store.updateProfile(false)}
            >
              Save
            </Button>
          </div>
        </React.Fragment>
      ) : null}
      <Dialog
        open={props.isDialogVisible}
        onClose={setDialogVisibility}
        id="p-config-dialog"
      >
        <DialogTitle>Change Information</DialogTitle>
        <DialogContent style={{ padding: '1rem' }}>
          <div className="p-grid">
            <div className="p-col-12">
              <FormSelectInput
                label="Currency"
                id="profile-currency"
                value={props.currency}
                onChange={changeInput}
                name="currency"
                options={currencyUnits}
              />
            </div>
            <div className="p-col-12">
              <FormSelectInput
                label="Weight Unit"
                id="profile-weight-unit"
                value={props.weightUnit}
                onChange={changeInput}
                name="weightUnit"
                options={weightUnits}
              />
            </div>
            <div className="p-col-12">
              <FormSelectInput
                label="Measurement Unit"
                id="profile-measurement-unit"
                value={props.measurementUnit}
                onChange={changeInput}
                name="measurementUnit"
                options={measurementUnits}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={setDialogVisibility}>Cancel</Button>
          <Button
            onClick={props.setProfile}
            disabled={!props.canDone}
            color="primary"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ConfigComponent.propTypes = {
  setDialogVisibility: PropTypes.func,
  changeInput: PropTypes.func,
  setProfile: PropTypes.func,
  isDialogVisible: PropTypes.bool,
  activity: PropTypes.bool,
  canUpdate: PropTypes.bool,
  canDone: PropTypes.bool,
  measurementUnit: PropTypes.string,
  weightUnit: PropTypes.string,
  currency: PropTypes.string,
  store: PropTypes.shape({ updateProfile: PropTypes.func })
};

export default withStore(ConfigComponent);
