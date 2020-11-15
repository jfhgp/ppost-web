import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, Dialog } from '@material-ui/core';
import SelectInput from '../../components/form/SelectInput';
import FileUploadS from '../../components/form/FileUploadS';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { getPrimaryColors, classNames } from '../../utils/functions';
import Page from '../../components/layout/Page';
import FormInput from '../../components/form/FormInputS';
// import FileUpload from '../../components/form/FileUpload';
import FormSubmitBtn from '../../components/form/FormSubmitBtn';
import FormNativeSelectInputField from '../../components/form/FormNativeSelectInputField';
import FormTimeInputField from '../../components/form/FormTimeInputField';
import SelectLocationReusableComponent from '../../components/map/SelectLocationReusableComponent';
import AddScheduleModal from './add/AddScheduleModal';

const SpacesFormComponent = props => {
  const {
    activity,
    onInputChange,
    errors,
    fieldsType,
    selectedDays,
    itemImages,
    from,
    days,
    to,
    mapComponentRef,
    isDialogOpen,
    handleSelectChange,
    onFileDrop,
    dialogData,
    handleImageClick,
    handleDialogVisibility,
    handleChangeMultiple,
    mode,
    config,
    canStoreFrozenItems,
    hasShelves,
    canStoreHeavyItems,
    canStoreFlammableItems,
    handleDialogCallback
  } = props;

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
    <Page activity={activity} className="orders-add-container">
      <div className="page-title multiple-items">
        <span style={ipadWidth ? { width: '100%', paddingBottom: 10 } : {}}>
          {props.heading}
        </span>
      </div>

      <div className="p-grid">
        <React.Fragment>
          <div className="p-col-12 p-md-6 p-lg-12">
            <div
              className="p-col-12"
              style={{ fontWeight: 'bold', color: '#2c2d5b' }}
            >
              Location
            </div>
            <div
              className={classNames([
                'pickup-dropoff-input-div',
                ['form-error', errors.pickup]
              ])}
              onClick={() =>
                handleDialogVisibility(true, {
                  location: props.location,
                  heading: 'Select Location',
                  name: 'location'
                })
              }
            >
              <img
                style={{ width: '1rem' }}
                alt=""
                src={require('../../static/icons/location-icon.png')}
              />
              <span
                style={{
                  color: props.location.address
                    ? getPrimaryColors('primary')
                    : getPrimaryColors('font-color')
                }}
              >
                {props.location.address || 'Select Location'}
              </span>
            </div>
            {errors.pickup ? <small>{props.pickupDropOffMessage}</small> : null}
          </div>
        </React.Fragment>
        <React.Fragment>
          <div className="p-col-12 p-sm-6">
            <div
              className="p-col-12"
              style={{ fontWeight: 'bold', color: '#2c2d5b' }}
            >
              Area (Sq. ft)
            </div>
            <FormInput
              left={
                <img
                  src={require('../../static/icons/air-flightnumber-icon.png')}
                  alt=""
                />
              }
              label="Area (Sq. ft)"
              name="area"
              value={props.area}
              onChange={onInputChange}
              placeholder="Area (Sq. ft)"
              error={errors.Area}
            />
          </div>
          <div className="p-col-12 p-sm-6">
            <div
              className="p-col-12"
              style={{ fontWeight: 'bold', color: '#2c2d5b' }}
            >
              Floor
            </div>
            <FormInput
              left={
                <img
                  src={require('../../static/icons/air-ticket-number-icon.png')}
                  alt=""
                />
              }
              label="Floor"
              name="floor"
              value={props.floor}
              onChange={onInputChange}
              placeholder="Floor"
              error={errors.floor}
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

        <React.Fragment>
          <div className="p-col-12 p-sm-6">
            <div
              className="p-col-12"
              style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              onClick={() => props.toggleBusinessHoursModal()}
            >
              Select Days
            </div>
            <div
              className={classNames([
                'pickup-dropoff-input-div',
                ['form-error', errors.pickup]
              ])}
              onClick={() => props.toggleBusinessHoursModal()}
            >
              <span
                style={{
                  color: props.location.address
                    ? getPrimaryColors('primary')
                    : getPrimaryColors('font-color')
                }}
              >
                {'Select Timing'}
              </span>
            </div>
            {/* <SelectInput
              label="selectedDays"
              placeholder="Select Days"
              name="selectedDays"
              error={errors.selectedDays}
              value={selectedDays}
              onChange={handleChangeMultiple}
              multiple
              options={days.map(days => {
                let _id = days._id;
                let value = days.value;
                return { value, _id };
              })}
            /> */}
            {/* <FormNativeSelectInputField
              name="days"
              type="react-select"
              options={[
                { label: 'Monday', value: 'monday' },
                { label: 'Tuesday', value: 'tuesday' },
                { label: 'Wednesday', value: 'wednesday' },
                { label: 'Thursday', value: 'thursday' },
                { label: 'Friday', value: 'friday' },
                { label: 'Saturday', value: 'saturday' },
                { label: 'Sunday', value: 'sunday' }
              ]}
              multiple
              value={props.days}
              onChange={handleSelectChange}
              error={errors.days}
              left={
                <img
                  src={require('../../static/icons/modes-icon.png')}
                  alt=""
                />
              }
            /> */}
          </div>
          <div className="p-col-12 p-sm-6">
            <div
              className="p-col-6"
              style={{ fontWeight: 'bold', color: '#2c2d5b' }}
            >
              Space Type
            </div>
            <FormNativeSelectInputField
              name="type"
              type="react-select"
              options={[
                { label: 'House', value: 'house' },
                { label: 'Flat', value: 'flat' }
              ]}
              multi
              value={props.type}
              onChange={handleSelectChange}
              error={errors.type}
              left={
                <img
                  src={require('../../static/icons/modes-icon.png')}
                  alt=""
                />
              }
            />
          </div>
        </React.Fragment>

        {/* <React.Fragment>
          <div
            className="p-col-12"
            style={{
              fontWeight: 'bold',
              color: '#2c2d5b',
              padding: '2em 0.5em 1.5em 0.5em'
            }}
          >
            Select Timing
          </div>
          <div className="p-col-12 p-sm-6">
            <div
              className="p-col-12"
              style={{ fontWeight: 'bold', color: '#2c2d5b' }}
            >
              Opens at
            </div>
            <FormTimeInputField
              value={from ? from : null}
              onChange={e =>
                onInputChange({
                  target: {
                    name: 'from',
                    value: e
                  }
                })
              }
              format="hh:mm a"
              error={errors.from}
              placeholder="Select Time"
              left={
                <img
                  style={{ width: '1.1rem' }}
                  alt=""
                  src={require('../../static/icons/fromtime-icon.png')}
                />
              }
            />
          </div>
          <div className="p-col-12 p-sm-6">
            <div
              className="p-col-12"
              style={{ fontWeight: 'bold', color: '#2c2d5b' }}
            >
              Closed at
            </div>
            <FormTimeInputField
              value={to ? to : null}
              onChange={e =>
                onInputChange({
                  target: {
                    name: 'to',
                    value: e
                  }
                })
              }
              format="hh:mm a"
              error={errors.from}
              placeholder="Select Time"
              left={
                <img
                  style={{ width: '1.1rem' }}
                  alt=""
                  src={require('../../static/icons/fromtime-icon.png')}
                />
              }
            />
          </div>
        </React.Fragment>
         */}
        <React.Fragment>
          <div
            className={classNames([
              ['p-col-4 p-md-4 p-lg-4', !canStoreFrozenItems],
              ['p-col-4 p-md-4 p-lg-4', canStoreFrozenItems]
            ])}
            style={{ padding: '1rem' }}
          >
            <FormControlLabel
              className="form-checkbox-label-input"
              control={
                <Checkbox
                  checked={canStoreFrozenItems}
                  onChange={onInputChange}
                  value="canStoreFrozenItems"
                  name="canStoreFrozenItems"
                  color="default"
                />
              }
              label="Can store frozen items?"
            />
          </div>
          <div
            className={classNames([
              ['p-col-4 p-md-4 p-lg-4', !hasShelves],
              ['p-col-4 p-md-4 p-lg-4', hasShelves]
            ])}
            style={{ padding: '1rem' }}
          >
            <FormControlLabel
              className="form-checkbox-label-input"
              control={
                <Checkbox
                  checked={hasShelves}
                  onChange={onInputChange}
                  value="hasShelves"
                  name="hasShelves"
                  color="default"
                />
              }
              label="Has Shelves?"
            />
          </div>
          <div
            className={classNames([
              ['p-col-4 p-md-4 p-lg-4', !canStoreHeavyItems],
              ['p-col-4 p-md-4 p-lg-4', canStoreHeavyItems]
            ])}
            style={{ padding: '1rem' }}
          >
            <FormControlLabel
              className="form-checkbox-label-input"
              control={
                <Checkbox
                  checked={canStoreHeavyItems}
                  onChange={onInputChange}
                  value="canStoreHeavyItems"
                  name="canStoreHeavyItems"
                  color="default"
                />
              }
              label="Can store heavy items?"
            />
          </div>
          <div
            className={classNames([
              ['p-col-12 p-md-12 p-lg-12', !canStoreFlammableItems],
              ['p-col-12 p-md-12 p-lg-12', canStoreFlammableItems]
            ])}
            style={{ padding: '1rem' }}
          >
            <FormControlLabel
              className="form-checkbox-label-input"
              control={
                <Checkbox
                  checked={canStoreFlammableItems}
                  onChange={onInputChange}
                  value="canStoreFlammableItems"
                  name="canStoreFlammableItems"
                  color="default"
                />
              }
              label="Can store flammable items?"
            />
          </div>
        </React.Fragment>
        <React.Fragment>
          <div className="p-col-12 p-md-6 p-lg-6" style={{ padding: '1rem' }}>
            {itemImages.map((item, i) => (
              <img
                onClick={() => handleImageClick(itemImages)}
                key={`item-image-${i + 1}`}
                className="img"
                src={item}
              />
            ))}
            {errors.itemImages ? (
              <span
                style={{
                  color: getPrimaryColors('error'),
                  fontFamily: 'Exo2-Medium'
                }}
              >
                Item images are required.
              </span>
            ) : null}
          </div>
          <div
            className="p-col-12 p-md-6 p-lg-3"
            style={{ padding: '1rem', position: 'relative' }}
          >
            <FileUploadS
              activity={activity}
              sectionClassName="commodity-file-upload"
              onDrop={files => onFileDrop(files[0])}
            />
            <FormSubmitBtn
              disabled={activity}
              label="Upload Images"
              style={{ padding: '4px 1rem', borderRadius: 4, width: '100%' }}
            />
          </div>
        </React.Fragment>
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
      </div>
      <Dialog
        maxWidth="lg"
        className="full-width-dialog full-height-dialog"
        open={isDialogOpen}
        onClose={handleDialogVisibility}
      >
        <SelectLocationReusableComponent
          editable={true}
          addressKey="address"
          ref={mapComponentRef}
          heading={dialogData.heading}
          location={isDialogOpen ? dialogData.name.location : []}
          handleMapClick={handleDialogCallback}
          handleSelectPlace={handleDialogCallback}
          actions={
            <div>
              <FormSubmitBtn
                label="Done"
                disabled={activity}
                style={{ borderRadius: 4, width: 'unset' }}
                onSubmit={handleDialogVisibility}
              />
            </div>
          }
        />
      </Dialog>
      <AddScheduleModal
        show={props.showBusinessHoursModal}
        handleClose={props.toggleBusinessHoursModal}
        handleFieldValueChange={props.handleFieldValueChange}
        onSave={props._handleFormSubmit}
        title={'Add Business Hours'}
        businessHours={props.businessHours}
      />
    </Page>
  );
};

SpacesFormComponent.defaultProps = {};

SpacesFormComponent.propTypes = {
  _id: PropTypes.string,
  handleDialogCallback: PropTypes.func,
  handleDialogVisibility: PropTypes.func,
  handleFieldValueChange: PropTypes.func,
  toggleBusinessHoursModal: PropTypes.func,
  dialogData: PropTypes.object,
  location: PropTypes.object,
  isEdit: PropTypes.bool,
  showBusinessHoursModal: PropTypes.bool,
  active: PropTypes.bool,
  activity: PropTypes.bool,
  heading: PropTypes.string,
  config: PropTypes.object,
  errors: PropTypes.shape(),
  handleSubmit: PropTypes.func,
  onInputChange: PropTypes.func,
  fieldsType: PropTypes.string,
  modeLabelRef: PropTypes.shape(),
  handleToggleChange: PropTypes.func,
  onUpdateVehicleData: PropTypes.func
};

export default SpacesFormComponent;
