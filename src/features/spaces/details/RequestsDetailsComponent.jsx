import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import {
  FormControl,
  RootRef,
  InputLabel,
  Select,
  OutlinedInput,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  MenuItem
} from '@material-ui/core';

import Page from '../../../components/layout/Page';
import RequestCard from '../components/RequestCard';
import { capitalize } from '../../../utils/functions';
import EmptyRow from '../../../components/table/EmptyRow';
import { dateFormat } from '../../../constants/project-constants';
import { convertWeight, convertMeasurement } from '../../../utils/unit.util';
import GoogleMapsComponent from '../../../components/map/GoogleMapsComponent';

const getVehicleName = vehicle => {
  switch (vehicle.mode) {
    case 'train' || 'train' || 'sea': {
      return `${vehicle.mode} - ${vehicle.information}`;
    }
    case 'air': {
      return `${vehicle.mode} - ${vehicle.airline} ${vehicle.flightNumber}`;
    }

    default:
      return `${vehicle.mode} - ${vehicle.make} ${vehicle.model} ${vehicle.numberPlate}`;
  }
};

const driverModes = ['car', 'van', 'truck'];

const RequestsDetailsComponent = props => {
  const { details, activity, user } = props;
  const pickupTime = details.pickupTime || {};
  return (
    <Page activity={activity} className="r-details-container">
      <div className="p-grid">
        <div className="p-col-12" id="heading">
          <Typography variant="h6">#{details.orderNumber}</Typography>
          <Typography
            variant="body1"
            className={details.subOrder ? '' : 'not-sub-order'}
          >
            sub order
          </Typography>
          <Typography variant="body1">
            {user.config.currency} {details.rates.price}
          </Typography>
        </div>
        <div className="p-col-12 p-sm-4">
          <div className="stats-div">
            <div>
              <Typography variant="body1">
                {capitalize(details.status)}
              </Typography>
              <Typography variant="body1">Status</Typography>
            </div>
            <div>
              <i className="far fa-clock" />
            </div>
          </div>
        </div>
        <div className="p-col-12 p-sm-4">
          <div className="stats-div">
            <div>
              <Typography variant="body1">
                {capitalize(details.deliveryType)}
              </Typography>
              <Typography variant="body1">Delivery Type</Typography>
            </div>
            <div>
              <i className="fas fa-clipboard-list" />
            </div>
          </div>
        </div>
        <div className="p-col-12 p-sm-4">
          <div className="stats-div">
            <div>
              <Typography variant="body1">
                {moment(details.pickupDate).format(dateFormat)}
              </Typography>
              <Typography variant="body1">Pickup Date</Typography>
            </div>
            <div>
              <i className="far fa-calendar-alt" />
            </div>
          </div>
        </div>
        <div className="p-col-12 p-sm-4">
          <div className="details-div">
            <p>Contact</p>
            <div>
              <Typography variant="body1" style={{ fontSize: '1.1rem' }}>
                {capitalize(details.contact.name)}
              </Typography>
              <Typography variant="body1" style={{ fontSize: '0.9rem' }}>
                {details.contact.number}
              </Typography>
            </div>
          </div>
          <div className="details-div">
            <p>Pickup Time</p>
            <div>
              <Typography variant="body1">
                {pickupTime.from} - {pickupTime.to}
              </Typography>
            </div>
          </div>
          <div className="details-div">
            <p>Other</p>
            <div>
              <Typography variant="body1" style={{ fontSize: '0.9rem' }}>
                {details.commodities.length} item(s)
              </Typography>
              <Typography variant="body1" style={{ fontSize: '0.9rem' }}>
                {details.routes.length} sub order(s)
              </Typography>
            </div>
          </div>
          <div className="details-div">
            <p>Get in touch</p>
            <div>
              <Typography variant="body1" color="textSecondary">
                <i className="fas fa-phone" style={{ marginRight: 8 }} />
                713-621-7636
              </Typography>
            </div>
          </div>
        </div>
        <div className="p-col-12 p-sm-8">
          <div className="p-grid">
            <div className="p-col-12 map-div">
              <GoogleMapsComponent
                coordinates={[
                  details.pickup.location,
                  details.dropoff.location
                ]}
                mapType="static"
                containerElement={<div style={{ height: 400 }} />}
                mapElement={<div style={{ height: '100%' }} />}
              />
              <div className="p-grid">
                <div className="p-col-12 p-sm-6 address-div">
                  <div>
                    <Typography variant="body1">
                      {details.pickup.address}
                    </Typography>
                    <Typography variant="body1">Pickup</Typography>
                  </div>
                </div>
                <div className="p-col-12 p-sm-6 address-div">
                  <div>
                    <Typography variant="body1">
                      {details.dropoff.address}
                    </Typography>
                    <Typography variant="body1">Drop-off</Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-col-12">
              <div className="details-div">
                <p>Items</p>
                <div style={{ overflowX: 'auto' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Weight</TableCell>
                        <TableCell>Volume</TableCell>
                        <TableCell>Pictures</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {details.commodities.length ? (
                        details.commodities.map(item => (
                          <TableRow key={item._id}>
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
                              {'x'}
                              {convertMeasurement(
                                details.config.measurementUnit,
                                user.config.measurementUnit,
                                item.width
                              )}
                              {'x'}
                              {convertMeasurement(
                                details.config.measurementUnit,
                                user.config.measurementUnit,
                                item.height
                              )}{' '}
                              ({user.config.measurementUnit})
                            </TableCell>
                            <TableCell className="commodity-pictures">
                              {item.images.length ? (
                                <i
                                  className="fas fa-file-image"
                                  onClick={() =>
                                    props.handlePicturesClick(item.images)
                                  }
                                />
                              ) : (
                                '-'
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <EmptyRow colSpan={6} />
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
            <div className="p-col-12">
              {details.routes.length ? (
                <React.Fragment>
                  <div className="details-div">
                    <p>Sub Orders</p>
                  </div>
                  <div className="p-grid">
                    {details.routes.map(request => (
                      <div
                        key={request._id}
                        className="p-col-12 p-sm-6"
                        style={{ padding: '0.5em' }}
                      >
                        <RequestCard request={request} target="_blank" />
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              ) : null}
            </div>
            <div className="p-col-12">
              {details.status === 'pending' && (
                <React.Fragment>
                  <div className="details-div">
                    <p>Actions</p>
                  </div>
                  <div className="p-col-12">
                    <FormControl
                      variant="outlined"
                      fullWidth
                      error={props.error}
                    >
                      <RootRef rootRef={props.handleVehicleLabelRef}>
                        <InputLabel htmlFor="request-vehicle-select">
                          Vehicle
                        </InputLabel>
                      </RootRef>
                      <Select
                        name="vehicle"
                        value={props.vehicle}
                        onChange={props.handleChange}
                        input={
                          <OutlinedInput
                            className="vehicle-select-input"
                            labelWidth={props.vehicleLabelRef.offsetWidth || 0}
                            name="vehicle"
                            id="request-vehicle-select"
                          />
                        }
                      >
                        {props.myVehicles.length ? (
                          props.myVehicles.map(vehicle => (
                            <MenuItem
                              key={vehicle._id}
                              value={vehicle._id}
                              data-mode={vehicle.mode}
                              style={{ textTransform: 'capitalize' }}
                            >
                              {getVehicleName(vehicle)}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="none" disabled>
                            No vehicles.
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                  {driverModes.indexOf(props.mode) !== -1 ? (
                    <div className="p-col-12">
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="request-vehicle-select">
                          Driver
                        </InputLabel>
                        <Select
                          name="driver"
                          value={props.driver}
                          onChange={props.handleChange}
                          input={
                            <OutlinedInput
                              className="vehicle-select-input"
                              labelWidth={
                                props.vehicleLabelRef.offsetWidth || 0
                              }
                              name="driver"
                              id="request-vehicle-select"
                            />
                          }
                        >
                          {props.myDrivers.length ? (
                            props.myDrivers.map(driver => (
                              <MenuItem
                                key={driver._id}
                                value={driver._id}
                                style={{ textTransform: 'capitalize' }}
                              >
                                {driver.firstName} {driver.lastName}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem value="none" disabled>
                              No drivers.
                            </MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </div>
                  ) : null}
                  <div className="text-right">
                    <Button
                      color="primary"
                      disabled={activity}
                      onClick={props.handleAcceptRequest}
                      variant="contained"
                    >
                      Accept request
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

RequestsDetailsComponent.defaultProps = {
  myDrivers: [],
  myVehicles: [],
  details: {
    orderNumber: 0,
    subOrder: false,
    status: 'status',
    deliveryType: 'type',
    pickupDate: new Date().toISOString(),
    commodities: [],
    routes: [],
    rating: {},
    customerRating: {},
    pickup: { address: 'address', location: [0, 0] },
    dropoff: { address: 'address', location: [0, 0] },
    timeLogs: {},
    pickupImages: [],
    deliveredImages: [],
    pickupTime: {},
    rates: { price: 0 },
    contact: {
      name: 'name',
      number: 'number'
    }
  }
};

RequestsDetailsComponent.propTypes = {
  error: PropTypes.bool,
  mode: PropTypes.string,
  activity: PropTypes.bool,
  driver: PropTypes.string,
  vehicle: PropTypes.string,
  user: PropTypes.shape({}),
  details: PropTypes.shape({}),
  handleChange: PropTypes.func,
  vehicleLabelRef: PropTypes.shape(),
  handleAcceptRequest: PropTypes.func,
  handlePicturesClick: PropTypes.func,
  handleVehicleLabelRef: PropTypes.func,
  myDrivers: PropTypes.arrayOf(PropTypes.shape()),
  myVehicles: PropTypes.arrayOf(PropTypes.shape())
};

export default RequestsDetailsComponent;
