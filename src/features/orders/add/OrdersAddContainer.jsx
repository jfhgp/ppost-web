import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import {
  readImageAsBase64,
  uploadFile,
  generateOrderNumber
} from '../../../utils/functions';
import { authClass } from '../../../utils/auth.util';
import OrdersAddComponent from './OrdersAddComponent';
import { withStore } from '../../../utils/store.util';
import ApiCalls from '../../../service/RequestHandler';
import { continent } from '../../../utils/location.util';
import { newGrowl } from '../../../components/ui/GrowlComponent';
import { validateAddItem, validateSubmitOrder } from '../orders-validator';
import { timeFormat } from '../../../constants/project-constants';
import * as authUtil from "../../../utils/auth.util";
import ChangeUnitsComponent from '../details/components/ChangeUnitsComponent';
import AddOtherCommodity from '../details/components/AddOtherCommodity';


const INITIAL_STATE = {
  config: '',
  activity: true,
  user: authClass.getUser,
  to: null,
  promo: '',
  from: null,
  pickup: {},
  dropoff: {},
  commodities: [],
  promoObject: {},
  pickupDate: null,
  deliveryDate: null,
  flexibleDate: false,
  deliveryTimeTo: null,
  deliveryTimeFrom: null,
  flexibleDeliveryDate: false,
  allowMultipleRoutes: false,
  needHelper: false,
  type: { value: '', label: 'Select Type' },
  transportersType: { id: '', value: '', label: 'Transporters' },
  deliveryType: { value: '', label: 'Delivery Type' },
  preferredMode: { value: '', label: 'Mode' },
  transporters: [],
  itemName: '',
  itemWidth: '',
  itemLength: '',
  itemWeight: '',
  itemHeight: '',
  itemImages: [],
  contactName: '',
  itemQuantity: '',
  contactNumber: '',
  notes: '',
  itemType: { _id: '', name: 'Select Item Type' },
  bonus: "",

  files: [],
  rates: {},
  errors: {},
  getRate: false,
  categories: [],

  dialogData: {},
  isDialogOpen: false,
  pickupDropOffMessage: '',
  dialogChangeUnits: { open: false, comp: '' },
  weightUnit: { value: '', label: 'Weight' },
  currency: { value: '', label: 'Currency' },
  language: { value: '', label: 'Language' },
  measurementUnit: { value: '', label: 'Measurement' },
  commodityName: "",
  territory: ""
};

const normalizeData = (type, state, contactNumber) => {
  let data = {};
  if (type === 'rates') {
    data = {
      type: state.type.value,
      pickup: state.pickup,
      dropoff: state.dropoff,
      deliveryType: state.deliveryType.value,
      preferredMode: state.preferredMode.value,
      transporter: state.transportersType.value.value,
      commodities: [],
      totalWeight: 0,
      totalWidth: 0,
      totalHeight: 0,
      totalLength: 0,
      priceImpact: 0,
      bonus: state.bonus,
      territory: state.territory,
      ...(state.promo ? { promo: state.promo } : {})
    };
  }

  if (type === 'submit') {
    data = {
      bonus: state.bonus,
      territory: state.territory,
      pickup: state.pickup,
      dropoff: state.dropoff,
      deliveryType: state.deliveryType.value,
      preferredMode: state.preferredMode.value,
      preferredTransporter: state.transportersType.id,
      type: state.type.value,
      commodities: [],
      pickupDate: moment(state.pickupDate).format('M/DD/YYYY'),
      deliveryDate: moment(state.deliveryDate).format('M/DD/YYYY'),
      flexibleDate: state.flexibleDate,
      allowMultipleRoutes: state.allowMultipleRoutes,
      needHelper: state.needHelper,
      notes: state.notes,
      flexibleDeliveryDate: state.flexibleDeliveryDate,
      ...(state.flexibleDate
        ? {
          pickupTime: {
            from: '00:00',
            to: '00:00'
          }
        }
        : {
          pickupTime: {
            from: moment(state.from).format(timeFormat),
            to: moment(state.to).format(timeFormat)
          }
        }),
      ...(state.flexibleDeliveryDate
        ? {
          deliveryTime: {
            from: '00:00',
            to: '00:00'
          }
        }
        : {
          deliveryTime: {
            from: moment(state.deliveryTimeFrom).format(timeFormat),
            to: moment(state.deliveryTimeTo).format(timeFormat)
          }
        }),
      contact: {
        name: state.contactName,
        number: contactNumber
      },
      totalWeight: 0,
      totalWidth: 0,
      totalHeight: 0,
      totalLength: 0,
      priceImpact: 0,
      ...(state.promoObject._id ? { promo: state.promoObject._id } : {})
    };
  }

  state.commodities.forEach(item => {
    if (type === 'submit') {
      data.commodities.push({
        name: item.name,
        quantity: item.quantity,
        weight: item.weight,
        length: item.length,
        width: item.width,
        height: item.height,
        itemType: item.itemType._id,
        files: item.files,
        images: item.images
      });
    } else if (type === 'rates') {
      data.commodities.push({
        name: item.name,
        quantity: item.quantity,
        weight: item.weight,
        length: item.length,
        width: item.width,
        height: item.height,
        itemType: item.itemType._id,
        files: item.files,
        images: item.images
      });
    }

    data.totalWeight += parseFloat(item.weight) * parseInt(item.quantity);
    data.totalWidth += parseFloat(item.width) * parseInt(item.quantity);
    data.totalHeight += parseFloat(item.height) * parseInt(item.quantity);
    data.totalLength += parseFloat(item.length) * parseInt(item.quantity);
    data.priceImpact +=
      parseInt(item.itemType.priceImpact) * parseInt(item.quantity);
  });
  return data;
};

