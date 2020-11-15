import React from 'react';
import PropTypes from 'prop-types';
import FormInputS from '../../../components/form/FormInputS';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';
import { Link } from 'react-router-dom';

import moment from 'moment';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Dialog
} from '@material-ui/core';
import StarRatingComponent from 'react-star-rating-component';

import {
  getPrice,
  getActions,
  getVehicleData,
  requestInActive,
  getContactDetails
} from '../../../utils/request-details.util';
import {
  dateFormat,
  dateTimeFormat
} from '../../../constants/project-constants';
import Page from '../../../components/layout/Page';
import ChatComponent from '../../../components/chat/ChatComponent';
import { isEmpty, getPrimaryColors } from '../../../utils/functions';
import { convertWeight, convertMeasurement } from '../../../utils/unit.util';
import GoogleMapsComponent from '../../../components/map/GoogleMapsComponent';
import SelectLocationReusableComponent from '../../../components/map/SelectLocationReusableComponent';
import TooltipComponent from '../../../components/TooltipComponent';
import routes from '../../../constants/route-constants';
import { classNames, getDiscountedPrice } from '../../../utils/functions';

const OrdersDetailsComponent = props => {
  const { details, activity, errors, dialogData, locationDialogData, onInputChange, handleDialogClose, handleChange, user, handleDialogVisibility } = props;
  const pickupTime = details.pickupTime || {};
  const deliveryTime = details.deliveryTime || {};
  const rating = details.rating || {};
  const transporter = details.transporter || {};
  const vehicle = details.vehicle || {};
  const vehicleData = getVehicleData(vehicle);
  const timeLogs = details.timeLogs ? Object.keys(details.timeLogs) : [];
  const { open: isOpen, comp } = props.dialogData;
  const Comp = props.handleGetDialogComponent(comp);
  const actions = getActions(details, user, details.status);
  const actionsKeys = Object.keys(actions);
  const contactDetails = getContactDetails(details);
  console.log("hello", props.messages)
  return (
    <Page activity={activity} className="u-r-details-container" noActivity>
      <div
        className="page-title"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        <span>Request Detail</span>
        {props.showEditButton(details.status) && (
          <p style={{ display: 'flex' }}>
            <img alt="" src={require('../../../static/icons/edit-icon.png')} />
            <Link
              to={`/${routes.typeUser}/${routes.orders}/${routes.orderEdit}/${details._id}`
              }
            >
              Edit Request
            </Link>
          </p>
        )}
        <div>
          <Link to={`/${routes.typeUser}/${routes.orders}/${routes.orderDuplicate}/${details._id}`
          }>
            <FormSubmitBtn
              label="Duplicate request"
              // onSubmit={props.onSubmit}
              disabled={props.activity}
            />
          </Link>
        </div>
      </div>
      <div className="p-grid" style={{ margin: 0, padding: '1rem' }}>
        <div
          className="p-col-12 p-md-12 p-lg-12 p-xl-6"
          style={{ padding: '1rem', display: 'flex' }}
        >
          <div className="basic-details-div request-details">
            <div>
              <span>Order ID : {details.orderNumber}</span>
              <span>
                Status :{' '}
                <span>
                  {details.status === 'pending' ? 'Waiting' : details.status}
                </span>
              </span>
              {props.locationUpdate ? (
                <div>
                  <FormSubmitBtn
                    label="Get Rates"
                    onSubmit={props.handleGetRates}
                    disabled={props.activity}
                  />
                </div>
              ) : null}
            </div>
            <div
              className="p-grid"
              style={{
                margin: 0,
                padding: '0',
                flexGrow: 1
              }}
            >
              <div className="p-col-12 p-lg-6" style={{ padding: 0 }}>
                <div className="subheading-big" style={{ padding: '1em' }}>
                  <p>Pickup</p>
                  {details.status === "accepted" ? (
                    <FormSubmitBtn
                      label="Change Pickup"
                      style={{ marginBottom: 10 }}
                      onSubmit={() =>
                        handleDialogVisibility(true, {
                          pickup: details.pickup,
                          heading: 'Select Pickup',
                          name: 'pickup'
                        })
                      }
                      disabled={props.activity}
                    />
                    // <img
                    //   alt=""
                    //   src={require('../../../static/icons/edit-icon.png')}
                    //   onClick={() =>
                    //     handleDialogVisibility(true, {
                    //       pickup: details.pickup,
                    //       heading: 'Select Pickup',
                    //       name: 'pickup'
                    //     })
                    //   }
                    // />
                  ) : null}
                  <div
                    className={classNames([
                      'pickup-dropoff-input-div',
                      ['form-error', errors.dropoff]
                    ])}>

                    <img
                      alt=""
                      src={require('../../../static/icons/icon-Pickup.png')}
                    />
                    <span>{props.pickup.address ? props.pickup.address : details.pickup.address}</span>
                  </div>
                  {errors.pickup ? (
                    <small>{props.pickupDropOffMessage}</small>
                  ) : null}
                </div>
              </div>
              <div
                className="p-col-12 p-lg-6"
                style={{ padding: '0', backgroundColor: '#fff' }}
              >
                {details.status === 'picked' ? (
                  <div
                    className="subheading-big"
                    style={{ backgroundColor: '#f0ad4e', padding: '1em' }}
                  >
                    <p>Dropoff</p>
                    <div>
                      <img
                        alt=""
                        src={require('../../../static/icons/icon-DropOff.png')}
                      />
                      <span>{details.dropoff.address}</span>
                    </div>
                  </div>
                ) : (
                    <div className="subheading-big" style={{ padding: '1em' }}>
                      <p>Dropoff</p>
                      {details.status === "accepted" ? (
                        <FormSubmitBtn
                          label="Change Dropoff"
                          style={{ marginBottom: 10 }}
                          onSubmit={() => {
                            handleDialogVisibility(true, {
                              dropoff: details.dropoff,
                              heading: 'Select Dropoff',
                              name: 'dropoff'
                            })
                          }}
                          disabled={props.activity}
                        />
                        // <img
                        //   alt=""
                        //   src={require('../../../static/icons/edit-icon.png')}
                        //   onClick={() => {
                        //     handleDialogVisibility(true, {
                        //       dropoff: details.dropoff,
                        //       heading: 'Select Dropoff',
                        //       name: 'dropoff'
                        //     })
                        //   }}
                        // />
                      ) : null}
                      <div
                        className={classNames([
                          'pickup-dropoff-input-div',
                          ['form-error', errors.dropoff]
                        ])}>
                        <img
                          alt=""
                          src={require('../../../static/icons/icon-DropOff.png')}
                        />
                        <span>{props.dropoff.address ? props.dropoff.address : details.dropoff.address}</span>


                      </div>
                      {errors.dropoff ? (
                        <small>{props.pickupDropOffMessage}</small>
                      ) : null}
                    </div>
                  )}
              </div>
              <div
                className="p-col-12 p-lg-6"
                style={{
                  padding: 0,
                  display: 'flex'
                }}
              >
                <div
                  style={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 1em'
                  }}
                >
                  <div className="subheading">
                    <p>Pickup Date</p>
                    <p>
                      {details.pickupDate
                        ? moment(details.pickupDate).format(dateFormat)
                        : '-'}
                    </p>
                    {details.flexibleDate ? (
                      <TooltipComponent title="Flexible pickup day and time">
                        <p
                          style={{
                            visibility: 'visible',
                            paddingBottom: '1em'
                          }}
                        >
                          +/- One day
                        </p>
                      </TooltipComponent>
                    ) : (
                        <p style={{ visibility: 'hidden', lineHeight: '1em' }}>
                          a
                        </p>
                      )}
                  </div>
                  {details.status === 'accepted' ? (
                    <div
                      className="subheading"
                      style={{
                        backgroundColor: '#f0ad4e',
                        paddingLeft: 10,
                        paddingRight: 10
                      }}
                    >
                      <p>Pickup Time</p>
                      <p>
                        {pickupTime.from} - {pickupTime.to}
                      </p>
                    </div>
                  ) : (
                      <div className="subheading">
                        <p>Pickup Time</p>
                        <p>
                          {pickupTime.from} - {pickupTime.to}
                        </p>
                      </div>
                    )}
                </div>
              </div>
              <div
                className="p-col-12 p-lg-6"
                style={{
                  padding: 0,
                  backgroundColor: '#fff',
                  display: 'flex'
                }}
              >
                <div
                  style={{
                    flexGrow: 1,
                    padding: '0 1em',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <div className="subheading">
                    <p>Delivery Date</p>
                    <p>
                      {details.deliveryDate
                        ? moment(details.deliveryDate).format(dateFormat)
                        : '-'}
                    </p>
                    {details.flexibleDeliveryDate ? (
                      <TooltipComponent title="Flexible delivery day and time">
                        <p
                          style={{
                            visibility: 'visible',
                            paddingBottom: '1em'
                          }}
                        >
                          +/- One day
                        </p>
                      </TooltipComponent>
                    ) : (
                        <p style={{ visibility: 'hidden', lineHeight: '1em' }}>
                          a
                        </p>
                      )}
                  </div>
                  {details.status === 'picked' ? (
                    <div
                      className="subheading"
                      style={{
                        backgroundColor: '#f0ad4e',
                        paddingLeft: 10,
                        paddingRight: 10
                      }}
                    >
                      <p>Delivery Time</p>
                      <p>
                        {deliveryTime.from} - {deliveryTime.to}
                      </p>
                    </div>
                  ) : (
                      <div className="subheading">
                        <p>Delivery Time</p>
                        <p>
                          {deliveryTime.from} - {deliveryTime.to}
                        </p>
                      </div>
                    )}
                </div>
              </div>
              <div
                className="p-col-12 p-lg-6"
                style={{
                  padding: '0 0.5em 0.5em 0.5em',
                  display: 'flex',
                  // alignItems: 'flex-end',
                  justifyContent: 'space-between'
                }}
              >
                <div
                  className="subheading"
                  style={{ padding: '0.5em', paddingTop: 0 }}
                >
                  <p>Pickup From</p>
                  <p>{contactDetails.pickup.name}</p>
                </div>
                <a
                  href={`tel:+${contactDetails.pickup.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-padding"
                >
                  <div
                    className="subheading"
                    style={{
                      padding: '0.5em',
                      paddingTop: 0,
                      display: 'flex',
                      alignItems: 'flex-start'
                    }}
                  >
                    {/* <p>Contact</p>
                    <p>+{contactDetails.pickup.number}</p> */}
                    <img
                      alt=""
                      src={require('../../../static/icons/contact-icon.png')}
                      style={{ padding: '16px 5px' }}
                    />
                    <p>+{contactDetails.pickup.number}</p>
                  </div>
                </a>
              </div>
              <div
                className="p-col-12 p-lg-6"
                style={{
                  padding: 0,
                  backgroundColor: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column'
                }}
              >
                <div
                  style={{
                    padding: '0 0.5em 0.5em 0.5em',
                    display: 'flex',
                    // alignItems: 'flex-end',
                    justifyContent: 'space-between'
                  }}
                >
                  <div
                    className="subheading"
                    style={{ padding: '0.5em', paddingTop: 0 }}
                  >
                    <p>Deliver To</p>
                    <p>{contactDetails.deliver.name}</p>
                  </div>
                  <a
                    href={`tel:+${contactDetails.deliver.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-padding"
                  >
                    <div
                      className="subheading"
                      style={{
                        padding: '0.5em',
                        paddingTop: 0,
                        display: 'flex',
                        alignItems: 'flex-start'
                      }}
                    >
                      {/* <p>Contact</p>
                    <p>+{contactDetails.deliver.number}</p> */}
                      <img
                        alt=""
                        src={require('../../../static/icons/contact-icon.png')}
                        style={{ padding: '16px 5px' }}
                      />
                      <p>+{contactDetails.deliver.number}</p>
                    </div>
                  </a>
                </div>
                <div
                  style={{
                    // flexGrow: 1,
                    padding: '0 1em 1em',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <div className="subheading">
                    <p>Price</p>
                    <p style={{ fontFamily: 'Exo2-Bold' }}>
                      {details.rates.price
                        ? `${user.config.currency} ${getPrice(
                          details.rates.price,
                          user.userType
                        )}`
                        : '-'}
                    </p>
                  </div>
                  <div className="subheading">
                    <p>Delivery Type</p>
                    <p>{details.deliveryType}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="p-col-12 p-md-12 p-lg-12 p-xl-6"
          style={{ padding: '1rem' }}
        >
          {props.isChangeLog ? (
            <div className="p-grid">
              <p className="heading" style={{ marginBottom: 10, paddingLeft: 5 }}>Confirmation Code</p>
              <div className="p-col-8">
                <FormInputS
                  name="confirmationCode"
                  value={props.confirmationCode}
                  onChange={onInputChange}
                  placeholder="Confirmation Code"
                />
              </div>
              <div className="p-col-4">
                <FormSubmitBtn
                  label="Submit"
                  style={{ width: "100%", height: "100%" }}
                  onSubmit={props.onSubmitConfirmationCode}
                  disabled={props.activity}
                />
              </div>
            </div>
          ) : null}
          <div className="basic-details-div transporter-details">
            <div>
              <span>Transporter Details</span>
            </div>
            <div className="p-grid" style={{ margin: 0, padding: '0.5em' }}>
              <div className="p-col-12 p-lg-6" style={{ padding: '0.5em' }}>
                <div className="subheading-big">
                  <p className="color-secondary">Transporter</p>
                  {transporter._id ? (
                    <>
                      <p>
                        Name :{' '}
                        <Link
                          to={`/${routes.typeTransporter}/${routes.profile}/${transporter._id}`}
                        >
                          <span>
                            {transporter.firstName} {transporter.lastName}
                          </span>
                        </Link>
                      </p>
                      <p>
                        <a
                          href={`tel:+${transporter.mobile}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-padding"
                        >
                          <div
                            className="subheading"
                            style={{
                              paddingTop: 0,
                              display: 'flex',
                              alignItems: 'flex-start'
                            }}
                          >
                            {/* <p>Contact</p> */}
                            <img
                              alt=""
                              src={require('../../../static/icons/contact-icon.png')}
                              style={{ padding: '16px 5px' }}
                            />
                            <p>+{transporter.mobile}</p>
                          </div>
                        </a>
                      </p>
                    </>
                  ) : (
                      <p>Unassigned</p>
                    )}
                </div>
              </div>
              {vehicle._id ? (
                <div className="p-col-12 p-lg-6" style={{ padding: '0.5em' }}>
                  <div className="subheading-big">
                    <p className="color-secondary">Vehicle</p>
                    {Object.keys(vehicleData).map((key, i) => (
                      <div key={`vehicle-data-${i + 1}`}>
                        <span>{key}</span>
                        <span style={{ margin: '0 3px' }}> : </span>
                        <span>{vehicleData[key]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div
            className="basic-details-div tracking-details"
            style={{ marginTop: '2rem' }}
          >
            <div>
              <span>Summary</span>
            </div>
            <div style={{ padding: '0.5em 1em' }}>
              <div className="tracking-log" style={{ padding: '0.5em 0' }}>
                <span
                  style={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                >
                  Request on:
                </span>{' '}
                {moment(details.createdAt).format(dateTimeFormat)}
              </div>
              {timeLogs.map((log, i) => {
                return (
                  <div key={`time-log-${i + 1}`} style={{ padding: '0.5em 0' }}>
                    <span
                      style={{
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }}
                    >
                      {`${log} on: `}
                    </span>{' '}
                    {moment(timeLogs[log]).format(dateTimeFormat)}
                  </div>
                );
              })}
            </div>
          </div>
          {/* ================ */}
          {!isEmpty(actions) ? (
            <div className="p-col-12 actions-details" style={{ padding: 0 }}>
              {actions.message ? (
                <button
                  onClick={() => props.handleToggleChat(true)}
                  disabled={activity}
                  className="request-details-btn"
                  style={{
                    margin: '0.5em',
                    marginLeft: 0,
                    backgroundColor:
                      (actionsKeys.indexOf('message') + 1) % 2 === 0
                        ? getPrimaryColors('primary')
                        : getPrimaryColors('secondary')
                  }}
                >
                  Messages
                </button>
              ) : null}
              {actions.reschedule ? (
                <button
                  disabled={activity}
                  className="request-details-btn"
                  onClick={() =>
                    handleChange({
                      dialogData: {
                        open: true,
                        comp: 'reschedule'
                      }
                    })
                  }
                  style={{
                    backgroundColor:
                      (actionsKeys.indexOf('cancel') + 1) % 2 === 0
                        ? getPrimaryColors('primary')
                        : getPrimaryColors('secondary')
                  }}
                >
                  Request Reschedule
                </button>
              ) : null}
            </div>
          ) : null}
          {/* ================= */}
        </div>
        {rating._id ? (
          <div className="p-col-12" style={{ padding: '1rem' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                padding: '0.5em 1em',
                border: '1px solid',
                borderColor: getPrimaryColors('secondary')
              }}
            >
              <div style={{ padding: '0.5em 0', flexGrow: 1 }}>
                <p
                  style={{
                    margin: 0,
                    color: getPrimaryColors('primary'),
                    fontWeight: 'bold',
                    fontSize: '1.2em'
                  }}
                >
                  Overall
                </p>
                <div style={{ fontSize: '1.5em' }}>
                  <StarRatingComponent
                    name="customerRating"
                    value={rating.rating}
                    starColor={getPrimaryColors('secondary')}
                    emptyStarColor="#888"
                    editing={false}
                  />
                </div>
              </div>
              <div style={{ padding: '0.5em 0', flexGrow: 1 }}>
                <p
                  style={{
                    margin: 0,
                    color: getPrimaryColors('primary'),
                    fontWeight: 'bold',
                    fontSize: '1.2em'
                  }}
                >
                  Attitude
                </p>
                <div style={{ fontSize: '1.5em' }}>
                  <StarRatingComponent
                    name="customerRating"
                    value={rating.attitude}
                    starColor={getPrimaryColors('secondary')}
                    emptyStarColor="#888"
                    editing={false}
                  />
                </div>
              </div>
              <div style={{ padding: '0.5em 0', flexGrow: 1 }}>
                <p
                  style={{
                    margin: 0,
                    color: getPrimaryColors('primary'),
                    fontWeight: 'bold',
                    fontSize: '1.2em'
                  }}
                >
                  Timing
                </p>
                <div style={{ fontSize: '1.5em' }}>
                  <StarRatingComponent
                    name="customerRating"
                    value={rating.timing}
                    starColor={getPrimaryColors('secondary')}
                    emptyStarColor="#888"
                    editing={false}
                  />
                </div>
              </div>
              <div style={{ padding: '0.5em 0', flexGrow: 1 }}>
                <p
                  style={{
                    margin: 0,
                    color: getPrimaryColors('primary'),
                    fontWeight: 'bold',
                    fontSize: '1.2em'
                  }}
                >
                  Delivery
                </p>
                <div style={{ fontSize: '1.5em' }}>
                  <StarRatingComponent
                    name="customerRating"
                    value={rating.delivery}
                    starColor={getPrimaryColors('secondary')}
                    emptyStarColor="#888"
                    editing={false}
                  />
                </div>
              </div>
              <div style={{ padding: '0.5em 0', flexGrow: 4 }}>
                <p
                  style={{
                    margin: 0,
                    color: getPrimaryColors('primary'),
                    fontWeight: 'bold',
                    fontSize: '1.2em'
                  }}
                >
                  Comments
                </p>
                <span
                  style={{
                    color: getPrimaryColors('primary'),
                    display: 'inline-block',
                    marginTop: '0.5em'
                  }}
                >
                  {rating.comment}
                </span>
              </div>
            </div>
          </div>
        ) : null}
        {details.status.indexOf('cancelled') !== -1 ? (
          <div className="p-col-12" style={{ padding: '1rem' }}>
            <div
              style={{
                padding: '1em',
                border: '1px solid',
                borderColor: getPrimaryColors('error')
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: getPrimaryColors('error'),
                  fontWeight: 'bold',
                  fontSize: '1.2em'
                }}
              >
                Cancellation Reason
              </p>
              <span
                style={{
                  color: 'gray',
                  display: 'inline-block',
                  paddingTop: '0.5em'
                }}
              >
                {details.cancellationReason}
              </span>
            </div>
          </div>
        ) : null}
        <div className="p-col-12" style={{ padding: '1rem' }}>
          <span className="heading">Location</span>
          <div className="location-details">
            {details._id ? (
              requestInActive.some(
                item => item.indexOf(details.status) !== -1
              ) ? (
                  details.staticMap ? (
                    <img
                      src={details.staticMap}
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                      <GoogleMapsComponent
                        showMarkers
                        mapType="static"
                        transporterLocation={
                          actions.showTransporterOnMap && transporter.location
                            ? transporter.location
                            : []
                        }
                        mapElement={<div style={{ height: '100%' }} />}
                        containerElement={<div style={{ height: 350 }} />}
                        coordinates={[
                          details.pickup.location,
                          details.dropoff.location
                        ]}
                      />
                    )
                ) : (
                  <GoogleMapsComponent
                    showMarkers
                    mapType="static"
                    transporterLocation={
                      actions.showTransporterOnMap && transporter.location
                        ? transporter.location
                        : []
                    }
                    mapElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: 350 }} />}
                    coordinates={[
                      details.pickup.location,
                      details.dropoff.location
                    ]}
                  />
                )
            ) : null}
          </div>
        </div>
        <div className="p-col-12 commodities-table" style={{ padding: '1rem' }}>
          <span className="heading">Parcel Info</span>
          <div style={{ marginTop: '2rem', overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Volume</TableCell>
                  <TableCell>Item Images</TableCell>
                  <TableCell>Picked</TableCell>
                  <TableCell className="no-border">Delivered</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {details.commodities.length ? (
                  details.commodities.map((item, index) => {
                    return (
                      <TableRow key={`commodity-${index + 1}`}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          {convertWeight(
                            details.config.weightUnit,
                            user.config.weightUnit,
                            item.weight
                          )}{' '}
                          ({user.config.weightUnit})
                        </TableCell>
                        <TableCell>
                          {convertMeasurement(
                            details.config.measurementUnit,
                            user.config.measurementUnit,
                            item.length
                          )}
                          x
                          {convertMeasurement(
                            details.config.measurementUnit,
                            user.config.measurementUnit,
                            item.width
                          )}
                          x
                          {convertMeasurement(
                            details.config.measurementUnit,
                            user.config.measurementUnit,
                            item.height
                          )}{' '}
                          ({user.config.measurementUnit})
                        </TableCell>
                        <TableCell>
                          {item.images.map((image, i) => (
                            <img
                              onClick={() =>
                                props.handlePicturesClick(item.images)
                              }
                              key={`item-image-${i + 1}`}
                              className="img"
                              src={image}
                            />
                          ))}
                        </TableCell>
                        <TableCell>
                          {details.pickupImages.map((image, i) => (
                            <img
                              onClick={() =>
                                props.handlePicturesClick(details.pickupImages)
                              }
                              key={`item-image-${i + 1}`}
                              className="img"
                              src={image}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="no-border">
                          {details.deliveredImages.map((image, i) => (
                            <img
                              onClick={() =>
                                props.handlePicturesClick(
                                  details.deliveredImages
                                )
                              }
                              key={`item-image-${i + 1}`}
                              className="img"
                              src={image}
                            />
                          ))}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                    <TableRow>
                      <TableCell className="no-border text-center" colSpan={7}>
                        No Items
                    </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </div>
        </div>
        {!isEmpty(actions) ? (
          <div className="p-col-12 actions-details">
            {actions.cancel ? (
              <button
                disabled={activity}
                className="request-details-btn"
                onClick={() =>
                  handleChange({
                    dialogData: {
                      open: true,
                      comp: 'cancel'
                    }
                  })
                }
                style={{
                  backgroundColor:
                    (actionsKeys.indexOf('cancel') + 1) % 2 === 0
                      ? getPrimaryColors('primary')
                      : getPrimaryColors('secondary')
                }}
              >
                Cancel
              </button>
            ) : null}
            {actions.feedback ? (
              <button
                disabled={activity}
                className="request-details-btn"
                onClick={() =>
                  handleChange({
                    dialogData: {
                      open: true,
                      comp: 'feedback'
                    }
                  })
                }
                style={{
                  backgroundColor:
                    (actionsKeys.indexOf('feedback') + 1) % 2 === 0
                      ? getPrimaryColors('primary')
                      : getPrimaryColors('secondary')
                }}
              >
                Rate Transporter
              </button>
            ) : null}
            {/* {actions.message ? (
              <button
                onClick={() => props.handleToggleChat(true)}
                disabled={activity}
                className="request-details-btn"
                style={{
                  backgroundColor:
                    (actionsKeys.indexOf('message') + 1) % 2 === 0
                      ? getPrimaryColors('primary')
                      : getPrimaryColors('secondary')
                }}
              >
                Messages
              </button>
            ) : null} */}
            {actions.contact ? (
              <button
                disabled={activity}
                className="request-details-btn"
                style={{
                  backgroundColor:
                    (actionsKeys.indexOf('contact') + 1) % 2 === 0
                      ? getPrimaryColors('primary')
                      : getPrimaryColors('secondary')
                }}
              >
                Contact Support
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
      <ChatComponent
        {...props}
        user={user}
        showChat={props.showChat}
        messages={props.messages}
        onClick={props.handleToggleChat}
        sendMessage={props.handleSendMessage}
        canSendMessage={actions.canSendMessage}
      />
      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        aria-labelledby="actions-dialog"
        className="u-r-d-actions-dialog"
      >
        <Comp
          {...props}
          details={details}
          cancelType="user"
          ratingKey="rating"
          feedbackTo="transporter"
          handleDialogClose={handleDialogClose}
          handleSetDetails={props.handleSetDetails}
        />
      </Dialog>
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
          heading={locationDialogData.heading}
          location={
            props.isDialogOpen
              ? props[locationDialogData.name].location
              : []
          }
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
    </Page >
  );
};

OrdersDetailsComponent.defaultProps = {
  myDrivers: [],
  myVehicles: [],
  details: {
    type: '-',
    orderNumber: '-',
    subOrder: false,
    status: '-',
    deliveryType: '-',
    pickupDate: '',
    deliveryDate: '',
    commodities: [],
    routes: [],
    rating: {},
    pickup: { address: '-', location: [0, 0] },
    dropoff: { address: '-', location: [0, 0] },
    timeLogs: {},
    pickupImages: [],
    deliveredImages: [],
    pickupTime: {},
    deliveryTime: {},
    rates: { price: '' },
    user: {
      firstName: '-',
      lastName: ''
    },
    contact: {
      name: '-',
      number: ''
    }
  }
};

OrdersDetailsComponent.propTypes = {
  user: PropTypes.shape(),
  activity: PropTypes.bool,
  showChat: PropTypes.bool,
  handleChange: PropTypes.func,
  handleSetDetails: PropTypes.func,
  handleToggleChat: PropTypes.func,
  handleDialogClose: PropTypes.func,
  handleSendMessage: PropTypes.func,
  handlePicturesClick: PropTypes.func,
  handleGetDialogComponent: PropTypes.func,
  showEditButton: PropTypes.func,
  messages: PropTypes.arrayOf(PropTypes.object),
  details: PropTypes.shape({
    contact: PropTypes.shape(),
    pickup: PropTypes.shape(),
    dropoff: PropTypes.shape(),
    rating: PropTypes.shape(),
    _id: PropTypes.string,
    status: PropTypes.string,
    cancellationReason: PropTypes.string,
    deliveryType: PropTypes.string,
    pickupDate: PropTypes.string,
    subOrder: PropTypes.bool,
    commodities: PropTypes.arrayOf(PropTypes.shape()),
    routes: PropTypes.arrayOf(PropTypes.shape())
  }),
  dialogData: PropTypes.shape({ open: PropTypes.bool, comp: PropTypes.string }),
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string })
  })
};

export default OrdersDetailsComponent;
