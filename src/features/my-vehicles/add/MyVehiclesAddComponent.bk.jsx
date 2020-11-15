import React from 'react';
import PropTypes from 'prop-types';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import Page from '../../../components/layout/Page';
import FileUpload from '../../../components/form/FileUpload';
import FormNativeSelectInput from '../../../components/form/FormNativeSelectInput';
import FormInput from '../../../components/form/FormInput';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';

const MyVehiclesAddComponent = props => {
  const { activity, handleChange, errors, documents, fieldsType } = props;

  const ipadWidth = useMediaQuery('(max-width:768px)');

  function disableElement() {
    let style;
    if (props.fieldsType !== 'make') {
      style = { pointerEvents: 'none', opacity: 0.4 };
      return style;
    }
    return;
  }

  return (
    <Page activity={activity} className="m-v-add-page">
      <div className="page-title multiple-items">
        <span style={ipadWidth ? { width: '100%', paddingBottom: 10 } : {}}>
          Add Vehicles
        </span>
      </div>

      <div className="p-grid">
        <div className="p-col-10 p-sm-10 p-md-10 p-lg-10">
          <FormNativeSelectInput
            left={
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBRjg0RDcwQkZCQjhFOTExOUJDOUYyQjlFMDIwNkFEOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCNjU3Njc1N0NFRjkxMUU5OTBEODhDRDFFNTU3REM5OCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCNjU3Njc1NkNFRjkxMUU5OTBEODhDRDFFNTU3REM5OCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY5REZEMzcyRTZDRUU5MTE5NDQxOEZCNzIwNTFCMkNFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFGODRENzBCRkJCOEU5MTE5QkM5RjJCOUUwMjA2QUQ4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+i5kH+wAAAdpJREFUeNq01U9IlEEcxvF1CwQlISkRxEIDoZUoFb2olyhDEA95KEjMmyF0kOgigp70oKsVJEWUKAWBfygVAlMPkkKE1KE/eNqyQyYkKHVIzfU78GwMLzvrvqADH2b25X2fnXfe+b1vSjQaDRxESzHBWaFb3uO1uIIKpCEqH/ECz7DmCl39HA4c9hw7iTDqHNeclybcxitXuB2cj3EU6vcPTGIeWwihGsU6ZxgNGEsUnIp+K3QIHYh4zu/SbDuRjgdYwidvcFD9ZVzS+Cka44Sa9ge9uIkdHEereVau4Hr1P9GmB5WoPdKymVaDU67gEvWv8S3JHTWoPgNnXcGH1L/1sVUj1p0VuIJja3TER3DQum7bFfxbfbmP4DJr/N4VPKP+AiqTCDXVeEPjZVVk3OABFYHZz/dxIkGo2fvdOKc1fogVV/Ab3NP4DGb1rsi0zjUFUaqKa9axTSzsVdLtyMY17cvn+IIP2NCWKtJdBayKfaJJvHMFm6q6jkW0IBenxVt9Zg//UjHlYRRX7dl7327/0IcRVOEicrSWJnAO09bs1tGjSbzU3U7FC46173gsiVpYkzHvj2NaPnPXE8F9+Fjc0dKZPziqNXfO2G+7i7/aAF//f5oOou0KMACM5WkkiAsS2AAAAABJRU5ErkJggg=="
                alt=""
              />
            }
            name="mode"
            value={props.mode}
            onChange={handleChange}
            error={errors.mode}
            addStyle={{
              border: '1px solid #718ffc',
              borderRadius: 4,
              maxWidth: '100%',
              padding: '8px 5px'
            }}
            addSelectStyle={{
              fontSize: '1.5em',
              color: '#afc0ff'
            }}
            options={[
              { label: 'Modes', value: '' },
              { label: 'Bike', value: 'bike' },
              { label: 'Car', value: 'car' },
              { label: 'Van', value: 'van' },
              { label: 'Truck', value: 'truck' },
              { label: 'Bus', value: 'bus' },
              { label: 'Train', value: 'train' },
              { label: 'Air', value: 'air' },
              { label: 'Sea', value: 'sea' }
            ]}
          />
        </div>

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
          <img src={require('../../../static/icons/icon-on.png')} alt="" />
          {/* <img src={require('../../../static/icons/icon-off.png')} alt="" /> */}
        </div>

        {fieldsType === 'make' && (
          <React.Fragment>
            <div className="p-col-12 p-sm-6">
              <FormInput
                label="Make"
                name="make"
                value={props.make}
                onChange={handleChange}
                placeholder="Make"
                error={errors.make}
              />
            </div>
            <div className="p-col-12 p-sm-6">
              <FormInput
                label="Model"
                name="model"
                value={props.model}
                onChange={handleChange}
                placeholder="Model"
                error={errors.model}
              />
            </div>
            <div className="p-col-12 p-sm-6">
              <FormInput
                label="Vehicle Colour"
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
              <FormInput
                label="Number Plate"
                name="numberPlate"
                value={props.numberPlate}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="Number plate"
                error={errors.numberPlate}
              />
            </div>
          </React.Fragment>
        )}

        {fieldsType === 'flightNumber' && (
          <React.Fragment>
            <div className="p-col-12 p-sm-6">
              <FormInput
                label="Flight Number"
                name="flightNumber"
                value={props.flightNumber}
                onChange={handleChange}
                placeholder="Flight Number"
                error={errors.flightNumber}
              />
            </div>
            <div className="p-col-12 p-sm-6">
              <FormInput
                label="Airline"
                name="airline"
                value={props.airline}
                onChange={handleChange}
                placeholder="Airline"
                error={errors.airline}
              />
            </div>
            {/* For better spacing hidden element */}
            {[1, 2].map(item => (
              <div
                key={item}
                className="p-col-12 p-sm-6"
                style={{ opacity: 0 }}
              >
                <p>Display None</p>
              </div>
            ))}
          </React.Fragment>
        )}

        {fieldsType === 'information' && (
          <React.Fragment>
            <div className="p-col-12">
              <FormInput
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

        <div
          className="p-col-12"
          style={{ fontWeight: 'bold', color: '#2c2d5b' }}
        >
          Weight and Dimensions you can carry
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInput
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
          <FormInput
            label="Width"
            name="width"
            value={props.width}
            onChange={handleChange}
            placeholder="Width"
            required="required"
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInput
            label="Height"
            name="height"
            value={props.height}
            onChange={handleChange}
            placeholder="Height"
            required="required"
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInput
            label="Weight"
            name="weight"
            value={props.weight}
            onChange={handleChange}
            placeholder="Weight"
            required="required"
          />
        </div>

        <div className="p-col-12" style={disableElement()}>
          <div
            className="p-col-12"
            style={{ fontWeight: 'bold', color: '#2c2d5b', fontSize: '18px' }}
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
                      multiple
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
                      multiple
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
                      multiple
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
                      multiple
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
                      multiple
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
                Plate Number
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

              {/* <div className="p-col-12">
                <div className="documents">
                  {props.numberPlatePicture.length
                    ? props.numberPlatePicture.map((item, index) => (
                        <div key={`number-plate-picture-${index + 1}`}>
                          <img
                            alt={`number-plate-picture-${index + 1}`}
                            src={item}
                          />
                          <i
                            className="fas fa-times"
                            onClick={() =>
                              props.removeDocument(index, 'numberPlatePicture')
                            }
                          />
                        </div>
                      ))
                    : null}
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="p-col-12 text-right">
          <FormSubmitBtn
            disabled={activity}
            onSubmit={props.handleSubmit}
            addStyle={{ padding: '0.3rem 0.7rem', borderRadius: 4 }}
          />
        </div>
      </div>

      {/* <div className="p-grid">
        <div className="p-col-12">
          <Typography variant="h5">Add Vehicle</Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel
            risus enim.
          </Typography>
        </div>
        <div className="p-col-12 p-sm-12 p-lg-4">
          <FormControl variant="outlined" fullWidth error={errors.mode}>
            <RootRef rootRef={props.modeLabelRef}>
              <InputLabel htmlFor="vehicle-mode">
                Transportation Mode
              </InputLabel>
            </RootRef>
            <Select
              name="mode"
              value={props.mode}
              onChange={handleChange}
              input={
                <OutlinedInput
                  labelWidth={
                    props.modeLabelRef.current
                      ? props.modeLabelRef.current.offsetWidth
                      : 50
                  }
                  name="mode"
                  id="vehicle-mode"
                />
              }
            >
              <MenuItem value="bike">Bike</MenuItem>
              <MenuItem value="car">Car</MenuItem>
              <MenuItem value="van">Van</MenuItem>
              <MenuItem value="truck">Truck</MenuItem>
              <MenuItem value="bus">Bus</MenuItem>
              <MenuItem value="train">Train</MenuItem>
              <MenuItem value="air">Air</MenuItem>
              <MenuItem value="sea">Sea</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="p-col-12 p-lg-8" style={{ padding: 0 }}>
          <div className="p-grid" style={{ margin: 0 }}>
            {fieldsType === 'flightNumber' && (
              <React.Fragment>
                <div className="p-col-12 p-sm-6">
                  <TextField
                    label="Flight Number"
                    name="flightNumber"
                    value={props.flightNumber}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    placeholder="Flight Number"
                    error={errors.flightNumber}
                  />
                </div>
                <div className="p-col-12 p-sm-6">
                  <TextField
                    label="Airline"
                    name="airline"
                    value={props.airline}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    placeholder="Airline"
                    error={errors.airline}
                  />
                </div>
              </React.Fragment>
            )}
            {fieldsType === 'information' && (
              <div className="p-col-12">
                <TextField
                  label="Information (Name or Number)"
                  name="information"
                  value={props.information}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Information"
                  error={errors.information}
                />
              </div>
            )}
            {fieldsType === 'make' && (
              <React.Fragment>
                <div className="p-col-12 p-sm-6">
                  <TextField
                    label="Make"
                    name="make"
                    value={props.make}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    placeholder="make"
                    error={errors.make}
                  />
                </div>
                <div className="p-col-12 p-sm-6">
                  <TextField
                    label="Model"
                    name="model"
                    value={props.model}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    placeholder="model"
                    error={errors.model}
                  />
                </div>
                <div className="p-col-12 p-sm-6">
                  <TextField
                    label="Color"
                    name="color"
                    value={props.color}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    placeholder="color"
                    error={errors.color}
                  />
                </div>
                <div className="p-col-12 p-sm-6">
                  <TextField
                    label="Number Plate"
                    name="numberPlate"
                    value={props.numberPlate}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    placeholder="number plate"
                    error={errors.numberPlate}
                  />
                </div>
              </React.Fragment>
            )}
            <div className="p-col-12" style={{ fontWeight: 'bold' }}>
              Weight and Dimensions you can carry
            </div>
            <div className="p-col-12 p-sm-6">
              <TextField
                label="Length"
                name="length"
                value={props.length}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="length"
              />
            </div>
            <div className="p-col-12 p-sm-6">
              <TextField
                label="Width"
                name="width"
                value={props.width}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="width"
              />
            </div>
            <div className="p-col-12 p-sm-6">
              <TextField
                label="Height"
                name="height"
                value={props.height}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="height"
              />
            </div>
            <div className="p-col-12 p-sm-6">
              <TextField
                label="Weight"
                name="weight"
                value={props.weight}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="weight"
              />
            </div>
            {props.fieldsType === 'make' ? (
              <div className="p-col-12">
                <div className="p-grid">
                  <div className="p-col-12" style={{ fontWeight: 'bold' }}>
                    Registration Book
                  </div>
                  <div className="p-col-12">
                    <FileUpload
                      multiple
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
                  </div>
                  <div className="p-col-12">
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
                  </div>
                  <div className="p-col-12" style={{ fontWeight: 'bold' }}>
                    Vehicle Images
                  </div>
                  <div className="p-col-12">
                    <FileUpload
                      multiple
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
                  </div>
                  <div className="p-col-12">
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
                  </div>
                  <div className="p-col-12" style={{ fontWeight: 'bold' }}>
                    Plate Number
                  </div>
                  <div className="p-col-12">
                    <FileUpload
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
                  </div>
                  <div className="p-col-12">
                    <div className="documents">
                      {props.numberPlatePicture.length
                        ? props.numberPlatePicture.map((item, index) => (
                            <div key={`number-plate-picture-${index + 1}`}>
                              <img
                                alt={`number-plate-picture-${index + 1}`}
                                src={item}
                              />
                              <i
                                className="fas fa-times"
                                onClick={() =>
                                  props.removeDocument(
                                    index,
                                    'numberPlatePicture'
                                  )
                                }
                              />
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="p-col-12 text-right">
              <Button
                color="primary"
                disabled={activity}
                onClick={props.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div> */}
    </Page>
  );
};

MyVehiclesAddComponent.defaultProps = {};

MyVehiclesAddComponent.propTypes = {
  mode: PropTypes.string,
  make: PropTypes.string,
  model: PropTypes.string,
  color: PropTypes.string,
  activity: PropTypes.bool,
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
  documents: PropTypes.arrayOf(PropTypes.string),
  vehiclePictures: PropTypes.arrayOf(PropTypes.string),
  numberPlatePicture: PropTypes.arrayOf(PropTypes.string),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  length: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default MyVehiclesAddComponent;
