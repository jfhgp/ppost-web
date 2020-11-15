import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as authUtil from '../../../utils/auth.util';
import {
  callAfterDebounceTime,
  getSortingFunction,
  getNestedValue,
  isEmpty
} from '../../../utils/functions';
import { authClass } from '../../../utils/auth.util';
import ApiCalls from '../../../service/RequestHandler';
import MyRequestsListComponent from './MyRequestsListComponent';
import routes from '../../../constants/route-constants';
import {
  getContactDetails,
  getVehicleData,
  getPrice
} from '../../../utils/request-details.util';
import moment from 'moment';

export default class MyRequestsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,
      userType: "",
      sortBy: '',
      requests: {},
      // status: 'all',
      status: props.match.params.status || 'all',
      spaceStatus: props.match.params.spaceStatus,
      layout: 'grid',
      fetched: false,
      sortedRequests: [],
      spaceSearch: false,

      search: '',
      pageCount: 1,
      pageNumber: 1,
      per_page_limit: 50,

      detailsExcelData: [],

      fileName: 'My Requests',
      categories: [],
      itemType: { id: '', label: 'Select Item Type', value: "Select Item Type" }
    };

    this.callAfterDebounceTime = callAfterDebounceTime();
    this.shouldListLayoutComponentUpdate = false;
    this.headings = [
      { label: 'Order #', sortBy: 'orderNumber', key: ['orderNumber'] },
      { label: 'Type', sortBy: 'type', key: ['type'] },
      { label: 'Pickup Date', sortBy: 'pickupDate', key: ['pickupDate'] },
      { label: 'Pickup', sortBy: 'pickup', key: ['address'] },
      { label: 'Dropoff', sortBy: 'dropoff', key: ['address'] },
      { label: 'Price', sortBy: 'price', key: ['rates', 'price'] },
      { label: 'Status', sortBy: 'status', key: ['status'] }
    ];
    this.options = [
      { key: 'orderNumber' },
      { key: 'deliveryType', type: 'type' },
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

  async componentDidMount() {
    const user = await authUtil.getUser();
    this.setState({ userType: user.userType });
    this.getRequests(this.state.status);
    this.getCategories();

    // this.getSpaces(this.state.status);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.status !== nextState.status) {
  //     this.getRequests(nextState.status);
  //     return false;
  //   }
  //   return true;
  // }

  getCategories = async () => {
    try {
      const response = await ApiCalls.getCategories();
      this.setState({
        activity: false,
        categories: response.data.map((item, index) => {
          return (
            {
              id: item._id,
              label: item.name,
              value: item.name
            }
          )
        }
        )
      });

    } catch (error) {
      this.setState({ activity: false });
    }
  };

  async filterRequests({ filterType, value }) {
    const props = {
      text: value,
      filterBy: filterType,
      userType: this.state.userType
    }
    console.log("This is props of filter requets", props)
    try {
      const response = await ApiCalls.orderFilter(props);
      console.log("THis is the response of filter api", response.data)
      await this.setState(prevState => ({
        sortBy: '',
        fetched: true,
        activity: false,
        requests: {
          ...prevState.requests,
          [this.state.status]: response.data
        },
        sortedRequests: response.data,
        pageCount: Math.ceil(parseInt(response.total) / response.limit),
        pageNumber: this.state.pageNumber
      }));
      // await this.setExcelData(response.data);
    } catch (error) {
      await this.setState(prevState => ({
        sortBy: '',
        fetched: true,
        activity: false,
        sortedRequests: [],
        requests: {
          ...prevState.requests,
          [this.state.status]: []
        },
        pageCount: 1,
        pageNumber: this.state.pageNumber
      }));
    }
    this.shouldListLayoutComponentUpdate = false;
  }

  async getRequests(status) {
    this.shouldListLayoutComponentUpdate = true;
    if (this.props.match.params.spaceId) {
      this.setState({ spaceSearch: true, activity: true, fetched: false });
    } else {
      this.setState({ status, activity: true, fetched: false });
    }
    try {
      const response = this.props.match.params.spaceId
        ? await ApiCalls.getOrderBySpace({
          _id: this.props.match.params.spaceId,
          status: status
        })
        : await ApiCalls.getMyRequests({
          status,
          pageNumber: this.state.pageNumber
        });
      await this.setState(prevState => ({
        sortBy: '',
        fetched: true,
        activity: false,
        requests: {
          ...prevState.requests,
          [status]: response.data
        },
        sortedRequests: response.data,
        pageCount: Math.ceil(parseInt(response.total) / response.limit),
        pageNumber: this.state.pageNumber
      }));
      // await this.setExcelData(response.data);
    } catch (error) {
      await this.setState(prevState => ({
        sortBy: '',
        fetched: true,
        activity: false,
        sortedRequests: [],
        requests: {
          ...prevState.requests,
          [status]: []
        },
        pageCount: 1,
        pageNumber: this.state.pageNumber
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
    const { name, value, id } = e.target;
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
      // this.props.history.push(
      //   `/${routes.typeTransporter}/${routes.myRequests}/${value}`
      // );
      this.getRequests(value);
    }
    if (name === 'mode') {
      // this.props.history.push(
      //   `/${routes.typeTransporter}/${routes.myRequests}/${value}`
      // );
      this.filterRequests({ filterType: "transport", value });
    }
    if (name === 'spaceStatus') {
      this.props.history.push(
        `/${routes.typeTransporter}/${routes.space}/${this.props.match.params.spaceId}/${value}`
      );

      this.getRequests(value);
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
      <MyRequestsListComponent
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

MyRequestsListContainer.propTypes = {
  history: PropTypes.shape(),
  match: PropTypes.shape({
    params: PropTypes.shape({ status: PropTypes.string })
  })
};
