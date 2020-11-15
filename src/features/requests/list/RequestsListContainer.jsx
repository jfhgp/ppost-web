import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { authClass } from '../../../utils/auth.util';
import ApiCalls from '../../../service/RequestHandler';
import RequestsListComponent from './RequestsListComponent';
import {
  getSortingFunction,
  getNestedValue,
  isEmpty
} from '../../../utils/functions';
import {
  getContactDetails,
  getVehicleData,
  getPrice
} from '../../../utils/request-details.util';
import moment from 'moment';

export default class RequestsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,

      sortBy: '',
      requests: [],
      layout: 'grid',
      fetched: false,
      sortedRequests: [],

      pickup: '',
      dropoff: '',
      pageCount: 1,
      pageNumber: 1,
      per_page_limit: 50,

      detailsExcelData: [],

      fileName: 'Find Requests'
    };

    this.shouldListLayoutComponentUpdate = false;
    this.headings = [
      { label: 'Order #', sortBy: 'orderNumber', key: ['orderNumber'] },
      { label: 'Type', sortBy: false },
      { label: 'Pickup Date', sortBy: 'pickupDate', key: ['pickupDate'] },
      { label: 'Pickup', sortBy: false },
      { label: 'Dropoff', sortBy: false },
      { label: 'Price', sortBy: 'price', key: ['rates', 'price'] },
      { label: 'Status', sortBy: false }
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
    this.getRequests();
  }

  async getRequests() {
    this.shouldListLayoutComponentUpdate = true;

    try {
      const response = await ApiCalls.getRequestsByPageId({
        _id: this.state.pageNumber
      });
      await this.setState({
        sortBy: '',
        fetched: true,
        activity: false,
        requests: response.data,
        sortedRequests: response.data,
        pageCount: Math.ceil(parseInt(response.total) / response.limit),
        pageNumber: this.state.pageNumber
      });
      await this.setExcelData(response.data);
    } catch (error) {
      await this.setState({
        sortBy: '',
        requests: [],
        fetched: true,
        activity: false,
        sortedRequests: [],
        pageCount: 1,
        pageNumber: this.state.pageNumber
      });
    }
    this.shouldListLayoutComponentUpdate = false;
  }

  handleSearch = async () => {
    this.setState({ activity: true });

    if (!this.state.pickup && !this.state.dropoff) {
      this.getRequests();
    } else {
      this.shouldListLayoutComponentUpdate = true;

      try {
        const response = await ApiCalls.searchByPlace({
          pickup: this.state.pickup,
          dropoff: this.state.dropoff
        });
        await this.setState({
          sortBy: '',
          activity: false,
          requests: response.data,
          sortedRequests: response.data,
          pageCount: Math.ceil(parseInt(response.total) / response.limit),
          pageNumber: this.state.pageNumber
        });
      } catch (error) {
        await this.setState({
          sortBy: '',
          requests: [],
          activity: false,
          sortedRequests: [],
          pageCount: 1,
          pageNumber: 1
        });
      }
      this.shouldListLayoutComponentUpdate = false;
    }
  };

  handleInputChange = async e => {
    const { name, value } = e.target;
    await this.setState({
      [name]: value,
      pageCount: 1,
      pageNumber: 1,
      per_page_limit: 50
    });
  };

  handleSort = async (sortBy, key) => {
    this.shouldListLayoutComponentUpdate = true;
    if (this.state.sortBy && this.state.sortBy === sortBy) {
      await this.setState({
        sortBy: '',
        sortedRequests: this.state.requests
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

  handlePageClick = data => {
    let selected = data.selected;
    this.setState(
      {
        pageNumber: selected + 1
      },
      () => {
        this.getRequests();
      }
    );
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
      details.forEach(async details => {
        contactDetails = getContactDetails(details);
        vehicle =
          (details.vehicle &&
            (await this.getRequestVehicleData(details.vehicle))) ||
          {};
        vehicleData = await getVehicleData(vehicle);

        await detailsArr.push({
          OrderNumber: details.orderNumber || '',
          Status: details.status === 'pending' ? 'Waiting' : details.status,
          DeliveryType: details.deliveryType || '',
          PickupFrom: contactDetails.pickup.name || '',
          PickUpContact: `+${details.contact.number}` || '',
          DeliverTo: contactDetails.deliver.name || '',
          DeliverToContact: `+${contactDetails.deliver.number}` || '',
          Pickup: details.pickup.address || '',
          DropOff: details.dropoff.address || '',
          PickupDate: moment(details.pickupDate).format('ll') || '',
          FlexibleDate: details.flexibleDate,
          PickupTime: details.pickupTime
            ? `${details.pickupTime.from} - ${details.pickupTime.to}`
            : '',
          DeliveryDate: details.deliveryDate
            ? moment(details.deliveryDate).format('ll')
            : '',
          DeliveryTime: details.deliveryTime
            ? `${details.deliveryTime.from} - ${details.deliveryTime.to}`
            : '',
          FlexibleDeliveryDate: details.flexibleDeliveryDate,
          Price:
            details.rates && details.rates.price
              ? `${user.config.currency} ${getPrice(
                  details.rates.price,
                  user.userType
                )}`
              : '-',
          TransporterName: details.transporter
            ? `${details.transporter.firstName} ${details.transporter.lastName}`
            : '',
          TransporterContact: details.transporter
            ? `+${details.transporter.mobile}`
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
      <RequestsListComponent
        {...this.state}
        options={this.options}
        user={authClass.getUser}
        headings={this.headings}
        history={this.props.history}
        handleSort={this.handleSort}
        handleSearch={this.handleSearch}
        handleInputChange={this.handleInputChange}
        shouldListLayoutComponentUpdate={this.shouldListLayoutComponentUpdate}
        handlePageClick={this.handlePageClick}
      />
    );
  }
}

RequestsListContainer.propTypes = {
  history: PropTypes.shape()
};
