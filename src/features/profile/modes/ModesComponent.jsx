import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import FormSelectInput from '../../../components/form/FormSelectInput';
import { withStore } from '../../../utils/store.util';

const modeOptions = [
  { value: 'car', label: 'Car' },
  { value: 'bus', label: 'Bus' },
  { value: 'truck', label: 'Truck' },
  { value: 'train', label: 'Train' },
  { value: 'ship', label: 'Ship' },
  { value: 'aeroplane', label: 'Aeroplane' }
];

const ModesComponent = props => {
  const { setDialogVisibility, activity } = props;
  return (
    <div>
      <div className="p-grid profile-modes">
        <div className="p-col-12">
          <Typography variant="h5">Modes</Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel
            risus enim.
          </Typography>
        </div>
        <div className="p-col-12" style={{ paddingTop: '1rem' }}>
          {props.modes.map((item, index) => (
            <Chip
              key={`mode-${index + 1}`}
              label={item}
              className="chip"
              style={{ padding: '1rem' }}
            />
          ))}
        </div>
        <div className="p-col-12 text-right">
          <IconButton
            disabled={activity}
            onClick={() => setDialogVisibility(undefined, undefined, true)}
          >
            <Edit style={{ fontSize: '1rem' }} />
          </IconButton>
        </div>
      </div>
      {props.canUpdate ? (
        <div>
          <div className="p-col-12">
            <p className="heading-body" style={{ marginTop: '1.5rem' }}>
              Actions
            </p>
          </div>
          <div className="p-col-12 text-right">
            <Button
              disabled={props.activity}
              onClick={() => props.store.updateProfile({ mode: props.modes })}
            >
              Save
            </Button>
          </div>
        </div>
      ) : null}
      <Dialog
        open={props.isDialogVisible}
        onClose={setDialogVisibility}
        id="modes-dialog"
      >
        <DialogTitle>Change Modes</DialogTitle>
        <DialogContent style={{ padding: '1rem' }}>
          <div className="p-grid">
            <div className="p-col-12">
              {props.modes.map((item, index) => (
                <Chip
                  key={`mode-temp-${index + 1}`}
                  label={item}
                  className="chip"
                  onDelete={() => props.deleteMode(item)}
                />
              ))}
            </div>
            <div className="p-col-12" id="add-mode">
              <FormSelectInput
                label="Modes"
                id="profile-modes"
                value={props.mode}
                onChange={props.changeInput}
                name="mode"
                options={modeOptions}
                error={props.error}
              />
              <IconButton onClick={props.addMode} disabled={activity}>
                <Add />
              </IconButton>
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

ModesComponent.propTypes = {
  setDialogVisibility: PropTypes.func,
  setProfile: PropTypes.func,
  addMode: PropTypes.func,
  deleteMode: PropTypes.func,
  changeInput: PropTypes.func,
  error: PropTypes.bool,
  canDone: PropTypes.bool,
  isDialogVisible: PropTypes.bool,
  canUpdate: PropTypes.bool,
  activity: PropTypes.bool,
  modes: PropTypes.arrayOf(PropTypes.string),
  mode: PropTypes.string,
  store: PropTypes.shape({ updateProfile: PropTypes.func })
};

export default withStore(ModesComponent);
