import React from 'react';
import PropTypes from 'prop-types';

import {
  Radio,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent
} from '@material-ui/core';
import moment from 'moment';
import orange from '@material-ui/core/colors/orange';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';
import { classNames, getPrimaryColors } from '../../../utils/functions';
import FormMultipleDateInputField from '../../../components/form/FormMultipleDateInputField';
import FormDateInputField from '../../../components/form/FormDateInputField';
import { DialogActions } from '../../../components/dashboard-ui/Earnings/Dialog';
import SelectLocationReusableComponent from '../../../components/map/SelectLocationReusableComponent';
import FormNativeSelectInputField from '../../../components/form/FormNativeSelectInputField';

const returnOptions = [
  { value: 'false', label: 'One way' },
  { value: 'true', label: 'Return' }
];

const modeOptions = [
  { value: 'air', label: 'Air' },
  { value: 'bike', label: 'Bike' },
  { value: 'bus', label: 'Bus' },
  { value: 'car', label: 'Car' },
  { value: 'sea', label: 'Sea' },
  { value: 'train', label: 'Train' },
  { value: 'truck', label: 'Truck' },
  { value: 'van', label: 'Van' }
];

const frequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }
];

const styles = {
  root: {
    color: orange[600],
    '&$checked': {
      color: orange[500]
    }
  },
  checked: {}
};

