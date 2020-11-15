/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
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
  getContactDetails,
  getPickupDropoffDetails
} from '../../../utils/request-details.util';
import {
  dateTimeFormat,
  dateFormat
} from '../../../constants/project-constants';
import Page from '../../../components/layout/Page';
import ChatComponent from '../../../components/chat/ChatComponent';
import { isEmpty, getPrimaryColors } from '../../../utils/functions';
import { convertWeight, convertMeasurement } from '../../../utils/unit.util';
import GoogleMapsComponent from '../../../components/map/GoogleMapsComponent';
import TooltipComponent from '../../../components/TooltipComponent';
import routes from '../../../constants/route-constants';
// import { ExportCSV } from '../../../components/ExportCSVComponent';

const MySpacesDetailsComponent = props => {
  const { details, activity, handleDialogClose, handleChange, user } = props;
  const pickupTime = details.pickupTime || {};
  const deliveryTime = details.deliveryTime || {};
  const rating = details.rating || {};
  const transporter = details.transporter || {};
  const vehicle = details.vehicle || {};
  const vehicleData = getVehicleData(vehicle);
  const timeLogs = details.timeLogs ? Object.keys(details.timeLogs) : [];
  const { open: isOpen, comp } = props.dialogData;
  const Comp = props.handleGetDialogComponent(comp);
  const actions = getActions(details, details.status);
  const actionsKeys = Object.keys(actions);
  const contactDetails = getContactDetails(details);
  const pickupDropoffDetails = getPickupDropoffDetails(details);
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
        <span>Space Detail</span>
        {/* <ExportCSV
          csvData={props.detailsExcelData}
          fileName={'requestDetails'}
        /> */}
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
                  {details.status === 'pending' ? 'waiting' : details.status}
                </span>
              </span>
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
                  <div>
                    <img
                      alt=""
                      src={require('../../../static/icons/icon-Pickup.png')}
                    />
                    <span>{pickupDropoffDetails.pickup}</span>
                  </div>
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
                      <span>{pickupDropoffDetails.dropoff}</span>
                    </div>
                  </div>
                ) : (
                  <div className="subheading-big" style={{ padding: '1em' }}>
                    <p>Dropoff</p>
                    <div>
                      <img
                        alt=""
                        src={require('../../../static/icons/icon-DropOff.png')}
                      />
                      <span>{pickupDropoffDetails.dropoff}</span>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="p-col-12 p-lg-6"
                style={{
                  padding: 0,
                  display: 'flex'
                  // alignItems:
                  //   details.status === 'pending' ? 'flex-start' : 'center'
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
                      <TooltipComponent title="Flexible Pickup Day">
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
                  backgroundColor: '#fff'
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
                      <TooltipComponent title="Flexible Delivery Day">
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
                {details.status !== 'pending' ? (
                  <>
                    <div
                      className="subheading"
                      style={{ padding: '0.5em', paddingTop: 0 }}
                    >
                      <p>Pickup From</p>
                      <Link
                        to={`/${routes.typeUser}/${routes.profile}/${details.user._id}`}
                      >
                        <p>{contactDetails.pickup.name}</p>
                      </Link>
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
                        {/* <p>Contact</p> */}
                        <img
                          alt=""
                          src={require('../../../static/icons/contact-icon.png')}
                          style={{ padding: '16px 5px' }}
                        />
                        <p>+{contactDetails.pickup.number}</p>
                      </div>
                    </a>
                  </>
                ) : null}
              </div>
              <div
                className="p-col-12 p-lg-6"
                style={{
                  padding: 0,
                  backgroundColor: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                {details.status !== 'pending' ? (
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
                        {/* <p>Contact</p> */}
                        <img
                          alt=""
                          src={require('../../../static/icons/contact-icon.png')}
                          style={{ padding: '16px 5px' }}
                        />
                        <p>+{contactDetails.deliver.number}</p>
                      </div>
                    </a>
                  </div>
                ) : null}
                <div
                  style={{
                    padding: '0 1em 1em 1em',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <div className="subheading">
                    <p>Price</p>
                    <p style={{ fontFamily: 'Exo2-Bold' }}>
                      {details.rates && details.rates.price
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
                        <span>
                          {transporter.firstName} {transporter.lastName}
                        </span>
                      </p>
                      <p>
                        Contact : <span>+{transporter.mobile}</span>
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
                  <div
                    key={`time-log-${i + 1}`}
                    className="tracking-log"
                    style={{ padding: '0.5em 0' }}
                  >
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
                  Rating
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

        {!isEmpty(actions) ? (
          <div className="p-col-12 actions-details">
            {actions.accept ? (
              <button
                disabled={activity}
                className="request-details-btn"
                onClick={() =>
                  handleChange({
                    dialogData: {
                      open: true,
                      comp: 'accept'
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
                Accept
              </button>
            ) : null}
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
          details={details}
          cancelType="user"
          ratingKey="rating"
          feedbackTo="transporter"
          handleDialogClose={handleDialogClose}
          handleSetDetails={props.handleSetDetails}
        />
      </Dialog>
    </Page>
  );
};

MySpacesDetailsComponent.defaultProps = {
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

MySpacesDetailsComponent.propTypes = {
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
  dialogData: PropTypes.shape({ open: PropTypes.bool, comp: PropTypes.string })
};

export default MySpacesDetailsComponent;
