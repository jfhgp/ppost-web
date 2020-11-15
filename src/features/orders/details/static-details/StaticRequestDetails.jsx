import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { importFirebase } from '../../../../utils/functions';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { authClass } from '../../../../utils/auth.util';
import LocationOffOutlinedIcon from '@material-ui/icons/LocationOffOutlined';
import ProductCarousel from './ProductCarousel';
import DeliveryDriver from './deliveryDriver';
import DeliveredDetails from './DeliveredDetails';
import { getActions } from '../../../../utils/request-details.util';
import Avatar from '@material-ui/core/Avatar';
import './style.css';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  colors,
} from '@material-ui/core';
import moment from 'moment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
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
  trackDateTimeFormat,
  dateTimeFormat,
} from '../../../../constants/project-constants';
import Header from '../../../../containers/Header';
import { withStore } from '../../../../utils/store.util';
import ApiCalls from '../../../../service/RequestHandler';
import { getPrimaryColors } from '../../../../utils/functions';
import GoogleMapsComponent from '../../../../components/map/GoogleMapsComponent';
import { convertWeight, convertMeasurement } from '../../../../utils/unit.util';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import ChatComponent from '../../../../components/chat/ChatComponent';
class StaticRequestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: authClass.getUser,
      activity: true,
      notification: false,
      details: {},
      showChat: false,
      messages: [],
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
      this.handleFirebase();
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handleToggleChat = (value) => {
    this.setState({
      showChat: typeof value === 'boolean' ? value : false,
    });
  };

  async handleFirebase() {
    const { database } = await importFirebase();
    const { details } = this.state;
    console.log('This is all details insta', details);
    this.messageRef = database().ref('messages').child(this.state.details._id);

    this.messageRef.on('value', (message) => {
      if (message.val()) {
        this.setState({
          messages: Object.values(message.val()),
        });
      }
    });
  }

  handleSendMessage = (message) => {
    if (message) {
      const newItem = {
        userName: 'Anonymous User',
        message: message,
        sender: 'anonymous',
        date: new Date().getTime(),
        status: 'pending',
        type: 'text',
      };
      this.messageRef.push(newItem);
    }
  };

  handleSendLocationMessage = (message) => {
    if (message) {
      const newItem = {
        userName: 'Anonymous User',
        message: message,
        sender: 'anonymous',
        date: new Date().getTime(),
        status: 'pending',
        type: 'location',
      };
      this.messageRef.push(newItem);
    }
  };

  handleSendAudioMessage = (audio) => {
    if (audio) {
      const newItem = {
        userName: 'Anonymous User',
        message: 'audio',
        sender: 'anonymous',
        date: new Date().getTime(),
        status: 'pending',
        type: 'audio',
        media: audio,
      };
      this.messageRef.push(newItem);
    }
  };

  render() {
    const { details, user } = this.state;
    const rating = details.rating || {};
    const status = details.status || {};
    const vehicle = details.vehicle || {};
    const dropoff = details.dropoff ? details.dropoff.address : {};
    const vehicleData = getVehicleData(vehicle);
    const pickupTime = details.pickupTime || {};
    const transporter = details.transporter || {};
    const deliveryTime = details.deliveryTime || {};
    const contactDetails = getContactDetails(details);
    const commodities = details.commodities || [];
    const actions = getActions(details, user, details.status);
    // const pickupDropoffDetails = getPickupDropoffDetails(details);
    const timeLogs = details.timeLogs ? Object.keys(details.timeLogs) : [];

    const menuItem = [
      {
        id: '1',
        label: 'Order placed',
        subTitle: details.pickupDate
          ? moment(details.pickupDate).format('L')
          : '-',
        iconWhite: require('../../../../static/images/calender-white.png'),
        iconBlack: require('../../../../static/images/calender-black.png'),
        status: 'pending',
      },
      {
        id: '2',
        label: 'Send with',
        subTitle: 'Classic by Frank',
        status: 'accepted' || 'onmyway',
        iconWhite: require('../../../../static/images/frank-white.png'),
        iconBlack: require('../../../../static/images/frank-black.png'),
      },
      {
        id: '3',
        label: 'Delivery in progress',
        subTitle: details.deliveryDate
          ? moment(details.deliveryDate).format('L')
          : '-',
        iconWhite: require('../../../../static/images/calender-white.png'),
        iconBlack: require('../../../../static/images/calender-black.png'),
        status: 'picked',
      },
      {
        id: '4',
        label: 'Delivered',
        subTitle: dropoff,
        status: 'delivered',
        iconWhite: require('../../../../static/images/location-white.png'),
        iconBlack: require('../../../../static/images/location-black.png'),
      },
    ];

    const DeliveryInformation = [
      {
        id: '1',
        icon: <CalendarTodayIcon className="track-icon" />,
        label: 'Timeslot',
        subTitle: (
          <div>
            <p style={{ fontSize: 20, fontWeight: 'bold' }}>
              {details.deliveryDate
                ? moment(details.deliveryDate).format(trackDateTimeFormat)
                : '-'}
            </p>
            <p>
              {deliveryTime.from} - {deliveryTime.to}
            </p>
          </div>
        ),
      },
      {
        id: '2',
        icon: <RoomOutlinedIcon className="track-icon" />,
        label: 'Address',
        subTitle: dropoff,
      },
      {
        id: '3',
        icon: <PersonOutlineOutlinedIcon className="track-icon" />,
        label: 'Contact',
        subTitle: `+${contactDetails.deliver.number}`,
      },
    ];

    const NotHomeInformation = [
      {
        id: '1',
        icon: <PersonOutlineOutlinedIcon className="track-icon" />,
        label: 'Contact',
        subTitle: `+${contactDetails.deliver.number}`,
      },
      {
        id: '2',
        icon: <LocationOffOutlinedIcon className="track-icon" />,
        label: 'Delivery instruction if absent',
        subTitle: 'Please leave the package in front of the door',
      },
    ];

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
              {/* <ol class="steps">
                {menuItem.map((item, index) => (
                  <li>
                    <a href="#" title="">
                      <span class="number">1.</span>
                      CA & ULA
                    </a>
                  </li>
                ))}
              </ol> */}

              <Grid className="track-root" container>
                {menuItem.map((item, index) => (
                  <Grid item xs={3}>
                    <div
                      className={
                        status === item.status
                          ? 'track-menu-active'
                          : 'track-menu'
                      }
                    >
                      <div style={{ paddingRight: 20 }}>
                        <h1 style={{ fontSize: 40 }}>{item.id}</h1>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            margin: 0,
                          }}
                        >
                          {item.label}
                        </p>
                        <div style={{ display: 'flex' }}>
                          <img
                            src={
                              status === item.status
                                ? item.iconWhite
                                : item.iconBlack
                            }
                            style={{ paddingRight: 5 }}
                            alt="icon"
                          />
                          <div className="text">
                            <p
                              style={{
                                margin: 0,
                              }}
                            >
                              {item.subTitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
              <Grid className="track-root" container>
                <Grid item xs={3} style={{ paddingRight: 50 }}>
                  <ProductCarousel
                    commodities={commodities}
                    details={details}
                  />
                </Grid>
                <Grid item xs={9}>
                  {status === 'delivered' ? (
                    <DeliveredDetails
                      transporter={transporter}
                      details={details}
                    />
                  ) : (
                    <Grid container className="track-details">
                      <Grid item xs={12} style={{ marginBottom: 20 }}>
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
                                  showMarkers={true}
                                  mapType="static"
                                  transporterLocation={
                                    transporter.location
                                      ? transporter.location
                                      : []
                                  }
                                  mapElement={
                                    <div style={{ height: '100%' }} />
                                  }
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
                                showMarkers={true}
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
                          ) : null}
                        </div>
                      </Grid>
                      <Grid item xs={4} style={{ paddingRight: 80 }}>
                        <div>
                          <h1 style={{ fontWeight: 'bold', marginBottom: 30 }}>
                            Your delivery informations
                          </h1>
                        </div>
                        {DeliveryInformation.map((item, index) => (
                          <div
                            className="subheading"
                            style={{ marginBottom: 20 }}
                          >
                            <p style={{ color: 'grey', fontSize: 16 }}>
                              {item.icon}
                              {item.label}
                            </p>
                            <p>{item.subTitle}</p>
                          </div>
                        ))}
                        <div className="subheading">
                          <p style={{ color: 'grey', fontSize: 14 }}>
                            Just to make your delivery easier
                          </p>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={this.state.notification}
                                  onChange={this.handleChange}
                                  name="notification"
                                  style={{ color: 'rgb(250, 120, 22)' }}
                                />
                              }
                              label="Send me text notifications"
                            />
                          </FormGroup>
                        </div>
                      </Grid>
                      <Grid item xs={4} style={{ paddingRight: 80 }}>
                        <div>
                          <h1 style={{ fontWeight: 'bold', marginBottom: 30 }}>
                            Won't be
                            <br /> home?
                          </h1>
                        </div>
                        {NotHomeInformation.map((item, index) => (
                          <div className="subheading">
                            <p style={{ color: 'grey', fontSize: 16 }}>
                              {item.icon}
                              {item.label}
                            </p>
                            <p>{item.subTitle}</p>
                          </div>
                        ))}
                      </Grid>
                      {status !== 'pending' ? (
                        <Grid item xs={4}>
                          <DeliveryDriver
                            transporter={transporter}
                            handleToggleChat={this.handleToggleChat}
                          />
                        </Grid>
                      ) : null}
                    </Grid>
                  )}
                </Grid>
                <Avatar
                  className="chat-popup"
                  style={{
                    width: 71,
                    height: 71,
                    cursor: 'pointer',
                  }}
                  alt="Remy Sharp"
                  src={require('../../../../static/images/customersupport.png')}
                />
              </Grid>
            </div>
          ) : (
            <div style={{ padding: '150px 1rem 1rem 1rem' }}>
              We could not find any request for this parcel number.
            </div>
          )}
          <ChatComponent
            transporter={transporter}
            showChat={this.state.showChat}
            messages={this.state.messages}
            handleStartRecording={this.onStartVoiceRecord}
            handleStopRecording={this.onStopVoiceRecord}
            handleShareLocation={this.onShareCurrentLocation}
            handleRemoveRecording={this.onRemoveVoiceRecord}
            onClick={this.handleToggleChat}
            sendMessage={this.handleSendMessage}
            canSendMessage={actions.canSendMessage}
          />
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