const TravellingInformationFormComponent = props => {
  const {
    activity,
    dates,
    onInputChange,
    errors,
    mode,
    returnDates,
    stopOvers,
    onChangeInput,
    isEdit,
    dialogData,
    returnMode,
    originStation,
    destinationStation,
    originStationOptions,
    destinationStationOptions,
    handleOpenDialog,
    customRules,
    frequency
  } = props;
  console.log("This is the all information i recieve", props)
  const { classes } = props;

  return (
    <div className="plan-a-journey-dialog">
      <div style={{ padding: '0.5em', display: 'flex', alignItems: 'center' }}>
        <DialogTitle>Plan a journey</DialogTitle>
        <RadioGroup
          row
          aria-label="JourneyType"
          name="return"
          value={props.return}
          onChange={onChangeInput}
        >
          {returnOptions.map((option, i) => (
            <FormControlLabel
              key={i}
              value={option.value}
              control={
                <Radio
                  classes={{
                    root: classes.root,
                    checked: classes.checked
                  }}
                />
              }
              label={option.label}
            />
          ))}
        </RadioGroup>
      </div>
      <DialogContent>
        <div
          className="p-grid"
          style={{
            margin: 0,
            justifyContent: 'flex-start'
          }}
        >
          <div className="p-col-12 p-md-6 p-lg-4" style={{ padding: '0.75em' }}>
            <p className="heading">Origin</p>
            <div
              className={classNames([
                'pickup-dropoff-input-div',
                ['form-error', errors.origin]
              ])}
              onClick={() =>
                handleOpenDialog({
                  origin: props.origin,
                  heading: 'Select Origin',
                  name: 'origin'
                })
              }
            >
              <span
                style={{
                  color: props.origin.name
                    ? getPrimaryColors('primary')
                    : getPrimaryColors('font-color')
                }}
              >
                {props.origin.name || 'Origin Location'}
              </span>
            </div>
            {props.originDestinationMessage ? (
              <small>{props.originDestinationMessage}</small>
            ) : null}
          </div>
          <div className="p-col-12 p-md-6 p-lg-4" style={{ padding: '0.75em' }}>
            <p className="heading">Travelling Date</p>
            <FormMultipleDateInputField
              placeholder="Select Travelling Date"
              name="dates"
              value={dates}
              onChange={dates =>
                onChangeInput({
                  target: {
                    name: 'dates',
                    value: _.map(dates, (date, index) => {
                      return (
                        moment(date).format('MM-DD-YYYY')
                      )

                    })
                  }
                })
              }
              error={errors.dates}
            />
          </div>
          <div
            className="p-col-12 p-md-6 p-lg-4 paj-mode-select"
            style={{ padding: '0.75em' }}
          >
            <p className="heading">Travelling Mode</p>
            <FormNativeSelectInputField
              name="mode"
              type="react-select"
              style={{ padding: '0px 1em' }}
              error={errors.mode}
              value={mode}
              onChange={onChangeInput}
              options={modeOptions}
            />
          </div>

          <div
            className="p-col-12 p-md-6 p-lg-4 paj-mode-select"
            style={{ padding: '0.75em' }}
          >
            <p className="heading">Travelling Frequency</p>
            <FormNativeSelectInputField
              name="frequency"
              type="react-select"
              style={{ padding: '0px 1em' }}
              error={errors.frequency}
              value={frequency}
              onChange={onChangeInput}
              options={frequencyOptions}
            />
          </div>


          {stopOvers.length ? (
            <div className="p-col-12" style={{ padding: '0 0 0 5em' }}>
              <p
                className="heading"
                style={{ paddingLeft: '0.75em', paddingTop: '0.75em' }}
              >
                StopOvers
              </p>
              {stopOvers.map(stop => {
                return (
                  <div
                    className="p-grid"
                    key={`stopOver-${stop + 1}`}
                    style={{ margin: 0 }}
                  >
                    <div
                      className="p-col-12 p-md-6 p-lg-4"
                      style={{ padding: '0.75em' }}
                    >
                      <div
                        className={classNames([
                          'pickup-dropoff-input-div',
                          [
                            'form-error',
                            errors[`stopOver-${stop + 1}-location`]
                          ]
                        ])}
                        onClick={() =>
                          handleOpenDialog({
                            [`stopOver-${stop + 1}-location`]: props[
                              `stopOver-${stop + 1}-location`
                            ],
                            heading: 'Add StopOver',
                            name: `stopOver-${stop + 1}-location`
                          })
                        }
                      >
                        <span
                          style={{
                            color: props[`stopOver-${stop + 1}-location`].name
                              ? getPrimaryColors('primary')
                              : getPrimaryColors('font-color')
                          }}
                        >
                          {props[`stopOver-${stop + 1}-location`].name ||
                            'Stopover Location'}
                        </span>
                      </div>
                    </div>
                    <div
                      className="p-col-12 p-md-4 p-lg-4"
                      style={{ padding: '0.75em' }}
                    >
                      <FormDateInputField
                        placeholder="Select Stopover Date"
                        name={`stopOver-${stop + 1}-date`}
                        value={
                          props[`stopOver-${stop + 1}-date`]
                            ? new Date(props[`stopOver-${stop + 1}-date`])
                            : null
                        }
                        onChange={e =>
                          onChangeInput({
                            target: {
                              name: `stopOver-${stop + 1}-date`,
                              value: moment(e).toISOString()
                            }
                          })
                        }
                        error={errors[`stopOver-${stop + 1}-date`]}
                      />
                    </div>
                    <div
                      className="p-col-12 p-md-2 p-lg-4"
                      style={{ padding: '0.75em', display: 'flex' }}
                    >
                      <button
                        data-index={stop}
                        style={{
                          margin: 0,
                          padding: 0,
                          width: 'unset',
                          background: 'none',
                          border: 'none',
                          outline: 'none',
                          filter: 'none',
                          color: '#aaa'
                        }}
                        onClick={props.handleDeleteStopOver}
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
          <div className="p-col-12 p-md-6 p-lg-4" style={{ padding: '0.75em' }}>
            <p className="heading">Destination</p>
            <div
              className={classNames([
                'pickup-dropoff-input-div',
                ['form-error', errors.destination]
              ])}
              onClick={() =>
                handleOpenDialog({
                  destination: props.destination,
                  heading: 'Select Destination',
                  name: 'destination'
                })
              }
            >
              <span
                style={{
                  color: props.destination.name
                    ? getPrimaryColors('primary')
                    : getPrimaryColors('font-color')
                }}
              >
                {props.destination.name || 'Destination Location'}
              </span>
            </div>
            {props.originDestinationMessage ? (
              <small>{props.originDestinationMessage}</small>
            ) : null}
          </div>

          {mode.value === "air" || mode.value === "sea" || mode.value === "train" ? (
            <div className="p-col-8" style={{ display: "flex", padding: 0 }}>
              <div
                className="p-col-12 p-md-6 p-lg-6"
                style={{ padding: '0.75em' }}
              >
                <p className="heading">{(mode.value === "air") ? "Origin Airport" : (mode.value === "sea") ? "Origin Port" : "Origin Station"}</p>
                <FormNativeSelectInputField
                  name="originStation"
                  type="react-select"
                  style={{ padding: '0px 1em' }}
                  error={errors.originStation}
                  value={originStation}
                  onChange={onChangeInput}
                  options={originStationOptions}
                />
              </div>
              <div
                className="p-col-12 p-md-6 p-lg-6"
                style={{ padding: '0.75em' }}
              >
                <p className="heading">{(mode.value === "air") ? "Destination Airport" : (mode.value === "sea") ? "Destination Port" : "Destination Station"}</p>
                <FormNativeSelectInputField
                  name="destinationStation"
                  type="react-select"
                  style={{ padding: '0px 1em' }}
                  error={errors.destinationStation}
                  value={destinationStation}
                  onChange={onChangeInput}
                  options={destinationStationOptions}
                />
              </div>
            </div>
          ) : null}

          <div
            className="p-col-12 p-md-6 p-lg-4"
            style={{
              padding: '0.75em',
              opacity: props.return === 'true' ? 1 : 0.3
            }}
          >
            <p className="heading">Return Date</p>
            <FormMultipleDateInputField
              placeholder="Select Travelling Date"
              name="returnDates"
              value={returnDates}
              onChange={dates =>
                onChangeInput({
                  target: {
                    name: 'returnDates',
                    value: _.map(dates, (date, index) => {
                      return (
                        moment(date).format('MM-DD-YYYY')
                      )

                    })
                  }
                })
              }
              error={errors.returnDates}
            />
          </div>
          <div
            className="p-col-12 p-md-6 p-lg-4 paj-mode-select"
            style={{
              padding: '0.75em',
              opacity: props.return === 'true' ? 1 : 0.3
            }}
          >
            <p className="heading">Return Mode</p>
            <FormNativeSelectInputField
              name="returnMode"
              type="react-select"
              style={{ padding: '0px 1em' }}
              error={errors.returnMode}
              value={returnMode}
              onChange={onChangeInput}
              options={modeOptions}
            />
          </div>

          <React.Fragment>
            <div
              className={classNames([
                ['p-col-4 p-md-4 p-lg-4', !customRules],
                ['p-col-4 p-md-4 p-lg-4', customRules]
              ])}
              style={{ padding: '1rem' }}
            >
              <FormControlLabel
                className="form-checkbox-label-input"
                control={
                  <Checkbox
                    checked={customRules}
                    onChange={onInputChange}
                    value="customRules"
                    name="customRules"
                    color="default"
                  />
                }
                label="Do you know the custom rules of this country?"
              />
            </div>
          </React.Fragment>
          <div className="p-col-12" style={{ padding: '0.75em' }}>
            <button
              disabled={activity}
              style={{
                margin: 0,
                padding: 0,
                width: 'unset',
                background: 'none',
                border: 'none',
                outline: 'none',
                filter: 'none',
                fontSize: '1.2em',
                color: getPrimaryColors('primary')
              }}
              onClick={props.handleAddStopOver}
            >
              + Add a Stopover
            </button>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <div className="text-right">
          {isEdit && (
            <FormSubmitBtn
              disabled={activity}
              onSubmit={props.handleDeleteJourney}
              label="Delete"
              className="cancel-btn"
              style={{ width: 'unset', borderRadius: 4 }}
            />
          )}
          <FormSubmitBtn
            onSubmit={props.handleSubmit}
            disabled={activity}
            label={isEdit ? 'Update' : 'Add'}
            style={{ width: 'unset', borderRadius: 4 }}
          />
        </div>
      </DialogActions>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={props.isDialogVisible}
        className="full-height-dialog"
        onClose={props.handleCloseDialog}
      >
        <SelectLocationReusableComponent
          showRadius
          editable={true}
          addressKey="name"
          heading={dialogData.heading}
          location={
            props.isDialogVisible ? props[dialogData.name].location : []
          }
          handleMapClick={props.handleSelectPlace}
          handleSelectPlace={props.handleSelectPlace}
          actions={
            <div>
              <FormSubmitBtn
                label="Done"
                disabled={activity}
                style={{ borderRadius: 4, width: 'unset' }}
                onSubmit={props.handleCloseDialog}
              />
            </div>
          }
        />
      </Dialog>
    </div>
  );
};

TravellingInformationFormComponent.propTypes = {
  date: PropTypes.string,
  isEdit: PropTypes.bool,
  mode: PropTypes.shape(),
  return: PropTypes.string,
  activity: PropTypes.bool,
  origin: PropTypes.shape(),
  errors: PropTypes.shape(),
  returnDate: PropTypes.string,
  handleSubmit: PropTypes.func,
  dialogData: PropTypes.shape(),
  returnMode: PropTypes.shape(),
  onChangeInput: PropTypes.func,
  destination: PropTypes.shape(),
  isDialogVisible: PropTypes.bool,
  handleOpenDialog: PropTypes.func,
  handleSelectPlace: PropTypes.func,
  handleAddStopOver: PropTypes.func,
  handleCloseDialog: PropTypes.func,
  handleDeleteJourney: PropTypes.func,
  classes: PropTypes.object.isRequired,
  handleDeleteStopOver: PropTypes.func,
  stopOvers: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape()),
    PropTypes.arrayOf(PropTypes.number)
  ]),
  originDestinationMessage: PropTypes.string
};
export default withStyles(styles)(TravellingInformationFormComponent);
