import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import EmptyPlaceholder from '../../../components/ui/EmptyPlaceholder';

const BankInformationComponent = props => {
  const { setDialogVisibility, changeInput } = props;

  return (
    <div className="p-grid">
      <div className="p-col-12">
        <Typography variant="h5">Bank Information</Typography>
        <Typography variant="body1">Your bank account information.</Typography>
      </div>
      {props._id ? (
        <div className="p-col-12 p-sm-6">
          <div className="personal-details">
            <p>IBAN</p>
            <p>{props.iban}</p>
          </div>
        </div>
      ) : (
        <div className="p-col-12">
          <EmptyPlaceholder message="We could not find any bank account information for you." />
        </div>
      )}
      <div className="p-col-12 text-right">
        <IconButton
          onClick={() => setDialogVisibility(undefined, undefined, true)}
          disabled={props.activity || props.mainActivity}
        >
          <Edit style={{ fontSize: '1rem' }} />
        </IconButton>
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
              onClick={props.updateBankInformation}
            >
              Save
            </Button>
          </div>
        </React.Fragment>
      ) : null}
      <Dialog
        open={props.isDialogVisible}
        onClose={setDialogVisibility}
        id="b-info-dialog"
      >
        <DialogTitle>Change Information</DialogTitle>
        <DialogContent style={{ padding: '1rem' }}>
          <div className="p-grid">
            <div className="p-col-12">
              <TextField
                label="IBAN"
                name="iban"
                value={props.iban}
                onChange={changeInput}
                fullWidth
                variant="outlined"
                placeholder="iban"
                error={props.error}
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

BankInformationComponent.propTypes = {
  setProfile: PropTypes.func,
  changeInput: PropTypes.func,
  setDialogVisibility: PropTypes.func,
  activity: PropTypes.bool,
  isDialogVisible: PropTypes.bool,
  canDone: PropTypes.bool,
  error: PropTypes.bool,
  _id: PropTypes.string,
  iban: PropTypes.string
};

export default BankInformationComponent;