class OrdersAddContainer extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.mapComponentRef = null;
  }

  async componentDidMount() {
    const user = await authUtil.getUser();
    this.setState({
      language: { value: user.config.language },
      currency: { value: user.config.currency },
      weightUnit: { value: user.config.weightUnit },
      measurementUnit: { value: user.config.measurementUnit },
      config: user.config
    });
    const rates = await authUtil.getRatesData();
    if (rates) {
      this.setState({
        activity: rates.activity,
        getRate: rates.getRate,
        rates: rates.rates,
        files: rates.files,
        pickup: rates.pickup,
        dropoff: rates.dropoff,
        to: rates.to,
        from: rates.from,
        pickupDate: rates.pickupDate,
        deliveryDate: rates.deliveryDate,
        flexibleDate: rates.flexibleDate,
        deliveryTimeTo: rates.deliveryTimeTo,
        deliveryTimeFrom: rates.deliveryTimeFrom,
        flexibleDeliveryDate: rates.flexibleDeliveryDate,
        type: { value: rates.type ? rates.type.value : "", label: rates.type ? rates.type.label : "Select Type" },
        itemName: rates.itemName,
        itemWidth: rates.itemWidth,
        itemLength: rates.itemLength,
        itemWeight: rates.itemWeight,
        itemHeight: rates.itemHeight,
        itemQuantity: rates.itemQuantity,
        itemType: { _id: rates.itemType._id, name: rates.itemType.name },
        itemImages: rates.itemImages,
        commodities: rates.commodities,
        deliveryType: { value: rates.deliveryType.value, label: rates.deliveryType.label },
        allowMultipleRoutes: rates.allowMultipleRoutes,
        needHelper: rates.needHelper,
        notes: rates.notes,
        promo: rates.promo,
        bonus: rates.bonus,
        contactName: rates.contactName,
        contactNumber: rates.contactNumber,
        transportersType: { id: rates.transportersType ? rates.transportersType.id : "", value: rates.transportersType ? rates.transportersType.value : "", label: rates.transportersType ? rates.transportersType.label : "Transporters" },
        preferredMode: { value: rates.preferredMode ? rates.preferredMode.value : "", label: rates.preferredMode ? rates.preferredMode.label : "Mode" },
        ...rates
      })
    } else {
      this.state = INITIAL_STATE;
    }
    this.getCategories();
    this.getPreviousTransporters();
  }

  componentWillUpdate(nextProps, nextState) {
    authUtil.setRatesData(nextState);
  }


  handleAddCategory = async () => {
    if (this.state.commodityName) {
      const props = {
        level: 0,
        name: this.state.commodityName,
        approved: false
      }
      this.setState({ activity: true });

      try {
        const response = await ApiCalls.addCategories(props);
        console.log(">>>", response.data)
        this.setState({ dialogChangeUnits: { open: false, comp: '', type: '' }, commodityName: "", activity: false })
        newGrowl.showGrowl(
          'success',
          'success',
          'You commodity name is successfully submitted. Once it is approved you will add your item'
        );
      } catch (error) {
        this.setState({ activity: false });
      }
    }
    else {
      newGrowl.showGrowl(
        'error',
        'Error',
        'Commodity name is required'
      );
    }
  };

  handleCommodityUnit = e => {
    const { name, value } = e.target;
    if (this.state.errors[name]) {
      this.setState(prevState => ({
        [name]: value,
        errors: { ...prevState.errors, [name]: false }
      }));
    } else {
      this.setState({ [name]: value, isUpdate: true });
    }
  };

  handleUpdateUserProfile = async () => {

    const profileToUpdate = {

      config: {
        currency: this.state.currency.value,
        language: this.state.language.value,
        weightUnit: this.state.weightUnit.value,
        measurementUnit: this.state.measurementUnit.value
      }
    };

    try {
      const { data } = await ApiCalls.updateUserProfile(profileToUpdate);
      console.log("THis is the all update data", data)
      newGrowl.showGrowl(
        'success',
        'Success',
        'Your settings have been updated.'
      );
      this.setState({
        user: data,
        config: data.config,
        itemWidth: '',
        itemLength: '',
        itemWeight: '',
        itemHeight: '',
        itemType: { _id: '', name: 'Select Item Type' },
      })
      this.handleDialogClose();
      await authClass.setUserOnUpdate(data);
    } catch (error) {
      this.setState({ activity: false, isUpdate: true });
    }
  };

  handleChange = state => {
    this.setState(state);
  };

  handleGetDialogComponent = type => {
    switch (type) {
      case 'changeUnits':
        return ChangeUnitsComponent;

      case 'otherCommodity':
        return AddOtherCommodity;

      default:
        return () => null;
    }
  };

  handleDialogClose = () => {
    this.setState({
      dialogChangeUnits: { open: false, comp: '', type: '' }
    });
  };



  submitOrder = async () => {
    const contactNumber = this.telInput.iti.getNumber().slice(1);
    if (this.isValid()) {
      this.setState({ activity: true });
      let valid = true;
      const data = normalizeData('submit', this.state, contactNumber);
      data.orderNumber = generateOrderNumber(this.state);

      const { commodities } = data;

      if (!data.orderNumber) {
        valid = false;
        this.setState({ activity: false });
        return;
      }

      // for (let i = 0; i < commodities.length; i++) {
      //   try {
      //     const imagePaths = await Promise.all(
      //       commodities[i].files.map(file => uploadFile(file))
      //     );
      //     commodities[i].images = imagePaths;
      //     delete commodities[i].files;
      //   } catch (error) {
      //     valid = false;
      //     break;
      //   }
      // }

      if (valid) {
        data.commodities = commodities;
        // eslint-disable-next-line no-console
        try {
          const response = await ApiCalls.addRequest(data);
          // eslint-disable-next-line no-console
          this.setState({
            ...INITIAL_STATE,
            activity: false,
            categories: this.state.categories
          });
          newGrowl.showGrowl(
            'success',
            'Success',
            'Your request has been submitted successfully.'
          );
        } catch (error) {
          this.setState({ activity: false });

          try {
            newGrowl.showGrowl(
              'error',
              'Error',
              error.response.data.message ||
              'Something went wrong. Please try again.'
            );
          } catch (error) {
            //
          }
        }
      }
    }
  };

  // ============================
  // get category api call

  getPreviousTransporters = async () => {
    try {
      const response = await ApiCalls.prevTransportersList();
      this.setState({ activity: false, transporters: response.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  addRatesToCommodities = items => {
    let arr3 = this.state.commodities.map((item, i) =>
      Object.assign({}, item, items[i].rates)
    );
    this.setState({ commodities: arr3 });
  };

  getCategories = async () => {
    try {
      const response = await ApiCalls.getCategories();
      response.data.push({
        name: "Other",
        _id: "other"
      })
      this.setState({ activity: false, categories: response.data }, () => {
        console.log("This is all categories set state", this.state.categories)
      });

    } catch (error) {
      this.setState({ activity: false });
    }
  };

  // ============================

  getRates = async () => {
    if (this.isValid()) {
      this.setState({ activity: true, getRate: false });
      const data = normalizeData('rates', this.state);
      try {
        const response = await ApiCalls.estimateOrderCost(data);
        const { rates, promo, items } = response.data;
        this.setState({
          activity: false,
          getRate: true,
          rates,
          ...(promo ? { promoObject: promo } : {})
        });
        this.addRatesToCommodities(items);
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

  onInputChange = event => {
    const { name, value, checked, type } = event.target;
    if (this.state.errors[name]) {
      this.setState(prevState => {
        return {
          [name]: type === 'checkbox' ? checked : value,
          errors: { ...prevState.errors, [name]: false },
          getRate: false
          // deliveryType: this.changeDeliveryType({
          //   pickupDate: prevState.pickupDate,
          //   deliveryDate: prevState.deliveryDate,
          //   [name]: value
          // })
        };
      });
    } else {
      this.setState({
        [name]: type === 'checkbox' ? checked : value,
        getRate: false
        // deliveryType: this.changeDeliveryType({
        //   pickupDate: this.state.pickupDate,
        //   deliveryDate: this.state.deliveryDate,
        //   [name]: value
        // })
      });
    }
  };

  changeDeliveryType = data => {
    const { pickupDate, deliveryDate } = data;
    if (pickupDate && deliveryDate) {
      const duration = moment.duration(deliveryDate.diff(pickupDate)).asHours();

      if (duration > -1 && duration <= 24) {
        return { value: 'urgent', label: 'Urgent' };
      }
      if (duration > 24 && duration <= 120) {
        return { value: 'standard', label: 'Standard' };
      }
      if (duration > 120) {
        return { value: 'economy', label: 'Economy' };
      }
    }
    return { value: '', label: 'Delivery Type' };
  };

  getDimension = (value) => {
    const measurementUnit = this.state.config.measurementUnit;
    switch (measurementUnit) {
      case 'feet':
        return (value / 12).toFixed(3);
      case 'inch':
        return value.toFixed(3);
      case 'cm':
        return (value * 2.54).toFixed(3);
      case 'm':
        return (value * 0.0254).toFixed(3);
      default:
        return measurementUnit;
    }
  }

  getWeight = (value) => {
    const weightUnit = this.state.config.weightUnit;
    switch (weightUnit) {
      case 'kg':
        return value;
      case 'g':
        return value * 1000;
      case 'oz':
        return (value / 0.02834952).toFixed(3);
      case 'lbs':
        return (value / 0.45359237).toFixed(3)
      default:
        return weightUnit;
    }
  }

  handleSelectChange = e => {
    const { name, value } = e.target;
    if (value.name === "Other") {
      this.setState({
        dialogChangeUnits: {
          open: true,
          comp: 'otherCommodity'
        }
      })
    }

    if (name === "itemType") {
      this.setState(prevState => {
        return {
          [name]: value,
          errors: { ...prevState.errors, [name]: false },
          getRate: false,
          itemWidth: this.getDimension(value.width),
          itemLength: this.getDimension(value.length),
          itemWeight: this.getWeight(value.weight),
          itemHeight: this.getDimension(value.height),
        }
      })
    }
    else {
      if (this.state.errors[name]) {
        this.setState(prevState => {
          return {
            [name]: value,
            errors: { ...prevState.errors, [name]: false },
            getRate: false
          };
        });
      } else {
        this.setState({
          [name]: value,
          getRate: false
        });
      }
    }
  };

  setTerritory = () => {
    const { pickup, dropoff } = this.state
    console.log(">>>>>", pickup, dropoff)
    if ((pickup.country === dropoff.country) && (pickup.city === dropoff.city)) {
      this.setState({ territory: "inside_city" })
    }

    else if ((pickup.country === dropoff.country) && (pickup.city !== dropoff.city)) {
      this.setState({ territory: "inter_city" })
    }

    else if ((continent[pickup.country] === 'Europe') && (continent[dropoff.country] === 'Europe')) {
      this.setState({ territory: "inside_europe" })
    }

    else if ((pickup.country !== dropoff.country)) {
      this.setState({ territory: "international" })
    }
    console.log("Territory", this.state.territory)
  }

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
    const { errors, isValid } = validateSubmitOrder(this.state);
    if (!isValid) {
      this.setState(prevState => ({
        errors: { ...prevState.errors, ...errors }
      }));
    }
    return isValid;
  };

  addItem = async () => {
    if (this.isAddItemValid(this.state)) {
      const commodities = [...this.state.commodities];

      try {
        const imagePaths = await Promise.all(
          this.state.files.map(file => uploadFile(file))
        );
        // commodities[i].images = imagePaths;
        // delete commodities[i].files;
        commodities.push({
          name: this.state.itemName,
          quantity: this.state.itemQuantity,
          weight: this.state.itemWeight,
          length: this.state.itemLength,
          width: this.state.itemWidth,
          height: this.state.itemHeight,
          itemType: this.state.itemType,
          // files: this.state.files,
          images: imagePaths
        });
      } catch (error) {

      }


      if (this.state.errors.commodities) {
        this.setState(prevState => ({
          commodities,
          itemName: '',
          itemHeight: '',
          itemLength: '',
          itemQuantity: '',
          itemWeight: '',
          itemWidth: '',
          itemImages: [],
          files: [],
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
          itemImages: [],
          itemType: { _id: '', name: 'Select Item Type' },
          files: [],
          getRate: false
        });
      }
    }
  };

  deleteItem = i => {
    const commodities = this.state.commodities.filter(
      (item, index) => index !== i
    );
    this.setState({ commodities, getRate: false });
  };

  isAddItemValid = data => {
    const { errors, isValid } = validateAddItem(data);
    if (!isValid) {
      this.setState(prevState => ({
        errors: { ...prevState.errors, ...errors }
      }));
    }
    return isValid;
  };

  onFileDrop = async (file, item) => {
    if (item !== undefined) {
      readImageAsBase64(file, result => {
        const commodities = [...this.state.commodities]
        let commodity = commodities[item];
        let path = uploadFile(file);
        commodity.images = [path]
        commodities[item] = commodity;
        // this.state.commodities[item].files = file;
        this.setState(prevState => ({
          // files: [...prevState.files, file],
          commodities,
          itemImages: [...prevState.itemImages, result],
          errors: { ...prevState.errors, itemImages: false }
        }));
      }
      )
    } else {
      readImageAsBase64(file, result => {
        this.setState(prevState => ({
          files: [...prevState.files, file],
          itemImages: [...prevState.itemImages, result],
          errors: { ...prevState.errors, itemImages: false }
        }));
      });
    }


  }

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
    this.setTerritory();
  };

  handleImageClick = images => {
    this.props.store.setMultiWithRender({
      lightBoxIsOpen: true,
      lightBoxImages: images.map(item => ({ src: item }))
    });
  };

  handleMapComponentRef = ref => (this.mapComponentRef = ref);
  handleTelInputRef = ref => (this.telInput = ref);

  render() {
    return (
      <OrdersAddComponent
        {...this.state}
        onAddItem={this.addItem}
        getRates={this.getRates}
        onFileDrop={this.onFileDrop}
        submitOrder={this.submitOrder}
        onDeleteItem={this.deleteItem}
        onInputChange={this.onInputChange}
        handleChange={this.handleChange}
        handleImageClick={this.handleImageClick}
        mapComponentRef={this.handleMapComponentRef}
        handleSelectChange={this.handleSelectChange}
        handleDialogCallback={this.handleDialogCallback}
        handleDialogVisibility={this.handleDialogVisibility}
        handleGetDialogComponent={this.handleGetDialogComponent}
        handleDialogClose={this.handleDialogClose}
        handleCommodityUnit={this.handleCommodityUnit}
        handleUpdateProfile={this.handleUpdateUserProfile}
        handleAddCategory={this.handleAddCategory}
        tellInputRef={this.handleTelInputRef}
      />
    );
  }
}

OrdersAddContainer.propTypes = {
  store: PropTypes.shape({
    setWithRender: PropTypes.func,
    setMultiWithRender: PropTypes.func
  })
};

export default withStore(OrdersAddContainer);
