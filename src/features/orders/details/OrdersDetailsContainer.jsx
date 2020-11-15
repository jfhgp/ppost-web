import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { authClass } from '../../../utils/auth.util';
import * as authUtil from '../../../utils/auth.util';
import { withStore } from '../../../utils/store.util';
import ApiCalls from '../../../service/RequestHandler';
import { importFirebase } from '../../../utils/functions';
import OrdersDetailsComponent from './OrdersDetailsComponent';
import { continent } from '../../../utils/location.util';
import FeedbackComponent from './components/FeedbackComponent';
import CancellationReasonComponent from './components/CancellationReasonComponent';
import RequestRescheduleComponent from './components/RequestRescheduleComponent';
import ChangeLocationComponent from './components/ChangeLocationComponent';
import { newGrowl } from '../../../components/ui/GrowlComponent';
import { validateAddItem, validateSubmitLocation } from '../orders-validator';
import MicRecorder from 'mic-recorder-to-mp3';
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const normalizeData = (type, state, contactNumber) => {
  let data = {};
  if (type === 'rates') {
    data = {
      pickup: state.pickup,
      dropoff: state.dropoff,
      deliveryType: state.details.deliveryType,
      preferredMode: state.details.preferredMode,
      transporter: state.details.transporter,
      commodities: state.details.commodities,
      totalWeight: 0,
      totalWidth: 0,
      totalHeight: 0,
      totalLength: 0,
      priceImpact: 0,
      bonus: state.details.bonus,
      ...(state.details.promo ? { promo: state.details.promo } : {})
    };

    state.details.commodities.forEach(item => {
      data.totalWeight += parseInt(item.weight) * parseInt(item.quantity);
      data.totalWidth += parseInt(item.width) * parseInt(item.quantity);
      data.totalHeight += parseInt(item.height) * parseInt(item.quantity);
      data.totalLength += parseInt(item.length) * parseInt(item.quantity);
      data.priceImpact +=
        parseInt(item.itemType.priceImpact) * parseInt(item.quantity);
    });
  }

  if (type === 'submit') {
    data = {
      _id: state.details._id,
      pickup: state.pickup,
      dropoff: state.dropoff,
      rates: state.rates
    };
  }


  return data;
};


class OrdersDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: authClass.getUser,
      messages: [],
      activity: true,
      showChat: false,
      details: undefined,
      dialogData: { open: false, comp: '' },
      isRecording: false,
      audioUrl: '',
      isBlocked: false,
      locationDialogData: {},
      isDialogOpen: false,
      pickup: "",
      dropoff: "",
      pickupDropOffMessage: '',
      userType: '',
      errors: {},
      locationUpdate: false,
      rates: {},
      getRate: false,
      promoObject: {},
      isChangeLog: false,
      confirmationCode: ""
    };

    this.messageRef = null;
    this._id = props.match.params.id;
  }

  async componentDidMount() {
    const user = await authUtil.getUser();
    const userType = user.userType;
    this.setState({ userType });
    await this.getDetails();
    this.getOrderChangeLog();
    this.handleFirebase();
  }

  onShareCurrentLocation = async () => {
    const location = await authUtil.getCurrentLocation()
    const ShareLocationUrl = `https://www.google.com/maps/place/${location[1]},${location[0]}`
    this.handleSendLocationMessage(ShareLocationUrl);
  };


  onStartVoiceRecord = () => {
    if (this.state.isBlocked) {

    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  onStopVoiceRecord = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        const audioFile = this.createFile(blob);
        const audioUrl = await this.uploadFile(audioFile)
        this.handleSendAudioMessage(audioUrl.path);
        this.setState({ audioUrl: audioUrl.path, isRecording: false });
      }).catch((e) => console.log(e));
  };

  onRemoveVoiceRecord = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        this.setState({ isRecording: false });
      }).catch((e) => console.log(e));
  };


  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await ApiCalls.uploadTFile(formData);
      return { path: response.data.path, stateKey: file.stateKey };
    } catch (error) {
      throw error;
    }
  }

  createFile = (file) => {
    var d = new Date();
    var n = d.getTime()
    const fileName = "uploaded_file.mp3" + n
    var newfile = new File([file], fileName, { type: "audio/mpeg", lastModified: Date.now() })
    return newfile;
  }

  async getDetails() {
    try {
      const { data } = await ApiCalls.getOrderById({ _id: this._id });
      this.setState({ pickup: data.pickup, dropoff: data.dropoff, activity: false, details: data });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  async getOrderChangeLog() {
    try {
      const { data } = await ApiCalls.getOrderChangeLog({ _id: this._id });
      console.log("This is the response of data", data)
      if (data.length) {
        this.setState({ isChangeLog: true });
      }
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  onSubmitConfirmationCode = async () => {
    this.setState({ activity: true });
    const props = {
      _id: this._id,
      confirmationCode: this.state.confirmationCode
    }
    try {
      const { data } = await ApiCalls.onConfirmUpdate(props);
      this.setState({ activity: false, isChangeLog: false })
      newGrowl.showGrowl(
        'success',
        'Success',
        'Your confirmation code is successfully submitted.'
      );
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  async handleFirebase() {
    const { database } = await importFirebase();
    this.messageRef = database()
      .ref('messages')
      .child(this._id);

    this.messageRef.on('value', message => {
      if (message.val()) {
        this.setState({
          messages: Object.values(message.val())
        });
      }
    });
  }

  handleSendMessage = message => {
    if (message) {
      const newItem = {
        userName:
          authClass.getUser.firstName + ' ' + authClass.getUser.lastName,
        message: message,
        sender: authClass.getUser._id,
        date: new Date().getTime(),
        status: 'pending',
        type: "text"
      };
      this.messageRef.push(newItem);
    }
  };

  handleSendLocationMessage = message => {
    if (message) {
      const newItem = {
        userName:
          authClass.getUser.firstName + ' ' + authClass.getUser.lastName,
        message: message,
        sender: authClass.getUser._id,
        date: new Date().getTime(),
        status: 'pending',
        type: "location"
      };
      this.messageRef.push(newItem);
    }
  };

  handleSendAudioMessage = audio => {
    if (audio) {
      const newItem = {
        userName:
          authClass.getUser.firstName + ' ' + authClass.getUser.lastName,
        message: "audio",
        sender: authClass.getUser._id,
        date: new Date().getTime(),
        status: 'pending',
        type: "audio",
        media: audio
      };
      this.messageRef.push(newItem);
    }
  };

  handleChange = state => {
    this.setState(state);
  };

  onInputChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleGetDialogComponent = type => {
    switch (type) {
      case 'reschedule':
        return RequestRescheduleComponent;
      case 'changeLocation':
        return ChangeLocationComponent;
      case 'cancel':
        return CancellationReasonComponent;
      case 'feedback':
        return FeedbackComponent;
      default:
        return () => null;
    }
  };

  handleDialogVisibility = (value, data = {}) => {
    this.setState({
      locationDialogData: typeof value === 'boolean' ? data : {},
      isDialogOpen: typeof value === 'boolean' ? value : false
    });
  };

  restrictToEU() {
    if (
      this.state.dropoff.country &&
      this.state.pickup.country &&
      continent[this.state.dropoff.country] !== 'Europe' &&
      continent[this.state.pickup.country] !== 'Europe'
    ) {
      this.setState(prevState => ({
        pickupDropOffMessage:
          'At least one location (either origin or destination of parcel) should be in Europe',
        errors: { ...prevState.errors, pickup: true, dropoff: true }
      }));
    } else {
      this.setState(prevState => ({
        pickupDropOffMessage: '',
        errors: { ...prevState.errors, pickup: false, dropoff: false }
      }));
    }
  }

  handleDialogCallback = async e => {
    const name = this.state.locationDialogData.name;
    await this.setState({ [name]: e, locationUpdate: true });
    this.mapComponentRef.setZoomForSingleMarker(e.location);
    this.restrictToEU();
  };

  isValid = () => {
    const validationData = {
      pickup: this.state.pickup,
      dropoff: this.state.dropoff
    }
    const { errors, isValid } = validateSubmitLocation(validationData);
    if (!isValid) {
      this.setState(prevState => ({
        errors: { ...prevState.errors, ...errors }
      }));
    }
    return isValid;
  };



  getRates = async () => {
    if (this.isValid()) {
      this.setState({ activity: true, getRate: false });
      const data = normalizeData('rates', this.state);
      try {
        const response = await ApiCalls.estimateOrderCost(data);
        const { rates, promo, items } = response.data;
        this.setState({
          activity: false,
          getRate: true,
          rates,
          ...(promo ? { promoObject: promo } : {})
        });
        this.handleChange({
          dialogData: {
            open: true,
            comp: 'changeLocation'
          }
        })
      } catch (error) {
        this.setState({ activity: false, getRate: false });
        try {
          newGrowl.showGrowl('error', 'Error', error.response.data.message);
        } catch (error) {
          //
        }
      }
    }
  };

  submitOrder = async () => {
    this.setState({ activity: true });
    let valid = true;
    const data = normalizeData('submit', this.state);
    if (valid) {
      // data.commodities = commodities;
      // eslint-disable-next-line no-console
      try {
        const response = await ApiCalls.requestLocationChange(data);
        // eslint-disable-next-line no-console
        this.setState({
          activity: false,
        });
        this.handleDialogClose()
        newGrowl.showGrowl(
          'success',
          'Success',
          'Your change location request has been submitted successfully.'
        );
      } catch (error) {
        this.setState({ activity: false });

        try {
          newGrowl.showGrowl(
            'error',
            'Error',
            error.response.data.message ||
            'Something went wrong. Please try again.'
          );
        } catch (error) {
          //
        }
      }
    }

  };



  handleMapComponentRef = ref => (this.mapComponentRef = ref);

  handlePicturesClick = images => {
    this.props.store.setMultiWithRender({
      lightBoxIsOpen: true,
      lightBoxImages: images.map(item => ({ src: item }))
    });
  };

  handleDialogClose = () => {
    this.setState({ dialogData: { open: false, comp: '' } });
  };

  handleSetDetails = details => {
    this.setState({
      dialogData: { open: false, comp: '' },
      details
    });
  };

  handleToggleChat = value => {
    this.setState({
      showChat: typeof value === 'boolean' ? value : false
    });
  };

  handleEdit = () => { };

  showEditButton = status => {
    if (status === 'pending') {
      return true;
    }
    return false;
  };

  render() {
    return (
      <OrdersDetailsComponent
        {...this.state}
        user={authClass.getUser}
        handleGetRates={this.getRates}
        handleChange={this.handleChange}
        handleSetDetails={this.handleSetDetails}
        handleToggleChat={this.handleToggleChat}
        handleSendMessage={this.handleSendMessage}
        handleDialogClose={this.handleDialogClose}
        handlePicturesClick={this.handlePicturesClick}
        handleStartRecording={this.onStartVoiceRecord}
        handleStopRecording={this.onStopVoiceRecord}
        handleShareLocation={this.onShareCurrentLocation}
        handleRemoveRecording={this.onRemoveVoiceRecord}
        handleDialogVisibility={this.handleDialogVisibility}
        handleDialogCallback={this.handleDialogCallback}
        mapComponentRef={this.handleMapComponentRef}
        handleGetDialogComponent={this.handleGetDialogComponent}
        showEditButton={this.showEditButton}
        handleSubmitOrder={this.submitOrder}
        onInputChange={this.onInputChange}
        onSubmitConfirmationCode={this.onSubmitConfirmationCode}
      />
    );
  }
}

OrdersDetailsContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string })
  }),
  store: PropTypes.shape({ setMultiWithRender: PropTypes.func })
};

export default withStore(OrdersDetailsContainer);
