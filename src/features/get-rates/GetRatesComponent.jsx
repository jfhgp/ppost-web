import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog
} from '@material-ui/core';

import {
  classNames,
  getPrimaryColors,
  getDiscountedPrice
} from '../../utils/functions';
import {
  weightUnits,
  currencyUnits,
  measurementUnits
} from '../../utils/unit.util';
import Header from '../../containers/Header';
import Footer from '../../containers/Footer';
import Feature from '../../components/Feature';
import FormInputS from '../../components/form/FormInputS';
import SliderComponent from '../../components/SliderComponent';
import FormSubmitBtn from '../../components/form/FormSubmitBtn';
import FormNativeSelectInputField from '../../components/form/FormNativeSelectInputField';
import SelectLocationReusableComponent from '../../components/map/SelectLocationReusableComponent';

const GetRatesComponent = props => {
  const {
    rates,
    errors,
    activity,
    dialogData,
    weightUnit,
    promoObject,
    handleChange,
    measurementUnit,
    handleDialogVisibility,
    handlePreferencesChange,
    handleLoginModalOpen,
    getRate
  } = props;

  return (
    <div className="get-rates-container" style={{ fontFamily: 'Exo2-Light' }}>
      <Header
        classes="track-parcel-header"
        showHeader={false}
        handleLoginModalOpen={handleLoginModalOpen}
      />
      <Feature>
        <SliderComponent sliderImage="get-rates-header.png" />
      </Feature>
      <div
        style={{
          marginTop: '2rem',
          color: '#fff',
          padding: '1em',
          fontSize: '1.8em',
          textAlign: 'center',
          backgroundColor: getPrimaryColors('secondary')
        }}
      >
        Get Rate
      </div>
      <div
        id="form"
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div
          className="p-grid"
          style={{
            margin: 0,
            padding: '2em 1em',
            width: '100%',
            maxWidth: 1366
          }}
        >
          <div className="p-col-12" style={{ padding: '1em' }}>
            <p className="heading">Preferences</p>
          </div>
          <div className="p-col-12 p-md-6 p-lg-4" style={{ padding: '1em' }}>
            <FormNativeSelectInputField
              name="currency"
              type="react-select"
              options={currencyUnits}
              value={props.currency}
              onChange={handlePreferencesChange}
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-4" style={{ padding: '1em' }}>
            <FormNativeSelectInputField
              name="weightUnit"
              value={weightUnit}
              type="react-select"
              options={weightUnits}
              onChange={handlePreferencesChange}
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-4" style={{ padding: '1em' }}>
            <FormNativeSelectInputField
              type="react-select"
              name="measurementUnit"
              value={measurementUnit}
              options={measurementUnits}
              onChange={handlePreferencesChange}
            />
          </div>
          <div
            className="p-col-12"
            style={{ padding: '1em', paddingTop: '2em' }}
          >
            <p className="heading">Location</p>
          </div>
          <div
            className="p-col-12 p-md-6 p-lg-4"
            style={{
              padding: '1em',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div
              className={classNames([
                'pickup-dropoff-input-div',
                ['form-error', errors.pickup]
              ])}
              onClick={() =>
                handleDialogVisibility(true, {
                  pickup: props.pickup,
                  heading: 'Select Pickup',
                  name: 'pickup'
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
                  padding: '10px 5px',
                  color: props.pickup.address
                    ? getPrimaryColors('primary')
                    : getPrimaryColors('font-color')
                }}
              >
                {props.pickup.address || 'Select Pickup Location'}
              </span>
            </div>
            {errors.pickup ? <small>{props.pickupDropOffMessage}</small> : null}
          </div>
          <div
            className="p-col-12 p-md-6 p-lg-4"
            style={{
              padding: '1em',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div
              className={classNames([
                'pickup-dropoff-input-div',
                ['form-error', errors.dropoff]
              ])}
              onClick={() =>
                handleDialogVisibility(true, {
                  dropoff: props.dropoff,
                  heading: 'Select Dropoff',
                  name: 'dropoff'
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
                  padding: '10px 5px',
                  color: props.dropoff.address
                    ? getPrimaryColors('primary')
                    : getPrimaryColors('font-color')
                }}
              >
                {props.dropoff.address || 'Select Dropoff Location'}
              </span>
            </div>
            {errors.dropoff ? (
              <small>{props.pickupDropOffMessage}</small>
            ) : null}
          </div>
          <div className="p-col-12 p-md-6 p-lg-4" style={{ padding: '1em' }}>
            <FormNativeSelectInputField
              type="react-select"
              name="deliveryType"
              error={errors.deliveryType}
              value={props.deliveryType}
              onChange={handleChange}
              options={[
                { value: 'economy', label: 'Economy' },
                { value: 'standard', label: 'Standard' },
                { value: 'urgent', label: 'Urgent' }
              ]}
              left={
                <img
                  style={{ width: '1.2rem' }}
                  alt=""
                  src={require('../../static/icons/deliverytype-icon.png')}
                />
              }
            />
          </div>
          <div
            className="p-col-12"
            style={{ padding: '1em', paddingTop: '2em' }}
          >
            <p className="heading">Parcel Info</p>
          </div>
          <div className="p-col-12 p-md-6" style={{ padding: '1em' }}>
            <FormNativeSelectInputField
              valueKey="_id"
              type="react-select"
              name="itemType"
              value={props.itemType}
              onChange={handleChange}
              options={props.categories}
              getOptionValue={item => item._id}
              getOptionLabel={option => option.name}
              error={errors.itemType}
              left={
                <img
                  style={{ width: '1.2rem' }}
                  alt=""
                  src={require('../../static/icons/fragile-icon.png')}
                />
              }
            />
          </div>
          <div className="p-col-12 p-md-3" style={{ padding: '1em' }}>
            <FormInputS
              name="itemName"
              value={props.itemName}
              onChange={handleChange}
              placeholder="Item Name"
              error={errors.itemName}
              left={
                <img
                  style={{ width: '1.2rem' }}
                  alt=""
                  src={require('../../static/icons/fullname-icon.png')}
                />
              }
            />
          </div>
          <div className="p-col-12 p-md-3" style={{ padding: '1em' }}>
            <FormInputS
              inputType="number"
              name="itemQuantity"
              value={props.itemQuantity}
              onChange={handleChange}
              placeholder="Quantity"
              error={errors.itemQuantity}
              left={
                <img
                  style={{ width: '1.2rem' }}
                  alt=""
                  src={require('../../static/icons/quantity-icon.png')}
                />
              }
            />
          </div>
          <div className="p-col-12 p-md-3" style={{ padding: '1em' }}>
            <FormInputS
              inputType="float"
              name="itemWidth"
              value={props.itemWidth}
              onChange={handleChange}
              placeholder="Width"
              error={errors.itemWidth}
              left={
                <img
                  style={{ width: '1.2rem' }}
                  alt=""
                  src={require('../../static/icons/width-icon.png')}
                />
              }
              right={<span>{measurementUnit.value}</span>}
            />
          </div>
          <div className="p-col-12 p-md-3" style={{ padding: '1em' }}>
            <FormInputS
              inputType="float"
              name="itemHeight"
              value={props.itemHeight}
              onChange={handleChange}
              placeholder="Height"
              error={errors.itemHeight}
              left={
                <img
                  style={{ width: '1.2rem' }}
                  alt=""
                  src={require('../../static/icons/height-icon.png')}
                />
              }
              right={<span>{measurementUnit.value}</span>}
            />
          </div>
          <div className="p-col-12 p-md-3" style={{ padding: '1em' }}>
            <FormInputS
              inputType="float"
              name="itemLength"
              value={props.itemLength}
              onChange={handleChange}
              placeholder="Length"
              error={errors.itemLength}
              left={
                <img
                  style={{ width: '1.2rem' }}
                  alt=""
                  src={require('../../static/icons/length-icon.png')}
                />
              }
              right={<span>{measurementUnit.value}</span>}
            />
          </div>
          <div className="p-col-12 p-md-3" style={{ padding: '1em' }}>
            <FormInputS
              inputType="float"
              name="itemWeight"
              value={props.itemWeight}
              onChange={handleChange}
              placeholder="Weight"
              error={errors.itemWeight}
              left={
                <img
                  style={{ width: '1.2rem' }}
                  alt=""
                  src={require('../../static/icons/weight-icon.png')}
                />
              }
              right={<span>{weightUnit.value}</span>}
            />
          </div>
          <div className="p-col-12 p-md-9" style={{ padding: 0 }} />
          <div
            className="p-col-12 p-md-3 text-right"
            style={{ padding: '1em' }}
          >
            <FormSubmitBtn
              disabled={activity}
              onSubmit={props.handleAddItem}
              label="Add"
              style={{
                padding: '4px 0',
                borderRadius: 4,
                margin: 0,
                width: '100%'
              }}
            />
          </div>
          <div className="p-col-12" style={{ padding: '1em' }}>
            <div style={{ overflowY: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Volume</TableCell>
                    <TableCell className="no-border">Category</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.commodities.length ? (
                    props.commodities.map((item, index) => {
                      return (
                        <TableRow key={`commodity-${index + 1}`}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>
                            {item.weight} {weightUnit.value}
                          </TableCell>
                          <TableCell>
                            {item.length} x {item.width} x {item.height}{' '}
                            {measurementUnit.value}
                          </TableCell>
                          <TableCell className="no-border">
                            {item.itemType.name}
                          </TableCell>
                          <TableCell className="no-border">
                            <img
                              style={{ cursor: 'pointer' }}
                              onClick={() => props.handleDeleteItem(index)}
                              alt="Remove item"
                              src={require('../../static/icons/delete-icon.png')}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                      <TableRow>
                        <TableCell
                          className="no-border"
                          colSpan={6}
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
          </div>
          <div
            className={getRate ? "p-col-12 p-md-6" : "p-col-12 p-md-9"}
            style={{
              padding: '1em',
              paddingTop: '2em',
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
                    paddingTop: '1em',
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
                    {/* {props.currency.value} {rates.price.toFixed(2)} */}
                    {props.currency.value} {rates.minPrice.toFixed(2)}
                    {' '}-{' '}
                    {props.currency.value} {rates.maxPrice.toFixed(2)}
                  </span>
                  {promoObject._id ? (
                    <span
                      style={{
                        fontSize: '1.3rem',
                        color: getPrimaryColors('error')
                      }}
                    >
                      {props.currency.value}{' '}
                      {getDiscountedPrice(
                        rates.price,
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
            <FormSubmitBtn
              label="Get Rate"
              disabled={activity}
              onSubmit={props.handleEstimateOrder}
              style={{
                width: '100%',
                padding: '4px 1rem',
                borderRadius: 4,
                margin: 0
              }}
            />
          </div>
          {getRate ? (
            <div
              className="p-col-12 p-md-6 p-lg-3"
              style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <FormSubmitBtn
                label="Add Request"
                disabled={activity}
                onSubmit={props.handleAddRequest}
                style={{
                  width: '100%',
                  padding: '4px 1rem',
                  borderRadius: 4,
                  margin: 0
                }}
              />
            </div>
          ) : null}

        </div>
      </div>
      <Footer bgImagePath="/assets/images/footer-bg.png" />
      <Dialog
        maxWidth="lg"
        className="full-width-dialog full-height-dialog"
        open={props.isDialogOpen}
        onClose={handleDialogVisibility}
      >
        <SelectLocationReusableComponent
          editable={true}
          addressKey="address"
          ref={props.mapComponentRef}
          heading={dialogData.heading}
          location={props.isDialogOpen ? props[dialogData.name].location : []}
          handleMapClick={props.handleDialogCallback}
          handleSelectPlace={props.handleDialogCallback}
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
    </div>
  );
};

GetRatesComponent.propTypes = {
  getRate: PropTypes.bool,
  activity: PropTypes.bool,
  rates: PropTypes.shape(),
  pickup: PropTypes.shape(),
  errors: PropTypes.shape(),
  itemName: PropTypes.string,
  dropoff: PropTypes.shape(),
  currency: PropTypes.shape(),
  itemType: PropTypes.shape(),
  itemWidth: PropTypes.string,
  itemLength: PropTypes.string,
  itemWeight: PropTypes.string,
  itemHeight: PropTypes.string,
  isDialogOpen: PropTypes.bool,
  handleChange: PropTypes.func,
  handleAddItem: PropTypes.func,
  weightUnit: PropTypes.shape(),
  dialogData: PropTypes.shape(),
  itemQuantity: PropTypes.string,
  promoObject: PropTypes.shape(),
  mapComponentRef: PropTypes.func,
  deliveryType: PropTypes.shape(),
  handleDeleteItem: PropTypes.func,
  measurementUnit: PropTypes.shape(),
  handleEstimateOrder: PropTypes.func,
  handleDialogCallback: PropTypes.func,
  pickupDropOffMessage: PropTypes.string,
  handleDialogVisibility: PropTypes.func,
  handlePreferencesChange: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.shape()),
  commodities: PropTypes.arrayOf(PropTypes.shape()),
  handleLoginModalOpen: PropTypes.func
};

export default GetRatesComponent;
