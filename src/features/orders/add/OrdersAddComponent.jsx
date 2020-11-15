/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
import FormTextArea from '../../../components/form/FormTextArea';


class OrdersAddComponent extends Component {
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
      details,
      user,
      activity,
      type,
      commodities,
      notes,
      items,
      pickupDate,
      flexibleDate,
      from,
      to,
      contactName,
      contactNumber,
      deliveryType,
      preferredMode,
      transporters,
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
      allowMultipleRoutes,
      needHelper,
      deliveryTimeFrom,
      deliveryTimeTo,
      deliveryDate,
      bonus,
      handleChange,
      handleDialogClose

    } = this.props;
    const { open: isOpen, comp } = this.props.dialogChangeUnits;
    const Comp = this.props.handleGetDialogComponent(comp);
    return (
      <Page activity={activity} className="orders-add-container" noActivity>
        <div className="page-title">
          <span>Add Request</span>
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
            <p className="heading" style={{ height: this.headingHeight }}></p>
            <FormNativeSelectInputField
              name="preferredMode"
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
              value={preferredMode}
              onChange={handleSelectChange}
              error={errors.mode}
              left={
                <img
                  src={require('../../../static/icons/modes-icon.png')}
                  alt=""
                />
              }
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1rem' }}>
            <p className="heading" style={{ height: this.headingHeight }}></p>
            <FormNativeSelectInputField
              name="transportersType"
              type="react-select"
              options={transporters.map(transporters => {
                let id =
                  transporters._id;
                let label =
                  transporters.firstName + ' ' + transporters.lastName;
                let value =
                  transporters.firstName + ' ' + transporters.lastName;
                return { id, value, label };
              })}
              value={this.props.transportersType}
              onChange={handleSelectChange}
              error={errors.transportersType}
              left={
                <img
                  src={require('../../../static/icons/modes-icon.png')}
                  alt=""
                />
              }
            />
          </div>
          <div
            className="p-col-12 p-md-6 p-lg-4"
            style={{ color: '#2c2d5b' }}
          >
            <p>{`Offer Additional Bonus (${user.config.currency})`}</p>
            <FormInputS
              name="bonus"
              type="number"
              value={bonus}
              onChange={onInputChange}
              placeholder="Bonus"
              error={errors.bonus}
              left={
                <img
                  style={{ width: '1rem' }}
                  alt=""
                  src={require('../../../static/icons/fullname-icon.png')}
                />
              }
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-4" style={{ padding: '1rem' }}>

          </div>
          <div className="p-col-12 p-md-6 p-lg-6" style={{ padding: '1rem' }}>
            <p className="heading">Contact Details</p>
            <div
              className="p-col-12"
              style={{color: '#2c2d5b' }}
            >
              Sender / Receiver Full Name
              </div>
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
          <div className="p-col-12 p-md-6 p-lg-6" style={{ padding: '1rem' }}>
            <p className="heading" style={{ height: this.headingHeight }}></p>
            <div
              className="p-col-12"
              style={{ color: '#2c2d5b' }}
            >
              Sender / Receiver Phone Number
              </div>
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
          <div className="p-col-12 p-md-12 p-lg-12" style={{ padding: '1rem' }}>
            <p className="heading">Pickup/Delivery Notes</p>
            <FormTextArea
              rows={5}
              name="notes"
              value={notes}
              onChange={onInputChange}
              error={errors.notes}
              placeholder="Please provide any Pickup/Delivery Notes"
            />
          </div>
          <div
            className={classNames([
              ['p-col-4 p-md-4 p-lg-4', !allowMultipleRoutes],
              ['p-col-4 p-md-4 p-lg-4', allowMultipleRoutes]
            ])}
            style={{ padding: '1rem' }}
          >
            <FormControlLabel
              className="form-checkbox-label-input"
              control={
                <Checkbox
                  checked={allowMultipleRoutes}
                  onChange={onInputChange}
                  value="allowMultipleRoutes"
                  name="allowMultipleRoutes"
                  color="default"
                />
              }
              label="send parcel via multiple destinations"
            />
          </div>
          <div
            className={classNames([
              ['p-col-6 p-md-6 p-lg-6', !needHelper],
              ['p-col-6 p-md-6 p-lg-6', needHelper]
            ])}
            style={{ padding: '1rem' }}
          >
            <FormControlLabel
              className="form-checkbox-label-input"
              control={
                <Checkbox
                  checked={needHelper}
                  onChange={onInputChange}
                  value="needHelper"
                  name="needHelper"
                  color="default"
                />
              }
              label="helper required for loading"
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-9" style={{ padding: '1rem' }}>
            <p className="heading">Parcel Info</p>
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1rem' }}>
            <FormSubmitBtn
              disabled={activity}
              onSubmit={() =>
                handleChange({
                  dialogChangeUnits: {
                    open: true,
                    comp: 'changeUnits'
                  }
                })
              }
              label="Change Units"
              style={{ padding: '4px 1rem', borderRadius: 4, width: '100%' }}
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-6" style={{ padding: '1rem' }}>
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
            {itemImages ? (
              itemImages.map((item, i) => (
                <img
                  onClick={() => handleImageClick(itemImages)}
                  key={`item-image-${i + 1}`}
                  className="img"
                  src={item}
                />
              ))
            ) : null}

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
              onSubmit={this.props.onAddItem}
              label="Add"
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
                  <TableCell>Category</TableCell>
                  <TableCell className="no-border">Rate</TableCell>
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
                          {item.images ? (
                            item.images.map((image, i) => (
                              <img
                                onClick={() => handleImageClick(item.images)}
                                key={`item-image-${i + 1}`}
                                className="img"
                                src={image}
                              />
                            ))
                          ) :
                            <div
                              className="p-col-12 p-md-6 p-lg-12"
                              style={{ position: 'relative' }}
                            >
                              <FileUploadS
                                activity={activity}
                                sectionClassName="commodity-file-upload"
                                onDrop={files => { this.props.onFileDrop(files[0], index) }}
                              />
                              <FormSubmitBtn
                                disabled={activity}
                                label="Upload Images"
                                style={{ padding: '4px 1rem', borderRadius: 4, width: '100%' }}
                              />
                            </div>
                          }

                        </TableCell>
                        <TableCell>{item.itemType.name}</TableCell>

                        <TableCell className="no-border">
                          {getRate ? (
                            <span>
                              {user.config.currency}{' '}
                              {item ? _.get(item, 'minPrice') : 'No Price'} -{' '}
                              {user.config.currency}{' '}
                              {item ? _.get(item, 'maxPrice') : 'No Price'}
                            </span>
                          ) : null}
                        </TableCell>
                        <TableCell className="no-border">
                          <img
                            style={{ cursor: 'pointer' }}
                            onClick={() => this.props.onDeleteItem(index)}
                            alt="Remove item"
                            src={require('../../../static/icons/delete-icon.png')}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                    <TableRow>
                      <TableCell
                        className="no-border"
                        colSpan={8}
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
          <div className="p-col-12 p-md-12 p-lg-12" style={{ padding: '1rem' }}>
            <span
              style={{
                color: getPrimaryColors('primary'),
                fontFamily: 'Exo2-Medium'
              }}
            >
              Make sure provided contact, dimension and weight of parcel are accurate.
            </span>
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
              disabled={activity || getRate}
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
            <FormSubmitBtn
              label="Submit"
              disabled={activity || !getRate}
              onSubmit={this.props.submitOrder}
              style={{
                padding: '4px 1rem',
                borderRadius: 4,
                width: '100%',
                margin: 0,
                flexGrow: 1
              }}
            />
          </div>
        </div>
        <Dialog
          open={isOpen}
          onClose={handleDialogClose}
          aria-labelledby="actions-dialog"
          className="u-r-d-actions-dialog"
        >
          <Comp
            {...this.props}
            details={details}
            dialog={dialogData}
            cancelType="user"
            ratingKey="rating"
            feedbackTo="transporter"
            handleDialogClose={handleDialogClose}
            handleSetDetails={this.props.handleSetDetails}
          />
        </Dialog>
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

OrdersAddComponent.propTypes = {
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
  notes: PropTypes.string,
  itemType: PropTypes.shape(),
  transporters: PropTypes.arrayOf(PropTypes.object),
  submitOrder: PropTypes.func,
  itemWidth: PropTypes.string,
  isDialogOpen: PropTypes.bool,
  itemHeight: PropTypes.string,
  itemLength: PropTypes.string,
  itemWeight: PropTypes.string,
  flexibleDate: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  contactName: PropTypes.string,
  dialogData: PropTypes.shape(),
  onInputChange: PropTypes.func,
  onSubmitOrder: PropTypes.func,
  pickupDate: PropTypes.shape(),
  to: PropTypes.instanceOf(Date),
  promoObject: PropTypes.shape(),
  itemQuantity: PropTypes.string,
  mapComponentRef: PropTypes.func,
  deliveryDate: PropTypes.shape(),
  preferredMode: PropTypes.shape(),
  transportersType: PropTypes.shape(),
  contactNumber: PropTypes.string,
  deliveryType: PropTypes.shape(),
  handleImageClick: PropTypes.func,
  from: PropTypes.instanceOf(Date),
  handleSelectChange: PropTypes.func,
  handleDialogCallback: PropTypes.func,
  flexibleDeliveryDate: PropTypes.bool,
  allowMultipleRoutes: PropTypes.bool,
  needHelper: PropTypes.bool,
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
  items: PropTypes.arrayOf(PropTypes.object),
  subCategories: PropTypes.arrayOf(PropTypes.object),
  tellInputRef: PropTypes.func
};

export default OrdersAddComponent;
