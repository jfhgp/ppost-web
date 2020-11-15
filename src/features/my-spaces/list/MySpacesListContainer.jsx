/* eslint-disable no-console */
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
import MySpacesListComponent from './MySpacesListComponent';
import routes from '../../../constants/route-constants';
import {
  getContactDetails,
  getVehicleData,
  getPrice
} from '../../../utils/request-details.util';
import moment from 'moment';

export default class MySpacesListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,

      sortBy: '',
      spaces: [],
      requests: {},
      // status: 'all',
      status: props.match.params.status || 'all',
      layout: 'grid',
      fetched: false,
      sortedRequests: [],

      search: '',
      pageCount: 1,
      pageNumber: 1,
      per_page_limit: 50,

      detailsExcelData: [],

      fileName: 'My Requests'
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
    // this.getRequests(this.state.status);
    this.getSpaces();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.status !== nextState.status) {
      this.getRequests(nextState.status);
      return false;
    }
    return true;
  }

  getSpaces = async () => {
    try {
      const response = await ApiCalls.getMySpaces();
      await this.setState({
        sortBy: '',
        fetched: true,
        activity: false,
        spaces: response.data,
        sortedRequests: response.data,
        pageCount: Math.ceil(parseInt(response.total) / response.limit),
        pageNumber: this.state.pageNumber
      });
    } catch (error) {
      console.log(error);
    }
  };
  // async getRequests(status) {
  //   this.shouldListLayoutComponentUpdate = true;
  //   this.setState({ status, activity: true, fetched: false });

  //   try {
  //     const response = await ApiCalls.getMyRequests({
  //       status,
  //       pageNumber: this.state.pageNumber
  //     });

  //     await this.setState(prevState => ({
  //       sortBy: '',
  //       fetched: true,
  //       activity: false,
  //       requests: {
  //         ...prevState.requests,
  //         [status]: response.data
  //       },
  //       sortedRequests: response.data,
  //       pageCount: Math.ceil(parseInt(response.total) / response.limit),
  //       pageNumber: this.state.pageNumber
  //     }));
  //     await this.setExcelData(response.data);
  //   } catch (error) {
  //     await this.setState(prevState => ({
  //       sortBy: '',
  //       fetched: true,
  //       activity: false,
  //       sortedRequests: [],
  //       requests: {
  //         ...prevState.requests,
  //         [status]: []
  //       },
  //       pageCount: 1,
  //       pageNumber: this.state.pageNumber
  //     }));
  //   }
  //   this.shouldListLayoutComponentUpdate = false;
  // }

  handleSearch = async value => {
    this.setState({ activity: true });
    this.shouldListLayoutComponentUpdate = true;

    try {
      const response = await ApiCalls.searchMyOrders({
        text: value,
        userType: 'transporter'
      });
      await this.setState(prevState => ({
        sortBy: '',
        activity: false,
        sortedRequests: response.data,
        requests: { ...prevState.requests, [prevState.status]: response.data },
        pageCount: Math.ceil(parseInt(response.total) / response.limit),
        pageNumber: this.state.pageNumber
      }));
    } catch (error) {
      await this.setState(prevState => ({
        sortBy: '',
        activity: false,
        sortedRequests: [],
        requests: {
          ...prevState.requests,
          [prevState.status]: []
        },
        pageCount: 1,
        pageNumber: 1
      }));
    }
    this.shouldListLayoutComponentUpdate = false;
  };

  handleOnInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      pageCount: 1,
      pageNumber: 1,
      per_page_limit: 50
    });

    if (name === 'search') {
      this.callAfterDebounceTime(() => this.handleSearch(value), {
        clear: !value
      });

      if (!value) {
        this.getRequests(this.state.status);
      }
    }
    if (name === 'status') {
      this.props.history.push(
        `/${routes.typeTransporter}/${routes.myRequests}/${value}`
      );
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

  handlePageClick = data => {
    let selected = data.selected;
    this.setState(
      {
        pageNumber: selected + 1
      },
      () => {
        this.getRequests(this.state.status);
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
      <MySpacesListComponent
        {...this.state}
        user={authClass.getUser}
        options={this.options}
        headings={this.headings}
        handleSort={this.handleSort}
        history={this.props.history}
        onInputChange={this.handleOnInputChange}
        shouldListLayoutComponentUpdate={this.shouldListLayoutComponentUpdate}
        handlePageClick={this.handlePageClick}
      />
    );
  }
}

MySpacesListContainer.propTypes = {
  history: PropTypes.shape(),
  match: PropTypes.shape({
    params: PropTypes.shape({ status: PropTypes.string })
  })
};
