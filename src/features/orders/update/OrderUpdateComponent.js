import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Checkbox,
  FormControlLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog
} from '@material-ui/core';
import moment from 'moment';

import Page from '../../../components/layout/Page';
import { getPrimaryColors } from '../../../utils/functions';
import FormInputS from '../../../components/form/FormInputS';
import FileUploadS from '../../../components/form/FileUploadS';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';
import { classNames, getDiscountedPrice } from '../../../utils/functions';
import FormDateInputField from '../../../components/form/FormDateInputField';
import FormTimeInputField from '../../../components/form/FormTimeInputField';
import FormNativeSelectInputField from '../../../components/form/FormNativeSelectInputField';
import SelectLocationReusableComponent from '../../../components/map/SelectLocationReusableComponent';
import FormTelInput from '../../../components/form/FormTelInput';

class OrdersUpdateComponent extends Component {
  constructor(props) {
    super(props);

    this.headingRef = {};
    this.headingHeight = 0;
  }

  componentDidMount() {
    this.headingHeight = this.headingRef.offsetHeight || 0;
    this.setState({});
  }

  handleHeadingRef = ref => (this.headingRef = ref);

  render() {
    const {
      user,
      activity,
      type,
      commodities,
      pickupDate,
      flexibleDate,
      from,
      to,
      contactName,
      contactNumber,
      deliveryType,
      itemName,
      itemQuantity,
      itemWeight,
      itemLength,
      itemWidth,
      itemHeight,
      dialogData,
      onInputChange,
      errors,
      categories,
      promo,
      getRate,
      rates,
      promoObject,
      itemImages,
      handleImageClick,
      handleSelectChange,
      handleDialogVisibility,
      flexibleDeliveryDate,
      deliveryTimeFrom,
      deliveryTimeTo,
      deliveryDate,
      isDuplicate,
    } = this.props;

    return (
      <Page activity={activity} className="orders-add-container" noActivity>
        <div className="page-title">
          {isDuplicate ? (
            <span>Duplicate Request</span>
          ) : (
              <span>Edit Request</span>
            )}

        </div>
        <div className="p-grid" style={{ margin: 0, padding: '1rem' }}>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1rem' }}>
            <p className="heading" ref={this.handleHeadingRef}>
              Request Details
            </p>
            <FormNativeSelectInputField
              type="react-select"
              name="type"
              options={[
                { value: 'deliver', label: 'Send Parcel' },
                { value: 'receive', label: 'Receive Parcel' }
              ]}
              value={type}
              onChange={handleSelectChange}
              error={errors.type}
              left={
                <img
                  style={{ width: '1rem' }}
                  alt=""
                  src={require('../../../static/icons/request-type-icon.png')}
                />
              }
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1rem' }}>
            <p className="heading" style={{ height: this.headingHeight }}></p>
            <FormNativeSelectInputField
              isDisabled={pickupDate && deliveryDate ? true : false}
              type="react-select"
              name="deliveryType"
              options={[
                { value: 'economy', label: 'Economy' },
                { value: 'standard', label: 'Standard' },
                { value: 'urgent', label: 'Urgent' }
              ]}
              value={deliveryType}
              onChange={handleSelectChange}
              error={errors.deliveryType}
              left={
                <img
                  style={{ width: '1.2rem' }}
                  alt=""
                  src={require('../../../static/icons/deliverytype-icon.png')}
                />
              }
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1rem' }}>
            <p className="heading">Contact Details</p>
            <FormInputS
              name="contactName"
              value={contactName}
              onChange={onInputChange}
              placeholder="Full Name"
              error={errors.contactName}
              left={
                <img
                  style={{ width: '1rem' }}
                  alt=""
                  src={require('../../../static/icons/fullname-icon.png')}
                />
              }
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1rem' }}>
            <p className="heading" style={{ height: this.headingHeight }}></p>
            <FormInputS
              inputType="number"
              error={errors.contactNumber}
              input={
                <FormTelInput
                  name="contactNumber"
                  value={contactNumber}
                  onChange={onInputChange}
                  placeholder="Phone Number"
                  ref={this.props.tellInputRef}
                  className="add-order-phone-input"
                  styles={{
                    background: 'none',
                    padding: '5px 5px 5px 83px',
                    margin: '5px',
                    border: 'none',
                    width: '100%',
                    fontSize: '1.2em',
                    outline: 'none',
                    fontFamily: 'Exo2-Medium',
                    color: getPrimaryColors('primary')
                  }}
                />
              }
            />

            {/* <FormInputS
              inputType="number"
              name="contactNumber"
              value={contactNumber}
              onChange={onInputChange}
              placeholder="Phone Number"
              error={errors.contactNumber}
              left={
                <img
                  style={{ width: '0.7rem' }}
                  alt=""
                  src={require('../../../static/icons/mobile-icon.png')}
                />
              }
            /> */}
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1rem' }}>
            <p className="heading">Pickup</p>
            <FormDateInputField
              placeholder="Pickup Date"
              name="pickupDate"
              value={pickupDate ? new Date(pickupDate) : null}
              onChange={e =>
                onInputChange({
                  target: {
                    name: 'pickupDate',
                    value: moment(e)
                  }
                })
              }
              error={errors.pickupDate}
              left={
                <img
                  style={{ width: '1rem' }}
                  alt=""
                  src={require('../../../static/icons/date-icon.png')}
                />
              }
            />
          </div>
          {!flexibleDate ? (
            <>
              <div
                className="p-col-12 p-md-6 p-lg-3"
                style={{ padding: '1rem' }}
              >
                <p
                  className="heading"
                  style={{ height: this.headingHeight }}
                ></p>
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
                  placeholder="Pickup Time From"
                  left={
                    <img
                      style={{ width: '1.1rem' }}
                      alt=""
                      src={require('../../../static/icons/fromtime-icon.png')}
                    />
                  }
                />
              </div>
              <div
                className="p-col-12 p-md-6 p-lg-3"
                style={{ padding: '1rem' }}
              >
                <p
                  className="heading"
                  style={{ height: this.headingHeight }}
                ></p>
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
                  error={errors.to}
                  placeholder="Pickup Time To"
                  left={
                    <img
                      style={{ width: '1.1rem' }}
                      alt=""
                      src={require('../../../static/icons/fromtime-icon.png')}
                    />
                  }
                />
              </div>
            </>
          ) : null}
          <div
            className={classNames([
              ['p-col-12 p-md-6 p-lg-3', !flexibleDate],
              ['p-col-12 p-md-6 p-lg-9', flexibleDate]
            ])}
            style={{ padding: '1rem' }}
          >
            <p className="heading" style={{ height: this.headingHeight }}></p>
            <FormControlLabel
              className="form-checkbox-label-input"
              control={
                <Checkbox
                  checked={flexibleDate}
                  onChange={onInputChange}
                  value="flexibleDate"
                  name="flexibleDate"
                  color="default"
                />
              }
              label="Flexible Pickup Date and Time"
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1rem' }}>
            <p className="heading">Dropoff</p>
            <FormDateInputField
              name="deliveryDate"
              placeholder="Dropoff Date"
              value={deliveryDate ? new Date(deliveryDate) : null}
              minDate={pickupDate ? new Date(pickupDate) : new Date()}
              onChange={e =>
                onInputChange({
                  target: {
                    name: 'deliveryDate',
                    value: moment(e)
                  }
                })
              }
              error={errors.deliveryDate}
              left={
                <img
                  style={{ width: '1rem' }}
                  alt=""
                  src={require('../../../static/icons/date-icon.png')}
                />
              }
            />
          </div>
          {!flexibleDeliveryDate ? (
            <>
              <div
                className="p-col-12 p-md-6 p-lg-3"
                style={{ padding: '1rem' }}
              >
                <p
                  className="heading"
                  style={{ height: this.headingHeight }}
                ></p>
                <FormTimeInputField
                  value={deliveryTimeFrom ? deliveryTimeFrom : null}
                  onChange={e =>
                    onInputChange({
                      target: {
                        name: 'deliveryTimeFrom',
                        value: e
                      }
                    })
                  }
                  format="hh:mm a"
                  error={errors.deliveryTimeFrom}
                  placeholder="Dropoff Time From"
                  left={
                    <img
                      style={{ width: '1.1rem' }}
                      alt=""
                      src={require('../../../static/icons/fromtime-icon.png')}
                    />
                  }
                />
              </div>
              <div
                className="p-col-12 p-md-6 p-lg-3"
                style={{ padding: '1rem' }}
              >
                <p
                  className="heading"
                  style={{ height: this.headingHeight }}
                ></p>
                <FormTimeInputField
                  value={deliveryTimeTo ? deliveryTimeTo : null}
                  onChange={e =>
                    onInputChange({
                      target: {
                        name: 'deliveryTimeTo',
                        value: e
                      }
                    })
                  }
                  format="hh:mm a"
                  error={errors.deliveryTimeTo}
                  placeholder="Dropoff Time To"
                  left={
                    <img
                      style={{ width: '1.1rem' }}
                      alt=""
                      src={require('../../../static/icons/fromtime-icon.png')}
                    />
                  }
                />
              </div>
            </>
          ) : null}
          <div
            className={classNames([
              ['p-col-12 p-md-6 p-lg-3', !flexibleDeliveryDate],
              ['p-col-12 p-md-6 p-lg-9', flexibleDeliveryDate]
            ])}
            style={{ padding: '1rem' }}
          >
            <p className="heading" style={{ height: this.headingHeight }}></p>
            <FormControlLabel
              className="form-checkbox-label-input"
              control={
                <Checkbox
                  checked={flexibleDeliveryDate}
                  onChange={onInputChange}
                  value="flexibleDeliveryDate"
                  name="flexibleDeliveryDate"
                  color="default"
                />
              }
              label="Flexible Dropoff Date and Time"
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-6" style={{ padding: '1rem' }}>
            <p className="heading">Location</p>
            <div
              className={classNames([
                'pickup-dropoff-input-div',
                ['form-error', errors.pickup]
              ])}
              onClick={() =>
                handleDialogVisibility(true, {
                  pickup: this.props.pickup,
                  heading: 'Select Pickup',
                  name: 'pickup'
                })
              }
            >
              <img
                style={{ width: '1rem' }}
                alt=""
                src={require('../../../static/icons/location-icon.png')}
              />
              <span
                style={{
                  color: this.props.pickup.address
                    ? getPrimaryColors('primary')
                    : getPrimaryColors('font-color')
                }}
              >
                {this.props.pickup.address || 'Select Pickup Location'}
              </span>
            </div>
            {errors.pickup ? (
              <small>{this.props.pickupDropOffMessage}</small>
            ) : null}
          </div>
          <div className="p-col-12 p-md-6 p-lg-6" style={{ padding: '1rem' }}>
            <p className="heading" style={{ height: this.headingHeight }} />
            <div
              className={classNames([
                'pickup-dropoff-input-div',
                ['form-error', errors.dropoff]
              ])}
              onClick={() =>
                handleDialogVisibility(true, {
                  dropoff: this.props.dropoff,
                  heading: 'Select Dropoff',
                  name: 'dropoff'
                })
              }
            >
              <img
                style={{ width: '1rem' }}
                alt=""
                src={require('../../../static/icons/location-icon.png')}
              />
              <span
                style={{
                  color: this.props.dropoff.address
                    ? getPrimaryColors('primary')
                    : getPrimaryColors('font-color')
                }}
              >
                {this.props.dropoff.address || 'Select Dropoff Location'}
              </span>
            </div>
            {errors.dropoff ? (
              <small>{this.props.pickupDropOffMessage}</small>
            ) : null}
          </div>
          <div className="p-col-12 p-md-6 p-lg-6" style={{ padding: '1rem' }}>
            <p className="heading">Parcel Info</p>
            <FormNativeSelectInputField
              valueKey="_id"
              type="react-select"
              name="itemType"
              options={categories}
              value={this.props.itemType}
              onChange={handleSelectChange}
              error={errors.itemType}
              getOptionLabel={option => option.name}
              left={
                <img
                  style={{ width: '1.2rem' }}
                  alt=""
                  src={require('../../../static/icons/fragile-icon.png')}
                />
              }
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1rem' }}>
            <p className="heading" style={{ height: this.headingHeight }}></p>
            <FormInputS
              name="itemName"
              value={itemName}
              onChange={onInputChange}
              placeholder="Item Name"
              error={errors.itemName}
              left={
                <img
                  style={{ width: '1.2rem' }}
                  alt=""
                  src={require('../../../static/icons/fullname-icon.png')}
                />
              }
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1rem' }}>
            <p className="heading" style={{ height: this.headingHeight }}></p>
            <FormInputS
              inputType="number"
              name="itemQuantity"
              value={itemQuantity}
              onChange={onInputChange}
              placeholder="Quantity"
              error={errors.itemQuantity}
              left={
                <img
                  style={{ width: '1.2rem' }}
                  alt=""
                  src={require('../../../static/icons/quantity-icon.png')}
                />
              }
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1rem' }}>
            <FormInputS
              inputType="float"
              name="itemWidth"
              value={itemWidth}
              onChange={onInputChange}
              placeholder={`Width (${user.config.measurementUnit})`}
              error={errors.itemWidth}
              left={
                <img
                  alt=""
                  src={require('../../../static/icons/width-icon.png')}
                />
              }
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1rem' }}>
            <FormInputS
              inputType="float"
              name="itemHeight"
              value={itemHeight}
              onChange={onInputChange}
              placeholder={`Height (${user.config.measurementUnit})`}
              error={errors.itemHeight}
              left={
                <img
                  alt=""
                  src={require('../../../static/icons/height-icon.png')}
                />
              }
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1rem' }}>
            <FormInputS
              inputType="float"
              name="itemLength"
              value={itemLength}
              onChange={onInputChange}
              placeholder={`Length (${user.config.measurementUnit})`}
              error={errors.itemLength}
              left={
                <img
                  alt=""
                  src={require('../../../static/icons/length-icon.png')}
                />
              }
            />
          </div>

          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1rem' }}>
            <FormInputS
              inputType="float"
              name="itemWeight"
              value={itemWeight}
              onChange={onInputChange}
              placeholder={`Weight (${user.config.weightUnit})`}
              error={errors.itemWeight}
              left={
                <img
                  alt=""
                  src={require('../../../static/icons/weight-icon.png')}
                />
              }
            />
          </div>
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
              onDrop={files => this.props.onFileDrop(files[0])}
            />
            <FormSubmitBtn
              disabled={activity}
              label="Upload Images"
              style={{ padding: '4px 1rem', borderRadius: 4, width: '100%' }}
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1rem' }}>
            <FormSubmitBtn
              disabled={activity}
              onSubmit={
                !this.props.isCommodityEdit
                  ? this.props.onAddItem
                  : this.props.handleEditItem
              }
              label={this.props.isCommodityEdit ? 'Update' : 'Add'}
              style={{ padding: '4px 1rem', borderRadius: 4, width: '100%' }}
            />
          </div>
          <div
            id="parcel-table"
            className="p-col-12"
            style={{ padding: '1rem', overflowY: 'auto' }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Volume</TableCell>
                  <TableCell>Item Images</TableCell>
                  <TableCell className="no-border">Category</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {commodities.length ? (
                  commodities.map((item, index) => {
                    return (
                      <TableRow key={`commodity-${index + 1}`}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          {item.weight} {user.config.weightUnit}
                        </TableCell>
                        <TableCell>
                          {item.length} x {item.width} x {item.height}{' '}
                          {user.config.measurementUnit}
                        </TableCell>
                        <TableCell>
                          {item.images.map((image, i) => (
                            <img
                              onClick={() => handleImageClick(item.images)}
                              key={`item-image-${i + 1}`}
                              className="img"
                              src={image}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="no-border">
                          {item.itemType.name}
                        </TableCell>
                        <TableCell className="no-border">
                          <div style={{ display: 'flex' }}>
                            <img
                              style={{ cursor: 'pointer', padding: 2 }}
                              onClick={() => this.props.onDeleteItem(index)}
                              alt="Remove item"
                              src={require('../../../static/icons/delete-icon.png')}
                            />
                            <img
                              style={{ cursor: 'pointer', padding: 2 }}
                              onClick={() => this.props.onEditItem(index)}
                              alt="Remove item"
                              src={require('../../../static/icons/edit-icon.png')}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                    <TableRow>
                      <TableCell
                        className="no-border"
                        colSpan={7}
                        style={{
                          textAlign: 'center',
                          color: errors.commodities
                            ? getPrimaryColors('error')
                            : getPrimaryColors('primary')
                        }}
                      >
                        No Items
                    </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1rem' }}>
            <p className="heading">Promo Code</p>
            <FormInputS
              name="promo"
              value={promo}
              onChange={onInputChange}
              placeholder="Enter Promo Code"
            />
          </div>
          <div
            className="p-col-12 p-md-6 p-lg-3"
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {getRate ? (
              <>
                <p className="heading">Request Price</p>
                <div
                  style={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'Exo2-Medium'
                  }}
                >
                  <span
                    style={
                      promoObject._id
                        ? {
                          fontSize: '1em',
                          marginRight: 10,
                          textDecoration: 'line-through',
                          color: getPrimaryColors('primary')
                        }
                        : {
                          fontSize: '1.3rem',
                          color: getPrimaryColors('error')
                        }
                    }
                  >
                    {/* {user.config.currency} {rates.price.toFixed(2)} */}
                    {user.config.currency} {rates.minPrice.toFixed(2)} -{' '}
                    {user.config.currency} {rates.maxPrice.toFixed(2)}
                  </span>
                  {promoObject._id ? (
                    <span
                      style={{
                        fontSize: '1.3rem',
                        color: getPrimaryColors('error')
                      }}
                    >
                      {/* {user.config.currency}{' '}
                      {getDiscountedPrice(
                        rates.price,
                        promoObject.discount
                      ).toFixed(2)} */}
                      {user.config.currency}{' '}
                      {getDiscountedPrice(
                        rates.minPrice,
                        promoObject.discount
                      ).toFixed(2)}{' '}
                      {' - '}
                      {user.config.currency}{' '}
                      {getDiscountedPrice(
                        rates.maxPrice,
                        promoObject.discount
                      ).toFixed(2)}
                    </span>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
          <div
            className="p-col-12 p-md-6 p-lg-3"
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <p className="heading" style={{ height: this.headingHeight }}></p>
            <FormSubmitBtn
              label="Get Rates"
              disabled={activity}
              onSubmit={this.props.getRates}
              style={{
                padding: '4px 1rem',
                borderRadius: 4,
                width: '100%',
                margin: 0,
                flexGrow: 1
              }}
            />
          </div>
          <div
            className="p-col-12 p-md-6 p-lg-3"
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <p className="heading" style={{ height: this.headingHeight }}></p>
            {isDuplicate ? (<FormSubmitBtn
              label="Submit"
              disabled={activity || !getRate}
              onSubmit={this.props.updateOrder}
              style={{
                padding: '4px 1rem',
                borderRadius: 4,
                width: '100%',
                margin: 0,
                flexGrow: 1
              }}
            />) : (
                <FormSubmitBtn
                  label="Update"
                  disabled={activity || !getRate}
                  onSubmit={this.props.updateOrder}
                  style={{
                    padding: '4px 1rem',
                    borderRadius: 4,
                    width: '100%',
                    margin: 0,
                    flexGrow: 1
                  }}
                />
              )}

          </div>
        </div>
        <Dialog
          maxWidth="lg"
          className="full-width-dialog full-height-dialog"
          open={this.props.isDialogOpen}
          onClose={handleDialogVisibility}
        >
          <SelectLocationReusableComponent
            editable={true}
            addressKey="address"
            ref={this.props.mapComponentRef}
            heading={dialogData.heading}
            location={
              this.props.isDialogOpen
                ? this.props[dialogData.name].location
                : []
            }
            handleMapClick={this.props.handleDialogCallback}
            handleSelectPlace={this.props.handleDialogCallback}
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
      </Page>
    );
  }
}

OrdersUpdateComponent.propTypes = {
  isEdit: PropTypes.bool,
  user: PropTypes.shape(),
  getRate: PropTypes.bool,
  type: PropTypes.shape(),
  promo: PropTypes.string,
  getRates: PropTypes.func,
  activity: PropTypes.bool,
  errors: PropTypes.shape(),
  pickup: PropTypes.shape(),
  onAddItem: PropTypes.func,
  onFileDrop: PropTypes.func,
  dropoff: PropTypes.shape(),
  itemName: PropTypes.string,
  itemType: PropTypes.shape(),
  updateOrder: PropTypes.func,
  itemWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isDialogOpen: PropTypes.bool,
  itemHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  itemLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  itemWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flexibleDate: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  contactName: PropTypes.string,
  dialogData: PropTypes.shape(),
  onInputChange: PropTypes.func,
  onSubmitOrder: PropTypes.func,
  pickupDate: PropTypes.shape(),
  to: PropTypes.instanceOf(Date),
  promoObject: PropTypes.shape(),
  itemQuantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mapComponentRef: PropTypes.func,
  deliveryDate: PropTypes.shape(),
  contactNumber: PropTypes.string,
  deliveryType: PropTypes.shape(),
  handleImageClick: PropTypes.func,
  from: PropTypes.instanceOf(Date),
  handleSelectChange: PropTypes.func,
  handleDialogCallback: PropTypes.func,
  flexibleDeliveryDate: PropTypes.bool,
  handleDialogVisibility: PropTypes.func,
  pickupDropOffMessage: PropTypes.string,
  deliveryTimeTo: PropTypes.instanceOf(Date),
  deliveryTimeFrom: PropTypes.instanceOf(Date),
  rates: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({ price: PropTypes.number })
  ]),
  itemImages: PropTypes.arrayOf(PropTypes.string),
  categories: PropTypes.arrayOf(PropTypes.object),
  commodities: PropTypes.arrayOf(PropTypes.object),
  subCategories: PropTypes.arrayOf(PropTypes.object),
  tellInputRef: PropTypes.func,
  onEditItem: PropTypes.func,
  isCommodityEdit: PropTypes.bool,
  handleEditItem: PropTypes.func
};

export default OrdersUpdateComponent;
