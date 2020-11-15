import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { authClass } from '../../../utils/auth.util';
import * as authUtil from '../../../utils/auth.util';
import { withStore } from '../../../utils/store.util';
import ApiCalls from '../../../service/RequestHandler';
import { importFirebase } from '../../../utils/functions';
import MyRequestsDetailsComponent from './MyRequestsDetailsComponent';
import FeedbackComponent from '../../orders/details/components/FeedbackComponent';
import AcceptOrderComponent from '../../orders/details/components/AcceptOrderComponent';
import CancellationReasonComponent from '../../orders/details/components/CancellationReasonComponent';
import RequestRescheduleComponent from '../../orders/details/components/RequestRescheduleComponent';
import ExpensesComponent from '../../orders/details/components/ExpensesComponent';
// Components
import TravellingInformationAddContainer from '../../../features/profile/travelling-information/add/TravellingInformationAddContainer';
import TravellingInformationUpdateContainer from '../../../features/profile/travelling-information/add/TravellingInformationAddContainer';
import MicRecorder from 'mic-recorder-to-mp3';
const canBeEmpty = ['iban'];
const Mp3Recorder = new MicRecorder({ bitRate: 128 });


// import moment from 'moment';
// import {
//   getContactDetails,
//   getPrice,
//   getVehicleData
// } from '../../../utils/request-details.util';

class MyRequestsDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: '',
      componentData: null,
      isDialogVisible: false,
      messages: [],
      activity: true,
      showChat: false,
      details: undefined,
      canPerformActions: false,
      dialogData: { open: false, comp: '', type: '' },
      detailsExcelData: [],
      profile: {},
      isRecording: false,
      audioUrl: '',
      isBlocked: false,
    };

    this.messageRef = null;
    this._id = props.match.params.id;
  }

  async componentDidMount() {
    await this.getDetails();
    await this.handleGetExpenses();
    this.getProfile();
    this.handleFirebase();
    navigator.getUserMedia({ audio: true },
      () => {

        this.setState({ isBlocked: false });
      },
      () => {

        this.setState({ isBlocked: true })
      },
    );
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

  async getProfile() {
    if (this.state.userType === 'user') {
      try {
        const response = await ApiCalls.getTransporterProfileById({
          _id: this.props.match.params.id
        });

        this.setState({ activity: false, profile: response.data });
      } catch (error) {
        this.setState({ activity: false });
      }
    } else {
      try {
        const response = await ApiCalls.getTransporterProfileById({
          _id: authClass.getUser._id
        });

        this.setState({ activity: false, profile: response.data });
      } catch (error) {
        this.setState({ activity: false });
      }
    }
  }

  handleSetCurrentComponent = (component, componentData = null) => {
    this.setState({
      component,
      componentData,
      isDialogVisible: true
    });
  };

  handleGetComponent = component => {
    switch (component) {
      case 'travelling-add': {
        return TravellingInformationAddContainer;
      }
      case 'travelling-update': {
        return TravellingInformationUpdateContainer;
      }
      default: {
        return () => null;
      }
    }
  };

  handleDialogVisibility = (visibility, dialogData) => {
    if (visibility === true) {
      this.setState({
        dialogData: dialogData,
        isDialogVisibleAddBankAccount: visibility
      });
    } else {
      if (
        canBeEmpty.indexOf(this.state.dialogData.name) !== -1 ||
        this.isValid()
      ) {
        this.setState({
          dialogData: { values: [] },
          isDialogVisibleAddBankAccount: false
        });
      }
    }
  };

  handleCloseDialog = () => {
    this.setState({
      component: '',
      componentData: null,
      isDialogVisible: false
    });
  };

  handleInformation = travelling => {
    this.setState({
      component: '',
      componentData: null,
      isDialogVisible: false,
      profile: { ...this.state.profile, travelling }
    });
  };

  handleGetExpenses = async () => {

    try {
      const response = await ApiCalls.getExpenses(({ _id: this._id }));

      this.setState({ expenses: response.data })
    } catch (error) {
      this.setState({ activity: false });

    }
  };

  async getDetails() {
    try {
      const response = await ApiCalls.getOrderById({ _id: this._id });

      this.setState({
        activity: false,
        details: response.data,
        canPerformActions:
          response.data.status === 'pending'
            ? true
            : authClass.getUser._id === response.data.transporter._id
      });
      // await this.setExcelData(response.data);
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
        } , () => {console.log("all messages", this.state.messages)});
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

  handleGetDialogComponent = type => {
    switch (type) {
      case 'addexpenses':
        return ExpensesComponent;
      case 'viewexpenses':
        return ExpensesComponent;
      case 'reschedule':
        return RequestRescheduleComponent;
      case 'cancel':
        return CancellationReasonComponent;
      case 'accept':
        return AcceptOrderComponent;
      case 'feedback':
        return FeedbackComponent;
      default:
        return () => null;
    }
  };

  handleDialogClose = () => {
    this.setState({
      dialogData: { open: false, comp: '', type: '' }
    });
  };

  handleSetDetails = details => {
    this.setState({
      dialogData: { open: false, comp: '', type: '' },
      details
    });
  };

  handlePicturesClick = images => {
    this.props.store.setMultiWithRender({
      lightBoxIsOpen: true,
      lightBoxImages: images.map(item => ({ src: item }))
    });
  };

  handleToggleChat = value => {
    this.setState({
      showChat: typeof value === 'boolean' ? value : false
    });
  };

  // setExcelData = details => {
  //   let detailsArr = [];
  //   const contactDetails = getContactDetails(details);
  //   const user = authClass.getUser;
  //   const vehicle = details.vehicle || {};
  //   const vehicleData = getVehicleData(vehicle);

  //   detailsArr.push({
  //     OrderNumber: details.orderNumber || '',
  //     Status: details.status === 'pending' ? 'Waiting' : details.status,
  //     DeliveryType: details.deliveryType || '',
  //     PickupFrom: contactDetails.pickup.name || '',
  //     PickUpContact: `+${details.contact.number}` || '',
  //     DeliverTo: contactDetails.deliver.name || '',
  //     DeliverToContact: `+${contactDetails.deliver.number}` || '',
  //     Pickup: details.pickup.address || '',
  //     DropOff: details.dropoff.address || '',
  //     PickupDate: moment(details.pickupDate).format('ll') || '',
  //     FlexibleDate: details.flexibleDate,
  //     PickupTime: details.pickupTime
  //       ? `${details.pickupTime.from} - ${details.pickupTime.to}`
  //       : '',
  //     DeliveryDate: details.deliveryDate
  //       ? moment(details.deliveryDate).format('ll')
  //       : '',
  //     DeliveryTime: details.deliveryTime
  //       ? `${details.deliveryTime.from} - ${details.deliveryTime.to}`
  //       : '',
  //     FlexibleDeliveryDate: details.flexibleDeliveryDate,
  //     Price:
  //       details.rates && details.rates.price
  //         ? `${user.config.currency} ${getPrice(
  //             details.rates.price,
  //             user.userType
  //           )}`
  //         : '-',
  //     TransporterName: details.transporter
  //       ? `${details.transporter.firstName} ${details.transporter.lastName}`
  //       : '',
  //     TransporterContact: details.transporter
  //       ? `+${details.transporter.mobile}`
  //       : '',
  //     TransporterVehicleMode: details.vehicle ? details.vehicle.mode : '',
  //     TransporterVehicleModel: details.vehicle
  //       ? `${details.vehicle.make} ${details.vehicle.model}`
  //       : '',

  //     TransporterVehicleNumber: details.vehicle
  //       ? `${details.vehicle.numberPlate}`
  //       : ''
  //   });
  //   this.setState({ detailsExcelData: detailsArr });
  // };

  // customers = () => {
  //   let custs = [];
  //   for (let i = 0; i <= 25; i++) {
  //     custs.push({
  //       firstName: `first${i}`,
  //       lastName: `last${i}`,
  //       email: `abc${i}@gmail.com`,
  //       address: `000${i} street city, ST`,
  //       zipcode: `0000${i}`
  //     });
  //   }
  //   this.setState({ customerss: custs });
  // };

  render() {
    return (
      <MyRequestsDetailsComponent
        {...this.state}
        user={authClass.getUser}
        handleInformation={this.handleInformation}
        handleChange={this.handleChange}
        handleSetDetails={this.handleSetDetails}
        handleToggleChat={this.handleToggleChat}
        handleSendMessage={this.handleSendMessage}
        handleDialogClose={this.handleDialogClose}
        handleStartRecording={this.onStartVoiceRecord}
        handleStopRecording={this.onStopVoiceRecord}
        handleShareLocation={this.onShareCurrentLocation}
        handleRemoveRecording={this.onRemoveVoiceRecord}
        handlePicturesClick={this.handlePicturesClick}
        handleSetCurrentComponent={this.handleSetCurrentComponent}
        handleCloseDialog={this.handleCloseDialog}
        handleDialogVisibility={this.handleDialogVisibility}
        handleGetDialogComponent={this.handleGetDialogComponent}
        handleGetComponent={this.handleGetComponent}
        handleGetExpenses={this.handleGetExpenses}
      />
    );
  }
}

MyRequestsDetailsContainer.propTypes = {
  store: PropTypes.shape({
    setWithRender: PropTypes.func,
    setMultiWithRender: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string })
  })
};

export default withStore(MyRequestsDetailsContainer);
