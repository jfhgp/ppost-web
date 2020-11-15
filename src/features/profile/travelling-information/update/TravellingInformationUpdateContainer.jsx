/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import _ from "lodash";

import { deepClone, capitalize } from '../../../../utils/functions';
import { withStore } from '../../../../utils/store.util';
import ApiCalls from '../../../../service/RequestHandler';
import { continent } from '../../../../utils/location.util';
import { newGrowl } from '../../../../components/ui/GrowlComponent';
import { validateAddInformation } from '../travelling-information-validator';
import TravellingInformationFormComponent from '../TravellingInformationFormComponent';

const INITIAL_DIALOG_DATA = {
  origin: { location: [] },
  destination: { location: [] }
};

class TravellingInformationUpdateContainer extends Component {
  constructor(props) {
    super(props);
    const data = props.componentData;
    const stopOversData = { stopOvers: [] };
    data.stopOvers.forEach((stop, i) => {
      const key = `stopOver-${i + 1}`;
      stopOversData[`${key}-location`] = stop;
      stopOversData[`${key}-date`] = stop.date;
      stopOversData.stopOvers.push(i);
    });

    this.state = {
      errors: {},
      dialogData: INITIAL_DIALOG_DATA,
      activity: false,
      isDialogVisible: false,
      frequency: { value: data.frequency, label: capitalize(data.frequency) },
      // dates: data.dates,
      dates: _.map(data.dates, (date, index) => {
        var d = new Date(date);
        return d;

      }),
      mode: { value: data.mode, label: capitalize(data.mode) },
      originStation: { id: data.originStation ? data.originStation._id : undefined, value: data.originStation ? data.originStation.name : "", label: capitalize(data.originStation ? data.originStation.name : "Select...") },
      originStationOptions: [],
      destinationStation: { id: data.destinationStation ? data.originStation._id : undefined, value: data.destinationStation ? data.destinationStation.name : '', label: capitalize(data.destinationStation ? data.destinationStation.name : "Select...") },
      destinationStationOptions: [],
      returnMode: {
        value: data.returnMode || '',
        label: data.returnMode
          ? capitalize(data.returnMode)
          : 'Select Return Mode'
      },
      origin: data.origin,
      returnDates: _.map(data.returnDates, (date, index) => {
        var d = new Date(date);
        return d;

      }) || '',
      destination: data.destination,
      return: data.return.toString(),
      ...stopOversData,
      customRules: data.customRules,
      originDestinationMessage: ''
    };
  }

  componentDidMount() {

    this.getStations();
  }

  handleSubmit = async e => {
    
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ activity: true });
      const data = deepClone(this.state);
      data.dates = _.map(this.state.dates, (date, index) => {
        return (
          moment(date).format('MM-DD-YYYY')
        )

      });
      data.frequency = data.frequency.value
      data.originStation = data.originStation.id || undefined;
      data.destinationStation = data.destinationStation.id || undefined;
      data.mode = data.mode.value;
      if (data.return === 'false') {
        delete data.returnDates;
        delete data.returnMode;
      } else {
        data.returnMode = data.returnMode.value;
        data.returnDates = _.map(this.state.returnDates, (date, index) => {
          return (
            moment(date).format('MM-DD-YYYY')
          )

        });
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

      try {
        const response = await ApiCalls.updateTransporterDestination({
          _id: this.props.componentData._id,
          travellingInfo: data
        });
        newGrowl.showGrowl(
          'success',
          'Success',
          'Your journey was updated successfully!'
        );
        this.props.handleInformation(response.data.travelling);
      } catch (error) {
        this.setState({ activity: false });
      }
    }
  };

  handleDeleteJourney = e => {
    e.stopPropagation();

    this.props.store.setWithRender('messageDialog', {
      open: true,
      className: 'danger',
      actionBtnLabel: 'Delete',
      title: 'Are you sure you want to delete?',
      action: this.deleteJourney
    });
  };

  deleteJourney = async () => {
    this.setState({ activity: true });

    try {
      const response = await ApiCalls.deleteJourney({
        _id: this.props.componentData._id,
        driver: this.props.profile._id
      });

      newGrowl.showGrowl(
        'success',
        'Success',
        'Your journey was deleted successfully!'
      );
      this.props.handleInformation(response.data.travelling);
    } catch (error) {
      this.setState({ activity: false });
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

  onChangeInput = e => {
    
    const { name, value } = e.target;
    if (name === "mode") {
      this.setState({
        originStation: { id: "", value: '', label: 'Select...' },
        destinationStation: { id: "", value: '', label: 'Select...' },
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

      }
        this.getStations()
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

  getStations = async () => {

    await console.log("This is all state", this.state)
    const { origin, destination, mode } = this.state
    if (origin.location != undefined && (mode.value === "air" || mode.value === "sea")) {

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
    if (destination.location != undefined && (mode.value === "air" || mode.value === "sea")) {

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
        originStation: { id: "", value: '', label: 'Select...' },

      })
    }
    if (name === "destination") {
      this.setState({
        destinationStation: { id: "", value: '', label: 'Select...' },
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
      this.restrictToEU();
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
    console.log("THis is all component data i recieve", this.props.componentData)
    return (
      <TravellingInformationFormComponent
        isEdit
        {...this.state}
        onChangeInput={this.onChangeInput}
        onInputChange={this.onInputChange}
        handleDeleteStopOver={this.handleDeleteStopOver}
        handleAddStopOver={this.handleAddStopOver}
        handleSubmit={this.handleSubmit}
        handleOpenDialog={this.handleOpenDialog}
        handleSelectPlace={this.handleSelectPlace}
        handleCloseDialog={this.handleCloseDialog}
        handleDeleteJourney={this.handleDeleteJourney}
      />
    );
  }
}

TravellingInformationUpdateContainer.propTypes = {
  handleInformation: PropTypes.func,
  profile: PropTypes.object,
  store: PropTypes.shape({ setWithRender: PropTypes.func }),
  componentData: PropTypes.shape({ _id: PropTypes.string })
};

export default withStore(TravellingInformationUpdateContainer);
