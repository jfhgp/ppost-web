import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  validateAddItemOpen,
  validateSubmitOrderOpen
} from '../orders/orders-validator';
import GetRatesComponent from './GetRatesComponent';
import routes from '../../constants/route-constants';
import ApiCalls from '../../service/RequestHandler';
import { continent } from '../../utils/location.util';
import { newGrowl } from '../../components/ui/GrowlComponent';
import { convertWeight, convertMeasurement } from '../../utils/unit.util';
import { authClass } from '../../utils/auth.util';
import * as authUtil from "../../utils/auth.util";

const INITIAL_STATE = {
  activity: false,
  userType: "",
  promo: '',
  pickup: {},
  dropoff: {},
  commodities: [],
  promoObject: {},
  deliveryType: { value: '', label: 'Select Delivery Type' },

  itemName: '',
  itemWidth: '',
  itemLength: '',
  itemWeight: '',
  itemHeight: '',
  itemQuantity: '',
  itemType: { _id: '', name: 'Select Item Type' },

  rates: {},
  errors: {},
  getRate: false,
  categories: [],
  dialogData: {},
  isDialogOpen: false,
  pickupDropOffMessage: '',
  currency: { value: 'EUR', label: 'Euro' },
  weightUnit: { value: 'kg', label: 'Kilogram' },
  measurementUnit: { value: 'm', label: 'Meter' }
};

const normalizeData = state => {
  let data = {};
  data = {
    totalWidth: 0,
    totalWeight: 0,
    totalHeight: 0,
    totalLength: 0,
    priceImpact: 0,
    pickup: state.pickup,
    dropoff: state.dropoff,
    deliveryType: state.deliveryType.value,
    config: {
      currency: state.currency.value,
      weightUnit: state.weightUnit.value,
      measurementUnit: state.measurementUnit.value
    },
    ...(state.promo ? { promo: state.promo } : {})
  };

  state.commodities.forEach(item => {
    data.priceImpact +=
      parseInt(item.itemType.priceImpact) * parseInt(item.quantity);
    data.totalWidth += parseInt(item.width) * parseInt(item.quantity);
    data.totalHeight += parseInt(item.height) * parseInt(item.quantity);
    data.totalLength += parseInt(item.length) * parseInt(item.quantity);
    data.totalWeight += parseInt(item.weight) * parseInt(item.quantity);
  });
  return data;
};

// types of conversion
const conversion = {
  weight: convertWeight,
  measurement: convertMeasurement
};

// get conversion config for different types
const getConfig = name => {
  switch (name) {
    case 'weightUnit': {
      return {
        type: 'weight',
        names: ['itemWeight']
      };
    }
    default: {
      return {
        type: 'measurement',
        names: ['itemWidth', 'itemHeight', 'itemLength']
      };
    }
  }
};

