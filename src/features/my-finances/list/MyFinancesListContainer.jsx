import React, { Component } from 'react';
import _ from "lodash";
import { authClass } from '../../../utils/auth.util';
import ApiCalls from '../../../service/RequestHandler';
import { validateSearch } from '../my-finances-validations';
import MyFinancesListComponent from './MyFinancesListComponent';

export default class MyFinancesListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      myVehicles: [],
      status: [],
      categories: [],
      activity: true,
      filterResults: null,
      myFinances: undefined,
      dialogData: undefined,
      isDialogVisible: false,
      myDrivers: [
        { _id: authClass.getUser._id, firstName: 'Me', lastName: '' }
      ],

      pickup: '',
      dropoff: '',
      vehicles: [],
      endDate: null,
      startDate: null,
      transporterIds: [],
      categoriesIds: [],

      //multiSelect component state
      focusedValue: -1,
      isFocused: false,
      MultiSelectOpen: false,
    };
  }

  componentDidMount() {
    this.getMyFinanceHistory();
    this.getMyDrivers();
    this.getMyVehicles();
    this.getCategories();
  }

  getMyFinanceHistory = async () => {
    try {
      const response = await ApiCalls.getFinanceByTransporter(
        authClass.getUser._id
      );
      this.setState({ activity: false, myFinances: response.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  // get item categories
  getCategories = async () => {
    try {
      const response = await ApiCalls.getCategories();
      this.setState({ activity: false, categories: response.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  async getMyDrivers() {
    try {
      const response = await ApiCalls.getMyDrivers();
      const myDrivers = response.data;
      myDrivers.push({
        _id: authClass.getUser._id,
        firstName: 'Me',
        lastName: ''
      });
      this.setState({ myDrivers });
    } catch (error) {
      //
    }
  }

  async getMyVehicles() {
    try {
      const response = await ApiCalls.getMyVehicles();
      this.setState({ myVehicles: response.data });
    } catch (error) {
      //
    }
  }

  getCategories = async () => {
    try {
      const response = await ApiCalls.getCategories();
      this.setState({ activity: false, categories: response.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleSearch = async e => {
    e.preventDefault();
    if (this.isValid()) {
      try {
        this.setState({ activity: true });
        const response = await ApiCalls.getFinanceReport(
          authClass.getUser._id,
          this.getSearchData()
        );
        if (this.state.status[0] != null) {
          if (this.state.status.toLowerCase() === "all") {
            this.setState({ activity: false, filterResults: response.data.finance });
          }
          else {
            var filter = _.filter(response.data.finance, {
              'status': this.state.status.toLowerCase() === "unpaid" ? "pending" : this.state.status.toLowerCase()
            });
            this.setState({ activity: false, filterResults: filter });
          }

        }
        else {
          this.setState({ activity: false, filterResults: response.data.finance });

        }


      } catch (error) {
        this.setState({ activity: false });
      }
    }
  };

  handleChangeMultiple = event => {
    const { id, name } = event.currentTarget.dataset;

    if (this.state.errors[name]) {
      this.setState(prevState => {
        const [...ids_] = prevState[name];
        const index = ids_.indexOf(id);

        if (index === -1) {
          ids_.push(id);
        } else {
          ids_.splice(index, 1);
        }

        return {
          [name]: ids_,
          errors: {
            endDate: false,
            vehicles: false,
            startDate: false,
            categories: false,
            transporterIds: false,
            status: false,
            pickup: false,
            dropoff: false,
            categories: false
          }
        };
      });
    } else {
      this.setState(prevState => {
        const [...ids_] = prevState[name];
        const index = ids_.indexOf(id);

        if (index === -1) {
          ids_.push(id);
        } else {
          ids_.splice(index, 1);
        }

        return { [name]: ids_ };
      });
    }
  };

  handleChange = e => {
    const { name, value } = e.target;

    if (this.state.errors[name]) {
      this.setState({
        [name]: value,
        errors: {
          endDate: false,
          vehicles: false,
          startDate: false,
          transporterIds: false,
          pickup: false,
          status: false,
          dropoff: false,
          status: false,
          categoriesIds: false
        }
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleClearFilters = () => {
    this.setState({
      pickup: '',
      dropoff: '',
      endDate: '',
      vehicles: [],
      startDate: '',
      status: '',
      transporterIds: [],
      filterResults: null,
      categoriesIds: []
    });
  };

  handleSetDialogData = dialogData => {
    this.setState({ dialogData, isDialogVisible: true });
  };

  handleDialogClose = () => {
    this.setState({ isDialogVisible: false });
  };

  isValid() {
    const { isValid, errors } = validateSearch(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  getSearchData() {
    const data = {};
    if (this.state.transporterIds.length) {
      data.transporterIds = this.state.transporterIds;
    }
    if (this.state.vehicles.length) {
      data.vehicles = this.state.vehicles;
    }
    // if (this.state.categories.length) {
    //   data.categories = this.state.categories;
    // }
    if (this.state.startDate) {
      data.startDate = this.state.startDate.format('YYYY-MM-DD');
    }
    if (this.state.endDate) {
      data.endDate = this.state.endDate.format('YYYY-MM-DD');
    }
    if (this.state.pickup) {
      data.pickup = this.state.pickup;
    }
    if (this.state.dropoff) {
      data.dropoff = this.state.dropoff;
    }
    if (this.state.categoriesIds.length) {
      data.itemType = this.state.categoriesIds;
    }
    return data;
  }

  render() {
    return (
      <MyFinancesListComponent
        {...this.state}
        user={authClass.getUser}
        handleSearch={this.handleSearch}
        handleChange={this.handleChange}
        handleDialogClose={this.handleDialogClose}
        handleClearFilters={this.handleClearFilters}
        handleSetDialogData={this.handleSetDialogData}
        handleChangeMultiple={this.handleChangeMultiple}

      />
    );
  }
}

MyFinancesListContainer.propTypes = {};
