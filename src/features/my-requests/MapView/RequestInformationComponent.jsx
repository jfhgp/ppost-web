import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import Page from '../../../components/layout/Page';
import { authClass } from '../../../utils/auth.util';
import { Link } from 'react-router-dom';
import {
  getPrice,
  getContactDetails,
  getPickupDropoffDetails
} from '../../../utils/request-details.util';
import {
  dateFormat
} from '../../../constants/project-constants';
import TooltipComponent from '../../../components/TooltipComponent';
import routes from '../../../constants/route-constants';

const RequestInformationComponent = props => {
  const { onInputChange, activity, details } = props;
  const pickupTime = details.pickupTime || {};
  const user = authClass.getUser || {};
  const deliveryTime = details.deliveryTime || {};
  const contactDetails = getContactDetails(details);
  const pickupDropoffDetails = getPickupDropoffDetails(details);
  console.log("This is the all props i receive", props)

  return (

    <Page className="m-d-add-page" activity={activity} noActivity>
      <div className="page-title">
        <span>Request Details</span>
      </div>
      <div className="p-grid" style={{ margin: 0, padding: '1rem' }}>
        <div
          className="p-col-12 p-md-12 p-lg-12 p-xl-12"
          style={{ padding: '1rem', display: 'flex' }}
        >
          <div className="basic-details-div request-details">
            <div>
              <span>Order ID : {details.orderNumber}</span>
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
      </div>
    </Page>
  );
};

RequestInformationComponent.propTypes = {
  email: PropTypes.string,
  onSubmit: PropTypes.func,
  activity: PropTypes.bool,
  mobile: PropTypes.string,
  errors: PropTypes.shape(),
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  onInputChange: PropTypes.func
};

export default RequestInformationComponent;
