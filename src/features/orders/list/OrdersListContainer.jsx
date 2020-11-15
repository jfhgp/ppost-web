/* eslint-disable no-console */
import React, { Component } from 'react';

import { authClass } from '../../../utils/auth.util';
import ApiCalls from '../../../service/RequestHandler';
import OrdersListComponent from './OrdersListComponent';
import {
  callAfterDebounceTime,
  getSortingFunction,
  getNestedValue
} from '../../../utils/functions';
import moment from 'moment';
import {
  getContactDetails,
  getPrice
} from '../../../utils/request-details.util';
export default class OrdersListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,

      sortBy: '',
      requests: {},
      status: props.match.params.status || 'all',
      layout: 'grid',
      sortedRequests: [],
      search: '',
      detailsExcelData: [],
      fileName: 'My Requests'
    };

    this.shouldListLayoutComponentUpdate = false;
    this.callAfterDebounceTime = callAfterDebounceTime();
    this.headings = [
      { label: 'Order #', sortBy: 'orderNumber', key: ['orderNumber'] },
      { label: 'Type', sortBy: 'deliveryType', key: ['deliveryType'] },
      { label: 'Pickup Date', sortBy: 'pickupDate', key: ['pickupDate'] },
      { label: 'Pickup', sortBy: 'address', keys: ['pickup', 'address'] },
      { label: 'Dropoff', sortBy: 'pickupDate', key: ['dropoff', 'address'] },
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
    this.getRequests(this.state.status);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.status !== this.state.status) {
      this.getRequests();
    }
  }

  async getRequests() {
    const { status } = this.state;
    this.setState({ activity: true });
    this.shouldListLayoutComponentUpdate = true;

    try {
      const response = await ApiCalls.getMyRequests({
        status
      });

      await this.setState(prevState => {
        return {
          sortBy: '',
          activity: false,
          requests: {
            ...prevState.requests,
            [status]: response.data
          },
          sortedRequests: response.data
        };
      });
      await this.setExcelData(response.data);
    } catch (error) {
      await this.setState(prevState => ({
        sortBy: '',
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
      const response = await ApiCalls.searchMyOrders({
        text: value,
        userType: 'user'
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
        this.getRequests();
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

  setExcelData = async details => {
    let detailsArr = [];
    let contactDetails;
    const user = authClass.getUser;
    details.length &&
      details.forEach(async details => {
        contactDetails = getContactDetails(details);

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
            : ''
          //   TransporterVehicleMode: !isEmpty(vehicle) ? vehicleData.mode : '',
          //   TransporterVehicleModel: !isEmpty(vehicle)
          //     ? `${vehicleData.model}`
          //     : '',
          //   TransporterVehicleNumber: !isEmpty(vehicle)
          //     ? `${vehicleData['number plate']}`
          //     : ''
        });
      });
    await this.setState({ detailsExcelData: detailsArr });
  };

  render() {
    return (
      <OrdersListComponent
        {...this.state}
        options={this.options}
        user={authClass.getUser}
        headings={this.headings}
        handleSort={this.handleSort}
        onInputChange={this.handleOnInputChange}
        shouldListLayoutComponentUpdate={this.shouldListLayoutComponentUpdate}
      />
    );
  }
}
