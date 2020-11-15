import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import { deepClone } from '../../../../utils/functions';
import ApiCalls from '../../../../service/RequestHandler';
import { continent } from '../../../../utils/location.util';
import { newGrowl } from '../../../../components/ui/GrowlComponent';
import { validateAddInformation } from '../travelling-information-validator';
import TravellingInformationFormComponent from '../TravellingInformationFormComponent';

const INITIAL_DIALOG_DATA = {
  origin: { location: [] },
  stopOvers: { location: [] },
  destination: { location: [] }
};

export default class TravellingInformationAddContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      dialogData: INITIAL_DIALOG_DATA,
      activity: false,
      isDialogVisible: false,

      dates: '',
      mode: { value: '', label: 'Select Mode' },
      originStation: { id: "", value: '', label: 'Select...' },
      originStationOptions: [],
      destinationStation: { id: "", value: '', label: 'Select...' },
      destinationStationOptions: [],
      returnMode: { value: '', label: 'Select Return Mode' },
      origin: {},
      stopOvers: [],
      returnDates: '',
      destination: {},
      return: 'false',
      driver: '',
      customRules: false,
      originDestinationMessage: '',
      frequency: { value: '', label: 'Select Frequency' },
    };
  }

  handleSubmit = async e => {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ activity: true });

      const data = deepClone(this.state);
      data.dates = data.dates;
      data.frequency = data.frequency.value;
      data.mode = data.mode.value;
      data.originStation = data.originStation.id;
      data.destinationStation = data.destinationStation.id;
      data.driver = _.get(this.props.profile, '_id');

      if (data.return === 'false') {
        delete data.returnDates;
        delete data.returnMode;
      } else {
        data.returnMode = data.returnMode.value;
        data.returnDates = data.returnDates;
      }
      delete data.isDialogVisible;
      delete data.dialogData;
      delete data.activity;
      delete data.errors;
      delete data.originDestinationMessage;

      const stopOvers = [];
      data.stopOvers.forEach(stop => {
        const key = `stopOver-${stop + 1}`;
        data[`${key}-location`].date = data[`${key}-date`];
        stopOvers.push(data[`${key}-location`]);
        delete data[`${key}-date`];
        delete data[`${key}-location`];
      });
      data.stopOvers = stopOvers;
      console.log("This is the complete data", data)
      try {

        const response = await ApiCalls.addTransporterDestination({
          travellingInfo: data
        });
        newGrowl.showGrowl('success', 'Success', 'Plan a journey successful!');
        console.log("This is the travelling data response", response.data.travelling)
        this.props.handleInformation(response.data.travelling);
      } catch (error) {
        this.setState({ activity: false });
      }

    }
  };

  onInputChange = event => {
    const { name, value, checked, type } = event.target;
    if (this.state.errors[name]) {
      this.setState(prevState => {
        return {
          [name]: type === 'checkbox' ? checked : value,
          errors: { ...prevState.errors, [name]: false }
          // deliveryType: this.changeDeliveryType({
          //   pickupDate: prevState.pickupDate,
          //   deliveryDate: prevState.deliveryDate,
          //   [name]: value
          // })
        };
      });
    } else {
      this.setState({
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  onChangeInput = async e => {

    const { name, value } = e.target;
    if (name === "mode") {
      this.setState({
        originStation: { value: '', label: 'Select...' },
        destinationStation: { value: '', label: 'Select...' },
      })
    }
    switch (name) {
      case 'return': {
        if (value === 'false') {
          this.setState(prevState => ({
            [name]: value,
            returnDates: '',
            returnMode: { value: '', label: 'Select Mode' },
            errors: { ...prevState.errors, [name]: false }
          }));
        } else {
          this.setState(prevState => ({
            [name]: value,
            errors: { ...prevState.errors, [name]: false }
          }));
        }
        break;
      }
      default: {
        this.setState(prevState => ({
          [name]: value,
          errors: { ...prevState.errors, [name]: false }
        }));

        this.getStations()

      }
    }
  };

  restrictToEU() {
    if (
      this.state.origin.country &&
      this.state.destination.country &&
      continent[this.state.origin.country] !== 'Europe' &&
      continent[this.state.destination.country] !== 'Europe'
    ) {
      this.setState(prevState => ({
        originDestinationMessage:
          'At least one of origin or destination should be in Europe.',
        errors: { ...prevState.errors, origin: true, destination: true }
      }));
    } else {
      this.setState(prevState => ({
        originDestinationMessage: '',
        errors: { ...prevState.errors, origin: false, destination: false }
      }));
    }
  }

  handleOpenDialog = (dialogData = INITIAL_DIALOG_DATA) => {
    this.setState({
      dialogData,
      isDialogVisible: true
    });
  };

  handleCloseDialog = () => {
    this.setState({
      dialogData: INITIAL_DIALOG_DATA,
      isDialogVisible: false
    });
  };

  getStations = async (name) => {
    await console.log("This is all state", this.state)
    const { origin, destination, mode } = this.state
    if (origin.location != undefined && (mode.value === "air" || mode.value === "sea" || mode.value === "train")) {

      const props = {
        location: [
          origin.location[0],
          origin.location[1]
        ],
        type: mode.value
      }
      try {
        const response = await ApiCalls.getStations(props);
        this.setState({
          originStationOptions: response.data.map((item) => {
            return (
              {
                id: item._id,
                value: item.name,
                label: item.name

              }

            );
          })
        })
      }
      catch (error) {
        this.setState({ activity: false });
      }
    }
    if (destination.location != undefined && (mode.value === "air" || mode.value === "sea" || mode.value === "train")) {

      const props = {
        location: [
          destination.location[0],
          destination.location[1]
        ],
        type: mode.value
      }
      try {
        const response = await ApiCalls.getStations(props);
        this.setState({
          destinationStationOptions: response.data.map((item) => {
            return (
              {
                id: item._id,
                value: item.name,
                label: item.name

              }

            );
          })
        })

      } catch (error) {
        this.setState({ activity: false });
      }
    }



  }


  handleSelectPlace = async e => {

    const name = this.state.dialogData.name;
    if (name === "origin") {
      this.setState({
        originStation: { value: '', label: 'Select...' },

      })
    }
    if (name === "destination") {
      this.setState({
        destinationStation: { value: '', label: 'Select...' },
      })
    }
    if (name.indexOf('stopOver') !== -1) {
      this.setState(prevState => ({
        [name]: e,
        errors: { ...prevState.errors, [name]: false }
      }));
    } else {
      await this.setState({ [name]: e });
      this.getStations();
    }

    if (name === 'origin' || name === 'destination') {
      // this.restrictToEU();
    }
  };

  isValid = () => {
    const { isValid, errors } = validateAddInformation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };

  handleAddStopOver = () => {
    this.setState(prevState => ({
      [`stopOver-${prevState.stopOvers.length + 1}-location`]: {
        location: []
      },
      [`stopOver-${prevState.stopOvers.length + 1}-date`]: '',
      stopOvers: [...prevState.stopOvers, prevState.stopOvers.length]
    }));
  };

  handleDeleteStopOver = e => {
    const i = parseInt(e.currentTarget.dataset.index);
    const stopOvers = [...this.state.stopOvers];
    stopOvers.splice(i, 1);
    delete this.state[`stopOver-${i + 1}-location`];
    delete this.state[`stopOver-${i + 1}-date`];
    this.setState({ stopOvers });
  };

  render() {
    return (
      <TravellingInformationFormComponent
        {...this.state}
        onInputChange={this.onInputChange}
        onChangeInput={this.onChangeInput}
        handleDeleteStopOver={this.handleDeleteStopOver}
        handleAddStopOver={this.handleAddStopOver}
        handleSubmit={this.handleSubmit}
        handleOpenDialog={this.handleOpenDialog}
        handleSelectPlace={this.handleSelectPlace}
        handleCloseDialog={this.handleCloseDialog}
      />
    );
  }
}

TravellingInformationAddContainer.propTypes = {
  handleInformation: PropTypes.func,
  id: PropTypes.string,
  profile: PropTypes.object
};
