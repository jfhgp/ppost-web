import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { classNames } from '../../utils/functions';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import _ from "lodash";
import Page from '../../components/layout/Page';
import FormInput from '../../components/form/FormInputS';
import FileUpload from '../../components/form/FileUpload';
import FormSubmitBtn from '../../components/form/FormSubmitBtn';
import AssignToDriverComponent from './components/AssignToDriverComponent';
import FormNativeSelectInputField from '../../components/form/FormNativeSelectInputField';

const VehiclesFormComponent = props => {
  const {
    activity,
    handleChange,
    errors,
    documents,
    fieldsType,
    onInputChange,
    carrySuitcase,
    carryBox,
    mode,
    config
  } = props;
  console.log("This is all props i received here", props)
  const ipadWidth = useMediaQuery('(max-width:768px)');

  function disableElement() {
    let style;
    if (fieldsType !== 'make') {
      style = { pointerEvents: 'none', opacity: 0.4 };
      return style;
    }
    return;
  }

  function GetModesClassNames() {
    let className = '';
    if (props.isEdit) {
      return (className += 'p-col-10 p-sm-10 p-md-10 p-lg-10');
    }
    return (className += 'p-col-12 p-sm-12 p-md-12 p-lg-12');
  }

  return (
    <Page activity={activity} className="m-v-add-page">
      <div className="page-title multiple-items">
        <span style={ipadWidth ? { width: '100%', paddingBottom: 10 } : {}}>
          {props.heading}
        </span>
      </div>

      <div className="p-grid">
        <div className={GetModesClassNames()}>
          <div
            className="p-col-12"
            style={{ fontWeight: 'bold', color: '#2c2d5b' }}
          >
            Mode
          </div>
          <FormNativeSelectInputField
            name="mode"
            type="react-select"
            options={[
              { label: 'Bike', value: 'bike' },
              { label: 'Car', value: 'car' },
              { label: 'Van', value: 'van' },
              { label: 'Truck', value: 'truck' },
              { label: 'Bus', value: 'bus' },
              { label: 'Train', value: 'train' },
              { label: 'Air', value: 'air' },
              { label: 'Sea', value: 'sea' }
            ]}
            value={props.mode}
            onChange={handleChange}
            error={errors.mode}
            left={
              <img src={require('../../static/icons/modes-icon.png')} alt="" />
            }
          />
        </div>
        {props.isEdit ? (
          <div
            className="p-col-2"
            style={
              ipadWidth
                ? {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  flexDirection: 'column'
                }
                : {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly'
                }
            }
          >
            <h4 style={{ color: 'darkblue', margin: 0 }}>Active</h4>

            <button
              disabled={activity}
              onClick={props.handleToggleChange}
              style={{
                width: 'unset',
                filter: 'none',
                background: 'none',
                border: 'none',
                outline: 'none',
                fontSize: 'unset'
              }}
            >
              {props.active ? (
                <img src={require('../../static/icons/icon-on.png')} alt="" />
              ) : (
                  <img src={require('../../static/icons/icon-off.png')} alt="" />
                )}
            </button>
          </div>
        ) : null}

        {fieldsType === 'make' && (
          <React.Fragment>
            {mode.value === 'car' ? (
              <React.Fragment>
                <div className="p-col-12 p-sm-6">
                  <div
                    className="p-col-12"
                    style={{ fontWeight: 'bold', color: '#2c2d5b' }}
                  >
                    Make
              </div>
                  <FormNativeSelectInputField
                    name="make"
                    type="react-select"
                    options={props.makeOptions}
                    value={props.make}
                    onChange={handleChange}
                    error={errors.make}
                    left={
                      <img
                        src={require('../../static/icons/car-make-icon.png')}
                        alt=""
                      />
                    }
                  />
                </div>
                <div className="p-col-12 p-sm-6">
                  <div
                    className="p-col-12"
                    style={{ fontWeight: 'bold', color: '#2c2d5b' }}
                  >
                    Model
              </div>
                  <FormNativeSelectInputField
                    name="model"
                    type="react-select"
                    options={_.map(props.modelOptions, (item, index) => {
                      return (
                        {
                          ...item,
                          index: index,
                          label: item.model,
                          value: item.model,
                        }
                      )

                    })}
                    value={props.model}
                    onChange={handleChange}
                    error={errors.model}
                    left={
                      <img
                        src={require('../../static/icons/car-model-icon.png')}
                        alt=""
                      />
                    }
                  />
                </div>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  <div className="p-col-12 p-sm-6">
                    <div
                      className="p-col-12"
                      style={{ fontWeight: 'bold', color: '#2c2d5b' }}
                    >
                      Make
              </div>
                    <FormInput
                      left={
                        <img
                          src={require('../../static/icons/car-make-icon.png')}
                          alt=""
                        />
                      }
                      label="Make"
                      name="make"
                      value={props.make}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      placeholder="Make"
                      error={errors.make}
                    />
                  </div>
                  <div className="p-col-12 p-sm-6">
                    <div
                      className="p-col-12"
                      style={{ fontWeight: 'bold', color: '#2c2d5b' }}
                    >
                      Model
              </div>
                    <FormInput
                      left={
                        <img
                          src={require('../../static/icons/car-model-icon.png')}
                          alt=""
                        />
                      }
                      label="Model"
                      name="model"
                      value={props.model}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      placeholder="Model"
                      error={errors.model}
                    />
                  </div>
                </React.Fragment>
              )}

            <div className="p-col-12 p-sm-6">
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Vehicle Colour
              </div>
              <FormInput
                left={
                  <img
                    src={require('../../static/icons/car-color-icon.png')}
                    alt=""
                  />
                }
                label="Color"
                name="color"
                value={props.color}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="Color"
                error={errors.color}
              />
            </div>
            <div className="p-col-12 p-sm-6">
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Vehicle Number
              </div>
              <FormInput
                left={
                  <img
                    src={require('../../static/icons/car-numberplate-icon.png')}
                    alt=""
                  />
                }
                label="Number Plate"
                name="numberPlate"
                value={props.numberPlate}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="Number Plate"
                error={errors.numberPlate}
              />
            </div>
            {/* {mode.value === 'car' && (
              <div className="p-col-12 p-sm-6">
                <div
                  className="p-col-12"
                  style={{ fontWeight: 'bold', color: '#2c2d5b' }}
                >
                  Body Type
                </div>
                <FormNativeSelectInputField
                  name="bodyType"
                  type="react-select"
                  options={[
                    { label: 'Sedan', value: 'sedan' },
                    { label: 'Saloon', value: 'saloon' },
                    { label: 'Suv', value: 'suv' },
                    { label: 'Other', value: 'other' }
                  ]}
                  value={props.bodyType}
                  onChange={handleChange}
                  error={errors.bodyType}
                  left={
                    <img
                      src={require('../../static/icons/modes-icon.png')}
                      alt=""
                    />
                  }
                />
              </div>
            )} */}
          </React.Fragment>
        )}

        {fieldsType === 'flightNumber' && (
          <React.Fragment>
            <div className="p-col-12 p-sm-6">
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Flight Number
              </div>
              <FormInput
                left={
                  <img
                    src={require('../../static/icons/air-flightnumber-icon.png')}
                    alt=""
                  />
                }
                label="Flight Number"
                name="flightNumber"
                value={props.flightNumber}
                onChange={handleChange}
                placeholder="Flight Number"
                error={errors.flightNumber}
              />
            </div>
            <div className="p-col-12 p-sm-6">
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Airline
              </div>
              <FormInput
                left={
                  <img
                    src={require('../../static/icons/air-ticket-number-icon.png')}
                    alt=""
                  />
                }
                label="Airline"
                name="airline"
                value={props.airline}
                onChange={handleChange}
                placeholder="Airline"
                error={errors.airline}
              />
            </div>
            <div className="p-col-12 p-sm-6">
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Origin Airport
              </div>
              <FormInput
                left={
                  <img
                    src={require('../../static/icons/air-ticket-number-icon.png')}
                    alt=""
                  />
                }
                label="Origin Airport"
                name="originAirport"
                value={props.originAirport}
                onChange={handleChange}
                placeholder="Origin Airport"
                error={errors.originAirport}
              />
            </div>
            <div className="p-col-12 p-sm-6">
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Destination Airport
              </div>
              <FormInput
                left={
                  <img
                    src={require('../../static/icons/air-ticket-number-icon.png')}
                    alt=""
                  />
                }
                label="Destination Airport"
                name="destinationAirport"
                value={props.destinationAirport}
                onChange={handleChange}
                placeholder="Destination Airport"
                error={errors.destinationAirport}
              />
            </div>
            {/* For better spacing hidden element */}
            {/* {[1, 2].map(item => (
              <div
                key={item}
                className="p-col-12 p-sm-6"
                style={{ opacity: 0 }}
              >
                <p>Display None</p>
              </div>
            ))} */}
          </React.Fragment>
        )}

        {fieldsType === 'information' && (
          <React.Fragment>
            <div className="p-col-12">
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Information
              </div>
              <FormInput
                left={
                  <img
                    src={require('../../static/icons/bus-info-icon.png')}
                    alt=""
                  />
                }
                label="Information (Name or Number)"
                name="information"
                value={props.information}
                onChange={handleChange}
                placeholder="Information"
                error={errors.information}
              />
            </div>

            {/* {[1, 2].map(item => (
              <div
                key={item}
                className="p-col-12 p-sm-6"
                style={{ opacity: 0 }}
              >
                <p>Display None</p>
              </div>
            ))} */}
          </React.Fragment>
        )}
        {fieldsType === 'flightNumber' || fieldsType === 'information' && (
          <React.Fragment>
            <div
              className={classNames([
                ['p-col-4 p-md-4 p-lg-4', !carrySuitcase],
                ['p-col-4 p-md-4 p-lg-4', carrySuitcase]
              ])}
              style={{ padding: '1rem' }}
            >
              <FormControlLabel
                className="form-checkbox-label-input"
                control={
                  <Checkbox
                    checked={carrySuitcase}
                    onChange={onInputChange}
                    value="carrySuitcase"
                    name="carrySuitcase"
                    color="default"
                  />
                }
                label="I can carry suitcase"
              />
            </div>

            <div
              className={classNames([
                ['p-col-4 p-md-4 p-lg-4', !carryBox],
                ['p-col-4 p-md-4 p-lg-4', carryBox]
              ])}
              style={{ padding: '1rem' }}
            >
              <FormControlLabel
                className="form-checkbox-label-input"
                control={
                  <Checkbox
                    checked={carryBox}
                    onChange={onInputChange}
                    value="carryBox"
                    name="carryBox"
                    color="default"
                  />
                }
                label="I can carry box"
              />
            </div>
          </React.Fragment>
        )}
        <div
          className="p-col-12"
          style={{
            fontWeight: 'bold',
            color: '#2c2d5b',
            padding: '2em 0.5em 1.5em 0.5em'
          }}
        >
          Weight and Dimensions, your vehicle can carry
        </div>
        <div className="p-col-12 p-sm-6">
          <div
            className="p-col-12"
            style={{ fontWeight: 'bold', color: '#2c2d5b' }}
          >
            Max. Carrying Length ({config.measurementUnit})
          </div>
          <FormInput
            inputType="float"
            left={
              <img src={require('../../static/icons/length-icon.png')} alt="" />
            }
            label="Length"
            name="length"
            value={props.length}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="Length"
            required="required"
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <div
            className="p-col-12"
            style={{ fontWeight: 'bold', color: '#2c2d5b' }}
          >
            Max. Carrying Width ({config.measurementUnit})
          </div>
          <FormInput
            inputType="float"
            left={
              <img src={require('../../static/icons/width-icon.png')} alt="" />
            }
            label="Width"
            name="width"
            value={props.width}
            onChange={handleChange}
            placeholder="Width"
            required="required"
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <div
            className="p-col-12"
            style={{ fontWeight: 'bold', color: '#2c2d5b' }}
          >
            Max. Carrying Height ({config.measurementUnit})
          </div>
          <FormInput
            inputType="float"
            left={
              <img src={require('../../static/icons/height-icon.png')} alt="" />
            }
            label="Height"
            name="height"
            value={props.height}
            onChange={handleChange}
            placeholder="Height"
            required="required"
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <div
            className="p-col-12"
            style={{ fontWeight: 'bold', color: '#2c2d5b' }}
          >
            Max. Carrying Weight ({config.weightUnit})
          </div>
          <FormInput
            inputType="float"
            left={
              <img src={require('../../static/icons/weight-icon.png')} alt="" />
            }
            label="Weight"
            name="weight"
            value={props.weight}
            onChange={handleChange}
            placeholder="Weight"
            required="required"
          />
        </div>

        <div
          className="p-col-12"
          style={{ ...disableElement(), padding: '1em 0.5em 0 0.5em' }}
        >
          <div
            className="p-col-12"
            style={{
              fontWeight: 'bold',
              color: '#2c2d5b',
              fontSize: '18px',
              paddingLeft: 0
            }}
          >
            Documents
          </div>
          <div className="p-grid">
            <div className="p-col-12 p-lg-4">
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Registration Book
              </div>
              <div className="p-grid">
                <div className="p-col-4 p-sm-4 p-lg-6">
                  {documents.length && documents[0] !== undefined ? (
                    <div className="documents">
                      <div>
                        <img src={documents[0]} alt="" />
                        <i
                          className="fas fa-times"
                          onClick={() => props.removeDocument(0, 'documents')}
                        />
                      </div>
                    </div>
                  ) : (
                      <FileUpload
                        multiple={false}
                        message="+"
                        activity={activity}
                        className="drop-zone-div"
                        onDrop={acceptedFiles =>
                          handleChange({
                            target: {
                              name: 'files',
                              key: 'documents',
                              value: acceptedFiles
                            }
                          })
                        }
                      />
                    )}
                </div>
                <div className="p-col-4 p-sm-4 p-lg-6">
                  {props.documents.length &&
                    props.documents[1] !== undefined ? (
                      <div className="documents">
                        <div>
                          <img src={props.documents[1]} alt="" />
                          <i
                            className="fas fa-times"
                            onClick={() => props.removeDocument(1, 'documents')}
                          />
                        </div>
                      </div>
                    ) : (
                      <FileUpload
                        multiple={false}
                        message="+"
                        activity={activity}
                        className="drop-zone-div"
                        onDrop={acceptedFiles =>
                          handleChange({
                            target: {
                              name: 'files',
                              key: 'documents',
                              value: acceptedFiles
                            }
                          })
                        }
                      />
                    )}
                </div>
              </div>

              {/* <div className="p-col-12">
                <div className="documents">
                  {documents.length
                    ? documents.map((item, index) => (
                        <div key={`document-${index + 1}`}>
                          <img alt={`document-${index + 1}`} src={item} />
                          <i
                            className="fas fa-times"
                            onClick={() =>
                              props.removeDocument(index, 'documents')
                            }
                          />
                        </div>
                      ))
                    : null}
                </div>
              </div> */}
            </div>

            <div className="p-col-12 p-lg-6">
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Vehicle Images
              </div>

              <div className="p-grid">
                <div className="p-col-4 p-sm-4 p-lg-4">
                  {props.vehiclePictures.length &&
                    props.vehiclePictures[0] !== undefined ? (
                      <div className="documents">
                        <div>
                          <img src={props.vehiclePictures[0]} alt="" />
                          <i
                            className="fas fa-times"
                            onClick={() =>
                              props.removeDocument(0, 'vehiclePictures')
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <FileUpload
                        multiple={false}
                        message="+"
                        activity={activity}
                        className="drop-zone-div"
                        onDrop={acceptedFiles =>
                          handleChange({
                            target: {
                              name: 'files',
                              key: 'vehiclePictures',
                              value: acceptedFiles
                            }
                          })
                        }
                      />
                    )}
                </div>
                <div className="p-col-4 p-sm-4 p-lg-4">
                  {props.vehiclePictures.length &&
                    props.vehiclePictures[1] !== undefined ? (
                      <div className="documents">
                        <div>
                          <img src={props.vehiclePictures[1]} alt="" />
                          <i
                            className="fas fa-times"
                            onClick={() =>
                              props.removeDocument(1, 'vehiclePictures')
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <FileUpload
                        multiple={false}
                        message="+"
                        activity={activity}
                        className="drop-zone-div"
                        onDrop={acceptedFiles =>
                          handleChange({
                            target: {
                              name: 'files',
                              key: 'vehiclePictures',
                              value: acceptedFiles
                            }
                          })
                        }
                      />
                    )}
                </div>
                <div className="p-col-4 p-sm-4 p-lg-4">
                  {props.vehiclePictures.length &&
                    props.vehiclePictures[2] !== undefined ? (
                      <div className="documents">
                        <div>
                          <img src={props.vehiclePictures[2]} alt="" />
                          <i
                            className="fas fa-times"
                            onClick={() =>
                              props.removeDocument(2, 'vehiclePictures')
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <FileUpload
                        multiple={false}
                        message="+"
                        activity={activity}
                        className="drop-zone-div"
                        onDrop={acceptedFiles =>
                          handleChange({
                            target: {
                              name: 'files',
                              key: 'vehiclePictures',
                              value: acceptedFiles
                            }
                          })
                        }
                      />
                    )}
                </div>
              </div>

              {/* <div className="p-col-12">
                <div className="documents">
                  {props.vehiclePictures.length
                    ? props.vehiclePictures.map((item, index) => (
                        <div key={`vehicle-picture-${index + 1}`}>
                          <img
                            alt={`vehicle-picture-${index + 1}`}
                            src={item}
                          />
                          <i
                            className="fas fa-times"
                            onClick={() =>
                              props.removeDocument(index, 'vehiclePictures')
                            }
                          />
                        </div>
                      ))
                    : null}
                </div>
              </div> */}
            </div>

            <div className="p-col-12 p-lg-2">
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Number Plate
              </div>
              <div className="p-grid">
                <div className="p-col-4 p-sm-4 p-lg-12">
                  {props.numberPlatePicture.length &&
                    props.numberPlatePicture[0] !== undefined ? (
                      <div className="documents">
                        <div>
                          <img src={props.numberPlatePicture[0]} alt="" />
                          <i
                            className="fas fa-times"
                            onClick={() =>
                              props.removeDocument(0, 'numberPlatePicture')
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <FileUpload
                        message="+"
                        multiple={false}
                        activity={activity}
                        className="drop-zone-div"
                        onDrop={acceptedFiles =>
                          handleChange({
                            target: {
                              name: 'files',
                              key: 'numberPlatePicture',
                              value: acceptedFiles
                            }
                          })
                        }
                      />
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-col-12 text-right">
          <FormSubmitBtn
            label={props.isEdit ? 'Update' : 'Submit'}
            disabled={activity}
            onSubmit={
              props.isEdit ? props.onUpdateVehicleData : props.handleSubmit
            }
            addStyle={{ width: 'unset', borderRadius: 4 }}
          />
        </div>
        {props.isEdit && props._id && fieldsType === 'make' ? (
          <div className="p-col-12">
            <AssignToDriverComponent
              _id={props._id}
              drivers={props.drivers}
              handleDriversAfterAction={props.handleDriversAfterAction}
            />
          </div>
        ) : null}
      </div>
    </Page>
  );
};

VehiclesFormComponent.defaultProps = {};

VehiclesFormComponent.propTypes = {
  _id: PropTypes.string,
  isEdit: PropTypes.bool,
  active: PropTypes.bool,
  make: PropTypes.string,
  model: PropTypes.string,
  bodyType: PropTypes.object,
  color: PropTypes.string,
  mode: PropTypes.shape(),
  activity: PropTypes.bool,
  heading: PropTypes.string,
  config: PropTypes.object,
  errors: PropTypes.shape(),
  airline: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  fieldsType: PropTypes.string,
  information: PropTypes.string,
  numberPlate: PropTypes.string,
  removeDocument: PropTypes.func,
  flightNumber: PropTypes.string,
  modeLabelRef: PropTypes.shape(),
  handleToggleChange: PropTypes.func,
  onUpdateVehicleData: PropTypes.func,
  handleDriversAfterAction: PropTypes.func,
  drivers: PropTypes.arrayOf(PropTypes.string),
  documents: PropTypes.arrayOf(PropTypes.string),
  vehiclePictures: PropTypes.arrayOf(PropTypes.string),
  numberPlatePicture: PropTypes.arrayOf(PropTypes.string),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  length: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default VehiclesFormComponent;
