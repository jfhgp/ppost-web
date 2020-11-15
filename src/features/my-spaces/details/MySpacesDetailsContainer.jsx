import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { authClass } from '../../../utils/auth.util';
import { withStore } from '../../../utils/store.util';
import ApiCalls from '../../../service/RequestHandler';
import { importFirebase } from '../../../utils/functions';
import MySpacesDetailsComponent from './MySpacesDetailsComponent';
import FeedbackComponent from '../../orders/details/components/FeedbackComponent';
import AcceptOrderComponent from '../../orders/details/components/AcceptOrderComponent';
import CancellationReasonComponent from '../../orders/details/components/CancellationReasonComponent';
// import moment from 'moment';
// import {
//   getContactDetails,
//   getPrice,
//   getVehicleData
// } from '../../../utils/request-details.util';

class MySpacesDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      activity: true,
      showChat: false,
      details: undefined,
      canPerformActions: false,
      dialogData: { open: false, comp: '' },
      detailsExcelData: []
    };

    this.messageRef = null;
    this._id = props.match.params.id;
  }

  async componentDidMount() {
    await this.getDetails();
    this.handleFirebase();
  }

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
        status: 'pending'
      };
      this.messageRef.push(newItem);
    }
  };

  handleChange = state => {
    this.setState(state);
  };

  handleGetDialogComponent = type => {
    switch (type) {
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
      dialogData: { open: false, comp: '' }
    });
  };

  handleSetDetails = details => {
    this.setState({
      dialogData: { open: false, comp: '' },
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
      <MySpacesDetailsComponent
        {...this.state}
        user={authClass.getUser}
        handleChange={this.handleChange}
        handleSetDetails={this.handleSetDetails}
        handleToggleChat={this.handleToggleChat}
        handleSendMessage={this.handleSendMessage}
        handleDialogClose={this.handleDialogClose}
        handlePicturesClick={this.handlePicturesClick}
        handleGetDialogComponent={this.handleGetDialogComponent}
      />
    );
  }
}

MySpacesDetailsContainer.propTypes = {
  store: PropTypes.shape({
    setWithRender: PropTypes.func,
    setMultiWithRender: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string })
  })
};

export default withStore(MySpacesDetailsContainer);
