import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  callAfterDebounceTime,
  getSortingFunction,
  getNestedValue,
  isEmpty
} from '../../../utils/functions';
import { authClass } from '../../../utils/auth.util';
import ApiCalls from '../../../service/RequestHandler';
import MyRequestsListComponent from '../../my-requests/list/MyRequestsListComponent';
import {
  getContactDetails,
  getVehicleData,
  getPrice
} from '../../../utils/request-details.util';
import moment from 'moment';

export default class MyDriversRequestsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,

      sortBy: '',
      requests: {},
      status: 'all',
      layout: 'grid',
      fetched: false,
      sortedRequests: [],

      search: '',

      detailsExcelData: [],

      fileName: 'Driver Requests'
    };

    this.callAfterDebounceTime = callAfterDebounceTime();
    this.shouldListLayoutComponentUpdate = false;
    this.headings = [
      { label: 'Order #', sortBy: 'orderNumber', key: ['orderNumber'] },
      { label: 'Type', sortBy: false },
      { label: 'Pickup Date', sortBy: 'pickupDate', key: ['pickupDate'] },
      { label: 'Pickup', sortBy: false },
      { label: 'Dropoff', sortBy: false },
      { label: 'Price', sortBy: 'price', key: ['rates', 'price'] },
      { label: 'Status', sortBy: 'status', key: ['status'] }
    ];
    this.options = [
      { key: 'orderNumber' },
      { key: 'deliveryType' },
      {
        keys: ['pickupDate'],
        getLabel: true,
        type: 'date',
        format: 'DD, MMM, YYYY'
      },
      {
        keys: ['pickup', 'address'],
        type: 'address',
        getLabel: true
      },
      {
        keys: ['dropoff', 'address'],
        type: 'address',
        getLabel: true
      },
      { keys: ['rates', 'price'], type: 'price', getLabel: true },
      { key: 'status' }
    ];
  }

  componentDidMount() {
    this.getMyDriversRequests(this.state.status);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.status !== nextState.status) {
      this.getMyDriversRequests(nextState.status);
      return false;
    }
    return true;
  }

  async getMyDriversRequests(status) {
    this.shouldListLayoutComponentUpdate = true;
    this.setState({ status, activity: true, fetched: false });
    try {
      const response = await ApiCalls.getMyDriversRequests({
        status
      });
      await this.setState(prevState => ({
        sortBy: '',
        fetched: true,
        activity: false,
        requests: {
          ...prevState.requests,
          [status]: response.data
        },
        sortedRequests: response.data
      }));
      // eslint-disable-next-line no-console
      console.log('This is the driver request all', this.state);
      await this.setExcelData(response.data);
    } catch (error) {
      this.setState(prevState => ({
        sortBy: '',
        fetched: true,
        activity: false,
        sortedRequests: [],
        requests: {
          ...prevState.requests,
          [status]: []
        }
      }));
    }
    this.shouldListLayoutComponentUpdate = false;
  }

  handleSearch = async value => {
    this.setState({ activity: true });
    this.shouldListLayoutComponentUpdate = true;

    try {
      const response = await ApiCalls.searchMyDriversOrders({
        text: value
      });
      await this.setState(prevState => ({
        sortBy: '',
        activity: false,
        sortedRequests: response.data,
        requests: { ...prevState.requests, [prevState.status]: response.data }
      }));
    } catch (error) {
      await this.setState(prevState => ({
        sortBy: '',
        activity: false,
        sortedRequests: [],
        requests: {
          ...prevState.requests,
          [prevState.status]: []
        }
      }));
    }
    this.shouldListLayoutComponentUpdate = false;
  };

  handleOnInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (name === 'search') {
      this.callAfterDebounceTime(() => this.handleSearch(value), {
        clear: !value
      });
      if (!value) {
        this.getMyDriversRequests(this.state.status);
      }
    }
  };

  handleSort = async (sortBy, key) => {
    this.shouldListLayoutComponentUpdate = true;
    if (this.state.sortBy && this.state.sortBy === sortBy) {
      await this.setState({
        sortBy: '',
        sortedRequests: this.state.requests[this.state.status]
      });
    } else {
      const requests = [...this.state.sortedRequests];
      const sortingFunction = getSortingFunction(sortBy);
      await this.setState({
        sortBy,
        sortedRequests: requests.sort((a, b) =>
          sortingFunction(getNestedValue(a, key), getNestedValue(b, key))
        )
      });
    }
    this.shouldListLayoutComponentUpdate = false;
  };

  getRequestVehicleData = async id => {
    try {
      const response = await ApiCalls.getVehicleById({ _id: id });
      const vehicleData = await response.data;
      return vehicleData;
    } catch (error) {
      //
    }
  };

  setExcelData = async details => {
    let detailsArr = [];
    let contactDetails;
    let vehicle;
    let vehicleData;
    const user = authClass.getUser;

    details.length &&
      details.forEach(async (details_, i) => {
        contactDetails = getContactDetails(details_);
        vehicle =
          (details_.vehicle &&
            (await this.getRequestVehicleData(details_.vehicle))) ||
          {};
        vehicleData = getVehicleData(vehicle);

        await detailsArr.push({
          OrderNumber: details_.orderNumber || '',
          Status: details_.status === 'pending' ? 'Waiting' : details_.status,
          DeliveryType: details_.deliveryType || '',
          PickupFrom: contactDetails.pickup.name || '',
          PickUpContact: `+${details_.contact.number}` || '',
          DeliverTo: contactDetails.deliver.name || '',
          DeliverToContact: `+${contactDetails.deliver.number}` || '',
          Pickup: details_.pickup.address || '',
          DropOff: details_.dropoff.address || '',
          PickupDate: moment(details_.pickupDate).format('ll') || '',
          FlexibleDate: details_.flexibleDate,
          PickupTime: details_.pickupTime
            ? `${details_.pickupTime.from} - ${details_.pickupTime.to}`
            : '',
          DeliveryDate: details_.deliveryDate
            ? moment(details_.deliveryDate).format('ll')
            : '',
          DeliveryTime: details_.deliveryTime
            ? `${details_.deliveryTime.from} - ${details_.deliveryTime.to}`
            : '',
          FlexibleDeliveryDate: details_.flexibleDeliveryDate,
          Price:
            details_.rates && details_.rates.price
              ? `${user.config.currency} ${getPrice(
                  details_.rates.price,
                  user.userType
                )}`
              : '-',
          TransporterName: details_.transporter
            ? `${details_.transporter.firstName} ${details_.transporter.lastName}`
            : '',
          TransporterContact: details_.transporter
            ? `+${details_.transporter.mobile}`
            : '',
          TransporterVehicleMode: !isEmpty(vehicle) ? vehicleData.mode : '',
          TransporterVehicleModel: !isEmpty(vehicle)
            ? `${vehicleData.model}`
            : '',

          TransporterVehicleNumber: !isEmpty(vehicle)
            ? `${vehicleData['number plate']}`
            : ''
        });
      });

    await this.setState({ detailsExcelData: detailsArr });
  };

  render() {
    return (
      <MyRequestsListComponent
        {...this.state}
        options={this.options}
        user={authClass.getUser}
        headings={this.headings}
        handleSort={this.handleSort}
        history={this.props.history}
        pageTitle="My Driver's Requests"
        onInputChange={this.handleOnInputChange}
        searchPlaceholder="Search Driver Requests"
        shouldListLayoutComponentUpdate={this.shouldListLayoutComponentUpdate}
      />
    );
  }
}

MyDriversRequestsListContainer.propTypes = {
  history: PropTypes.shape()
};
