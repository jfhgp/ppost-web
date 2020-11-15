import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import moment from 'moment';
import StarRatingComponent from 'react-star-rating-component';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  getVehicleData,
  getContactDetails,
  getPickupDropoffDetails,
  getPrice,
  requestInActive,
} from '../../../../utils/request-details.util';
import {
  dateFormat,
  dateTimeFormat,
} from '../../../../constants/project-constants';
import Header from '../../../../containers/Header';
import { withStore } from '../../../../utils/store.util';
import ApiCalls from '../../../../service/RequestHandler';
import { getPrimaryColors } from '../../../../utils/functions';
import GoogleMapsComponent from '../../../../components/map/GoogleMapsComponent';
import { convertWeight, convertMeasurement } from '../../../../utils/unit.util';

const config = {
  currency: 'EUR',
  weightUnit: 'g',
  measurementUnit: 'm',
};

class StaticRequestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,

      details: {},

      // details: {
      //   type: '-',
      //   routes: [],
      //   rating: {},
      //   status: '-',
      //   contact: {
      //     name: '-',
      //     number: ''
      //   },
      //   timeLogs: {},
      //   pickupTime: {},
      //   pickupDate: '',
      //   commodities: [],
      //   subOrder: false,
      //   user: {
      //     firstName: '-',
      //     lastName: ''
      //   },
      //   deliveryTime: {},
      //   pickupImages: [],
      //   deliveryDate: '',
      //   orderNumber: '-',
      //   deliveryType: '-',
      //   deliveredImages: [],
      //   rates: { price: '' },
      //   pickup: { address: '-', location: [0, 0] },
      //   dropoff: { address: '-', location: [0, 0] }
      // }
    };
    this.orderNumber = props.match.params.orderNumber;
  }

  componentDidMount() {
    this.getRequestDetails();
  }

  async getRequestDetails() {
    try {
      const response = await ApiCalls.trackOrder({ _id: this.orderNumber });
      this.setState({
        activity: false,
        ...(response.data ? { details: response.data } : {}),
      });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  handlePicturesClick = (images) => {
    this.props.store.setMultiWithRender({
      lightBoxIsOpen: true,
      lightBoxImages: images.map((item) => ({ src: item })),
    });
  };

  handleToggleChat = (value) => {
    this.setState({
      showChat: typeof value === 'boolean' ? value : false,
    });
  };

  render() {
    const { details } = this.state;
    const rating = details.rating || {};
    const vehicle = details.vehicle || {};
    const vehicleData = getVehicleData(vehicle);
    const pickupTime = details.pickupTime || {};
    const transporter = details.transporter || {};
    const deliveryTime = details.deliveryTime || {};
    const contactDetails = getContactDetails(details);
    // const pickupDropoffDetails = getPickupDropoffDetails(details);
    const timeLogs = details.timeLogs ? Object.keys(details.timeLogs) : [];

    return (
      <div>
        <Header showHeader={false} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {this.state.activity ? (
            <div style={{ paddingTop: 150 }}>
              <CircularProgress />
            </div>
          ) : details._id ? (
            <div
              className="u-r-details-container"
              style={{
                width: '100%',
                padding: 0,
                margin: 0,
                paddingTop: 85,
                backgroundColor: '#fff',
                maxWidth: 1366,
              }}
            >
              <div></div>
              <div className="p-grid" style={{ margin: 0 }}>
                <div className="p-col-12 page-title">
                  <span>Track Parcel</span>
                </div>
                <div className="p-col-12" style={{ padding: '0' }}>
                  <div
                    className="p-grid"
                    style={{ margin: 0, padding: '1rem' }}
                  >
                    <div
                      className="p-col-12 p-md-12 p-lg-12 p-xl-6"
                      style={{ padding: '1rem', display: 'flex' }}
                    >
                      <div className="basic-details-div request-details">
                        <div>
                          <span>Order ID : {details.orderNumber}</span>
                          <span>
                            Status : <span>{details.status}</span>
                          </span>
                        </div>
                        <div
                          className="p-grid"
                          style={{
                            margin: 0,
                            padding: '0',
                            flexGrow: 1,
                          }}
                        >
                          <div
                            className="p-col-12 p-lg-6"
                            style={{ backgroundColor: '#ebebeb', padding: 0 }}
                          >
                            <div
                              className="subheading-big"
                              style={{ padding: '1em' }}
                            >
                              <p>Pickup</p>
                              <div>
                                <img
                                  alt=""
                                  src={require('../../../../static/icons/icon-Pickup.png')}
                                />
                                <span>{details.pickup.address}</span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="p-col-12 p-lg-6"
                            style={{ padding: '0', backgroundColor: '#fff' }}
                          >
                            <div
                              className="subheading-big"
                              style={{ padding: '1em' }}
                            >
                              <p>Dropoff</p>
                              <div>
                                <img
                                  alt=""
                                  src={require('../../../../static/icons/icon-DropOff.png')}
                                />
                                <span>{details.dropoff.address}</span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="p-col-12 p-lg-6"
                            style={{
                              padding: 0,
                              display: 'flex',
                            }}
                          >
                            <div
                              style={{
                                backgroundColor: '#ebebeb',
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '0 1em',
                              }}
                            >
                              <div className="subheading">
                                <p>Pickup Date</p>
                                <p>
                                  {details.pickupDate
                                    ? moment(details.pickupDate).format(
                                        dateFormat
                                      )
                                    : '-'}
                                </p>
                                {details.flexibleDate ? (
                                  <p
                                    style={{
                                      visibility: 'visible',
                                      paddingBottom: '1em',
                                    }}
                                  >
                                    +/- One day
                                  </p>
                                ) : (
                                  <p
                                    style={{
                                      visibility: 'hidden',
                                      lineHeight: '1em',
                                    }}
                                  >
                                    a
                                  </p>
                                )}
                              </div>
                              <div className="subheading">
                                <p>Pickup Time</p>
                                <p>
                                  {pickupTime.from} - {pickupTime.to}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="p-col-12 p-lg-6"
                            style={{
                              padding: 0,
                              backgroundColor: '#fff',
                              display: 'flex',
                            }}
                          >
                            <div
                              style={{
                                flexGrow: 1,
                                padding: '0 1em',
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div className="subheading">
                                <p>Delivery Date</p>
                                <p>
                                  {details.deliveryDate
                                    ? moment(details.deliveryDate).format(
                                        dateFormat
                                      )
                                    : '-'}
                                </p>
                                {details.flexibleDeliveryDate ? (
                                  <p
                                    style={{
                                      visibility: 'visible',
                                      paddingBottom: '1em',
                                    }}
                                  >
                                    +/- One day
                                  </p>
                                ) : (
                                  <p
                                    style={{
                                      visibility: 'hidden',
                                      lineHeight: '1em',
                                    }}
                                  >
                                    a
                                  </p>
                                )}
                              </div>
                              <div className="subheading">
                                <p>Delivery Time</p>
                                <p>
                                  {deliveryTime.from} - {deliveryTime.to}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="p-col-12 p-lg-6"
                            style={{
                              backgroundColor: '#ebebeb',
                              padding: '0 0.5em 0.5em 0.5em',
                              display: 'flex',
                              // alignItems: 'flex-end',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div
                              className="subheading"
                              style={{ padding: '0.5em', paddingTop: 0 }}
                            >
                              <p>Pickup From</p>
                              <p>{contactDetails.pickup.name}</p>
                            </div>
                            <div
                              className="subheading"
                              style={{ padding: '0.5em', paddingTop: 0 }}
                            >
                              <p>Contact</p>
                              <p>+{contactDetails.pickup.number}</p>
                            </div>
                          </div>
                          <div
                            className="p-col-12 p-lg-6"
                            style={{
                              padding: 0,
                              backgroundColor: '#fff',
                              display: 'flex',
                              justifyContent: 'space-between',
                              flexDirection: 'column',
                            }}
                          >
                            <div
                              style={{
                                padding: '0 0.5em 0.5em 0.5em',
                                display: 'flex',
                                // alignItems: 'flex-end',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div
                                className="subheading"
                                style={{ padding: '0.5em', paddingTop: 0 }}
                              >
                                <p>Deliver To</p>
                                <p>{contactDetails.deliver.name}</p>
                              </div>
                              <div
                                className="subheading"
                                style={{ padding: '0.5em', paddingTop: 0 }}
                              >
                                <p>Contact</p>
                                <p>+{contactDetails.deliver.number}</p>
                              </div>
                            </div>
                            <div
                              style={{
                                // flexGrow: 1,
                                padding: '0 1em 1em',
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div className="subheading">
                                <p>Price</p>
                                <p style={{ fontFamily: 'Exo2-Bold' }}>
                                  {details.rates.price
                                    ? `${config.currency} ${getPrice(
                                        details.rates.price,
                                        'user'
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
                        <div
                          className="p-grid"
                          style={{ margin: 0, padding: '0.5em' }}
                        >
                          <div
                            className="p-col-12 p-lg-6"
                            style={{ padding: '0.5em' }}
                          >
                            <div className="subheading-big">
                              <p className="color-secondary">Transporter</p>
                              {transporter._id ? (
                                <>
                                  <p>
                                    Name :{' '}
                                    <span>
                                      {transporter.firstName}{' '}
                                      {transporter.lastName}
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
                            <div
                              className="p-col-12 p-lg-6"
                              style={{ padding: '0.5em' }}
                            >
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
                          <span>Tracking</span>
                        </div>
                        <div>
                          <span>Request</span> on{' '}
                          {moment(details.createdAt).format(dateTimeFormat)}
                        </div>
                        {timeLogs.map((log, i) => {
                          return (
                            <div key={`time-log-${i + 1}`}>
                              <span>{log}</span> on{' '}
                              {moment(timeLogs[log]).format(dateTimeFormat)}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {rating._id ? (
                      <div className="p-col-12" style={{ padding: '1rem' }}>
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            padding: '0.5em 1em',
                            border: '1px solid',
                            borderColor: getPrimaryColors('secondary'),
                          }}
                        >
                          <div style={{ padding: '0.5em 0', flexGrow: 1 }}>
                            <p
                              style={{
                                margin: 0,
                                color: getPrimaryColors('primary'),
                                fontWeight: 'bold',
                                fontSize: '1.2em',
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
                                fontSize: '1.2em',
                              }}
                            >
                              Comments
                            </p>
                            <span
                              style={{
                                color: getPrimaryColors('primary'),
                                display: 'inline-block',
                                marginTop: '0.5em',
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
                            borderColor: getPrimaryColors('error'),
                          }}
                        >
                          <p
                            style={{
                              margin: 0,
                              color: getPrimaryColors('error'),
                              fontWeight: 'bold',
                              fontSize: '1.2em',
                            }}
                          >
                            Cancellation Reason
                          </p>
                          <span
                            style={{
                              color: 'gray',
                              display: 'inline-block',
                              paddingTop: '0.5em',
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
                            (item) => item.indexOf(details.status) !== -1
                          ) ? (
                            details.staticMap ? (
                              <img
                                src={details.staticMap}
                                style={{ width: '100%', height: '100%' }}
                              />
                            ) : (
                              <GoogleMapsComponent
                                showMarkers={details.status !== 'pending'}
                                mapType="static"
                                transporterLocation={
                                  transporter.location
                                    ? transporter.location
                                    : []
                                }
                                mapElement={<div style={{ height: '100%' }} />}
                                containerElement={
                                  <div style={{ height: 350 }} />
                                }
                                coordinates={[
                                  details.pickup.location,
                                  details.dropoff.location,
                                ]}
                              />
                            )
                          ) : (
                            <GoogleMapsComponent
                              showMarkers={details.status !== 'pending'}
                              mapType="static"
                              transporterLocation={
                                transporter.location ? transporter.location : []
                              }
                              mapElement={<div style={{ height: '100%' }} />}
                              containerElement={<div style={{ height: 350 }} />}
                              coordinates={[
                                details.pickup.location,
                                details.dropoff.location,
                              ]}
                            />
                          )
                        ) : null}
                      </div>
                    </div>
                    <div
                      className="p-col-12 commodities-table"
                      style={{ padding: '1rem' }}
                    >
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
                              <TableCell className="no-border">
                                Delivered
                              </TableCell>
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
                                        config.weightUnit,
                                        item.weight
                                      )}{' '}
                                      ({config.weightUnit})
                                    </TableCell>
                                    <TableCell>
                                      {convertMeasurement(
                                        details.config.measurementUnit,
                                        config.measurementUnit,
                                        item.length
                                      )}
                                      x
                                      {convertMeasurement(
                                        details.config.measurementUnit,
                                        config.measurementUnit,
                                        item.width
                                      )}
                                      x
                                      {convertMeasurement(
                                        details.config.measurementUnit,
                                        config.measurementUnit,
                                        item.height
                                      )}{' '}
                                      ({config.measurementUnit})
                                    </TableCell>
                                    <TableCell>
                                      {item.images.map((image, i) => (
                                        <img
                                          onClick={() =>
                                            this.handlePicturesClick(
                                              item.images
                                            )
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
                                            this.handlePicturesClick(
                                              details.pickupImages
                                            )
                                          }
                                          key={`item-image-${i + 1}`}
                                          className="img"
                                          src={image}
                                        />
                                      ))}
                                    </TableCell>
                                    <TableCell className="no-border">
                                      {details.deliveredImages.map(
                                        (image, i) => (
                                          <img
                                            onClick={() =>
                                              this.handlePicturesClick(
                                                details.deliveredImages
                                              )
                                            }
                                            key={`item-image-${i + 1}`}
                                            className="img"
                                            src={image}
                                          />
                                        )
                                      )}
                                    </TableCell>
                                  </TableRow>
                                );
                              })
                            ) : (
                              <TableRow>
                                <TableCell
                                  className="no-border text-center"
                                  colSpan={7}
                                >
                                  No Items
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: '150px 1rem 1rem 1rem' }}>
              We could not find any request for this parcel number.
            </div>
          )}
        </div>
      </div>
    );
  }
}

StaticRequestDetails.propTypes = {
  store: PropTypes.shape({
    setMultiWithRender: PropTypes.func,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({ orderNumber: PropTypes.string }),
  }),
};

export default withStore(StaticRequestDetails);