export default class GetRatesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.mapComponentRef = null;
  }

  async componentDidMount() {
    const user = await authUtil.getUser();
    if (user) {
      const userType = user.userType;
      console.log("THis is the usertype of user", user.userType)
      this.setState({ userType });
    }
    const rates = await authUtil.getRatesData();
    if (rates) {
      this.setState({
        pickup: rates.pickup,
        dropoff: rates.dropoff,
        itemName: rates.itemName,
        itemWidth: rates.itemWidth,
        itemLength: rates.itemLength,
        itemWeight: rates.itemWeight,
        itemHeight: rates.itemHeight,
        itemQuantity: rates.itemQuantity,
        itemType: { _id: rates.itemType._id, name: rates.itemType.name },
        commodities: rates.commodities,
        deliveryType: { value: rates.deliveryType.value, label: rates.deliveryType.label },
        currency: { value: rates.currency ? rates.currency.value : 'EUR', label: rates.currency ? rates.currency.label : 'Euro' },
        weightUnit: { value: rates.weightUnit ? rates.weightUnit.value : "kg", label: rates.weightUnit ? rates.weightUnit.label : "Kilogram" },
        measurementUnit: { value: rates.measurementUnit ? rates.measurementUnit.value : "m", label: rates.measurementUnit ? rates.measurementUnit.label : "meter" },
        ...rates
      })
    } else {
      this.state = INITIAL_STATE;
    }
    this.getCategories();
  }

  componentWillUpdate(nextProps, nextState) {
    authUtil.setRatesData(nextState);
  }

  // get item categories
  getCategories = async () => {
    try {
      const response = await ApiCalls.getCategories();
      this.setState({ activity: false, categories: response.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleEstimateOrder = async () => {
    if (this.isValid()) {
      this.setState({ activity: true, getRate: false });
      const data = normalizeData(this.state);
      try {
        const response = await ApiCalls.getEstimation(data);
        const { rates, promo } = response.data;
        this.setState({
          activity: false,
          getRate: true,
          rates,
          ...(promo ? { promoObject: promo } : {})
        });
      } catch (error) {
        this.setState({ activity: false, getRate: false });
        try {
          newGrowl.showGrowl('error', 'Error', error.response.data.message);
        } catch (error) {
          //
        }
      }
    }
  };

  handleAddRequest = () => {
    const { userType } = this.state
    if (userType === "user") {
      this.props.history.push(`/${routes.typeUser}/${routes.orders}/${routes.addOrder}`);
    }
    else {
      this.props.handleLoginModalOpen()
    }
  }

  handleChange = event => {
    const { name, value } = event.target;

    if (this.state.errors[name]) {
      this.setState(prevState => {
        return {
          [name]: value,
          errors: { ...prevState.errors, [name]: false },
          getRate: prevState.getRate === true && name === 'currency'
        };
      });
    } else {
      this.setState(prevState => ({
        [name]: value,
        getRate: prevState.getRate === true && name === 'currency'
      }));
    }
  };

  restrictToEU() {
    if (
      this.state.dropoff.country &&
      this.state.pickup.country &&
      continent[this.state.dropoff.country] !== 'Europe' &&
      continent[this.state.pickup.country] !== 'Europe'
    ) {
      this.setState(prevState => ({
        pickupDropOffMessage:
          'At least one location (either origin or destination of parcel) should be in Europe',
        errors: { ...prevState.errors, pickup: true, dropoff: true }
      }));
    } else {
      this.setState(prevState => ({
        pickupDropOffMessage: '',
        errors: { ...prevState.errors, pickup: false, dropoff: false }
      }));
    }
  }

  isValid = () => {
    const { errors, isValid } = validateSubmitOrderOpen(this.state);
    if (!isValid) {
      this.setState(prevState => ({
        errors: { ...prevState.errors, ...errors }
      }));
    }
    return isValid;
  };

  handleAddItem = () => {
    if (this.isAddItemValid(this.state)) {
      const commodities = [...this.state.commodities];
      commodities.push({
        name: this.state.itemName,
        quantity: this.state.itemQuantity,
        weight: this.state.itemWeight,
        length: this.state.itemLength,
        width: this.state.itemWidth,
        height: this.state.itemHeight,
        itemType: this.state.itemType
      });

      if (this.state.errors.commodities) {
        this.setState(prevState => ({
          commodities,
          itemName: '',
          itemHeight: '',
          itemLength: '',
          itemQuantity: '',
          itemWeight: '',
          itemWidth: '',
          itemType: { _id: '', name: 'Select Item Type' },
          errors: { ...prevState.errors, commodities: false },
          getRate: false
        }));
      } else {
        this.setState({
          commodities,
          itemName: '',
          itemHeight: '',
          itemLength: '',
          itemQuantity: '',
          itemWeight: '',
          itemWidth: '',
          itemType: { _id: '', name: 'Select Item Type' },
          getRate: false
        });
      }
    }
  };

  handleDeleteItem = i => {
    const commodities = this.state.commodities.filter(
      (item, index) => index !== i
    );
    this.setState({ commodities, getRate: false });
  };

  isAddItemValid = data => {
    const { errors, isValid } = validateAddItemOpen(data);
    if (!isValid) {
      this.setState(prevState => ({
        errors: { ...prevState.errors, ...errors }
      }));
    }
    return isValid;
  };

  handleDialogVisibility = (value, data = {}) => {
    this.setState({
      dialogData: typeof value === 'boolean' ? data : {},
      isDialogOpen: typeof value === 'boolean' ? value : false
    });
  };

  handleDialogCallback = async e => {
    const name = this.state.dialogData.name;
    await this.setState({ [name]: e });
    this.mapComponentRef.setZoomForSingleMarker(e.location);
    this.restrictToEU();
  };

  handlePreferencesChange = e => {
    const { name, value } = e.target;
    const config = getConfig(name);

    const state = { [name]: value };
    config.names.forEach(item => {
      state[item] = conversion[config.type](
        this.state[name].value,
        value.value,
        this.state[item]
      );
    });

    if (this.state.commodities.length) {
      state.getRate = false;
      state.commodities = this.rebuildCommodities(config.type, value);
    }

    this.setState(state);
  };

  rebuildCommodities(type, value) {
    const commodities = [...this.state.commodities];

    if (type === 'weight') {
      commodities.forEach(item => {
        item.weight = convertWeight(
          this.state.weightUnit.value,
          value.value,
          item.weight
        );
      });
    } else {
      commodities.forEach(item => {
        item.length = convertMeasurement(
          this.state.measurementUnit.value,
          value.value,
          item.length
        );
        item.width = convertMeasurement(
          this.state.measurementUnit.value,
          value.value,
          item.width
        );
        item.height = convertMeasurement(
          this.state.measurementUnit.value,
          value.value,
          item.height
        );
      });
    }
    return commodities;
  }

  handleMapComponentRef = ref => (this.mapComponentRef = ref);

  render() {
    return (
      <GetRatesComponent
        {...this.state}
        handleChange={this.handleChange}
        handleAddItem={this.handleAddItem}
        handleDeleteItem={this.handleDeleteItem}
        mapComponentRef={this.handleMapComponentRef}
        handleEstimateOrder={this.handleEstimateOrder}
        handleAddRequest={this.handleAddRequest}
        handleDialogCallback={this.handleDialogCallback}
        handleDialogVisibility={this.handleDialogVisibility}
        handlePreferencesChange={this.handlePreferencesChange}
        handleLoginModalOpen={this.props.handleLoginModalOpen}
      />
    );
  }
}

GetRatesContainer.propTypes = {
  handleLoginModalOpen: PropTypes.func
};
