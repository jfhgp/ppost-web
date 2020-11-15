import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { readImageAsBase64, uploadFile } from '../../../utils/functions';
import { authClass } from '../../../utils/auth.util';
import OrderUpdateComponent from './OrderUpdateComponent';
import { withStore } from '../../../utils/store.util';
import ApiCalls from '../../../service/RequestHandler';
import { continent } from '../../../utils/location.util';
import { newGrowl } from '../../../components/ui/GrowlComponent';
import { validateAddItem, validateSubmitOrder } from '../orders-validator';
import { timeFormat } from '../../../constants/project-constants';

const INITIAL_STATE = {
  activity: true,

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
  type: { value: '', label: 'Select Type' },
  deliveryType: { value: '', label: 'Delivery Type' },

  itemName: '',
  itemWidth: '',
  itemLength: '',
  itemWeight: '',
  itemHeight: '',
  itemImages: [],
  contactName: '',
  itemQuantity: '',
  contactNumber: '',
  countryCode: '',
  itemType: { _id: '', name: 'Select Item Type' },

  files: [],
  rates: {},
  errors: {},
  getRate: false,
  categories: [],
  dialogData: {},
  isDialogOpen: false,
  pickupDropOffMessage: '',

  isCommodityEdit: false,
  commedityId: '',
  orderNumber: '',
  isDuplicate: false
};



const normalizeData = (type, state, contactNumber, _id) => {
  let data = {};
  if (type === 'rates') {
    data = {
      pickup: state.pickup,
      dropoff: state.dropoff,
      deliveryType: state.deliveryType.value,
      totalWeight: 0,
      totalWidth: 0,
      totalHeight: 0,
      totalLength: 0,
      priceImpact: 0,
      ...(state.promo ? { promo: state.promo } : {})
    };
  }

  if (type === 'edit') {
    data = {
      _id: _id,
      pickup: state.pickup,
      dropoff: state.dropoff,
      deliveryType: state.deliveryType.value,
      type: state.type.value,
      commodities: [],
      pickupDate: moment(state.pickupDate).format('M/DD/YYYY'),
      deliveryDate: moment(state.deliveryDate).format('M/DD/YYYY'),
      flexibleDate: state.flexibleDate,
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

  if (type === 'duplicate') {
    data = {
      pickup: state.pickup,
      dropoff: state.dropoff,
      deliveryType: state.deliveryType.value,
      type: state.type.value,
      commodities: [],
      pickupDate: moment(state.pickupDate).format('M/DD/YYYY'),
      deliveryDate: moment(state.deliveryDate).format('M/DD/YYYY'),
      flexibleDate: state.flexibleDate,
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
    if (type === 'edit' || type === "duplicate") {
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

    data.totalWeight += parseInt(item.weight) * parseInt(item.quantity);
    data.totalWidth += parseInt(item.width) * parseInt(item.quantity);
    data.totalHeight += parseInt(item.height) * parseInt(item.quantity);
    data.totalLength += parseInt(item.length) * parseInt(item.quantity);
    data.priceImpact +=
      parseInt(item.itemType.priceImpact) * parseInt(item.quantity);
  });
  return data;
};

class OrderUpdateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.mapComponentRef = null;
  }


  async componentDidMount() {
    const { type } = this.props.match.params;
    if (type === "duplicate") {
      this.setState({ isDuplicate: true })
    }
    await this.getCategories();
  }

  async UNSAFE_componentWillMount() {
    await this.getOrderById();
  }

  selectType = value => {
    switch (value) {
      case 'deliver':
      case 'delivery':
        return { value: value, label: 'Send Parcel' };
      case 'receive':
        return { value: value, label: 'Receive Parcel' };
      case 'economy':
        return { value: value, label: 'Economy' };
      case 'standard':
        return { value: value, label: 'Standard' };
      case 'urgent':
        return { value: value, label: 'Urgent' };

      default:
        return { value: value, label: 'Select Label ' };
    }
  };

  getOrderById = async () => {
    try {
      const _id = this.props.match.params.id;
      const response = await ApiCalls.getOrderById({ _id });

      const {
        type,
        deliveryType,
        contact,
        commodities,
        pickup,
        dropoff,
        flexibleDate,
        flexibleDeliveryDate,
        pickupDate,
        deliveryDate,
        deliveryTime,
        pickupTime,
        orderNumber
      } = response.data;
      // let contactNum = await this.telInput.iti.setNumber('+' + contact.number);
      await this.setState({
        orderNumber: orderNumber,
        type: this.selectType(type),
        deliveryType: this.selectType(deliveryType),
        contactName: contact.name,
        contactNumber: '+' + contact.number,
        commodities: commodities,
        pickup: pickup,
        dropoff: dropoff,
        flexibleDate: flexibleDate,
        flexibleDeliveryDate: flexibleDeliveryDate,
        pickupDate: pickupDate && moment(new Date(pickupDate)),
        deliveryDate: deliveryDate && moment(new Date(deliveryDate)),
        deliveryTimeTo:
          deliveryTime &&
          new Date(
            moment(
              `${deliveryDate} ${deliveryTime.to}`,
              'YYYY-MM-DD HH:mm:ss'
            ).format()
          ),
        deliveryTimeFrom:
          deliveryTime &&
          new Date(
            moment(
              `${deliveryDate} ${deliveryTime.to}`,
              'YYYY-MM-DD HH:mm:ss'
            ).format()
          ),
        to:
          pickupTime &&
          new Date(
            moment(
              `${pickupDate} ${pickupTime.to}`,
              'YYYY-MM-DD HH:mm:ss'
            ).format()
          ),
        from:
          pickupTime &&
          new Date(
            moment(
              `${pickupDate} ${pickupTime.from}`,
              'YYYY-MM-DD HH:mm:ss'
            ).format()
          )
      });
    } catch (err) {
      //
    }
  };

  updateOrder = async () => {
    const contactNumber = this.telInput.iti.getNumber().slice(1);
    const _id = this.props.match.params.id;
    const { type } = this.props.match.params;
    if (this.isValid()) {
      this.setState({ activity: true });
      let valid = true;
      const data = normalizeData(type, this.state, contactNumber, _id);
      data.orderNumber = this.state.orderNumber;

      const { commodities } = data;

      if (!data.orderNumber) {
        valid = false;
        this.setState({ activity: false });
        return;
      }

      for (let i = 0; i < commodities.length; i++) {
        if (commodities[i].files) {
          try {
            const imagePaths = await Promise.all(
              commodities[i].files &&
              commodities[i].files.map(file => uploadFile(file))
            );

            commodities[i].images = imagePaths;

            delete commodities[i].files;
          } catch (error) {
            valid = false;
            break;
          }
        } else {
          delete commodities[i].files;
        }
      }

      if (valid) {
        data.commodities = commodities;
        try {
          const response = await ApiCalls.editRequestByCustomer({ type, data });
          this.setState({
            activity: false,
            categories: this.state.categories,
            getRate: false
          });
          if (this.state.isDuplicate) {
            newGrowl.showGrowl(
              'success',
              'Success',
              'Your request has been added successfully.'
            );
          }
          else {
            newGrowl.showGrowl(
              'success',
              'Success',
              'Your request has been updated successfully.'
            );
          }

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
            this.setState({
              activity: false,
              getRate: false
            });
            //
          }
        }
      }
    }
  };

  // ============================
  // get category api call
  getCategories = async () => {
    try {
      const response = await ApiCalls.getCategories();
      this.setState({ activity: false, categories: response.data });
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

  onInputChange = event => {
    const { name, value, checked, type } = event.target;
    if (this.state.errors[name]) {
      this.setState(prevState => {
        return {
          [name]: type === 'checkbox' ? checked : value,
          errors: { ...prevState.errors, [name]: false },
          getRate: false,
          deliveryType: this.changeDeliveryType({
            pickupDate: prevState.pickupDate,
            deliveryDate: prevState.deliveryDate,
            [name]: value
          })
        };
      });
    } else {
      this.setState({
        [name]: type === 'checkbox' ? checked : value,
        getRate: false,
        deliveryType: this.changeDeliveryType({
          pickupDate: this.state.pickupDate,
          deliveryDate: this.state.deliveryDate,
          [name]: value
        })
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

  handleSelectChange = e => {
    const { name, value } = e.target;
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
    const { errors, isValid } = validateSubmitOrder(this.state);
    if (!isValid) {
      this.setState(prevState => ({
        errors: { ...prevState.errors, ...errors }
      }));
    }
    return isValid;
  };

  addItem = () => {
    if (this.isAddItemValid(this.state)) {
      const commodities = [...this.state.commodities];
      commodities.push({
        name: this.state.itemName,
        quantity: this.state.itemQuantity,
        weight: this.state.itemWeight,
        length: this.state.itemLength,
        width: this.state.itemWidth,
        height: this.state.itemHeight,
        itemType: this.state.itemType,
        files: this.state.files,
        images: this.state.itemImages
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

  editItem = i => {
    const commodity = this.state.commodities.find((item, index) => index === i);

    this.setState({
      itemName: commodity.name,
      itemHeight: commodity.height,
      itemLength: commodity.length,
      itemQuantity: commodity.quantity,
      itemWeight: commodity.weight,
      itemWidth: commodity.width,
      itemImages: commodity.images,
      itemType: commodity.itemType,
      files: commodity.files || [],
      commedityId: commodity._id,
      getRate: false,
      isCommodityEdit: true,
      errors: {}
    });
  };

  handleEditItem = async () => {
    const { commedityId } = this.state;
    if (this.isAddItemValid(this.state)) {
      await this.setState(prevState => ({
        commodities: prevState.commodities.map(el =>
          el._id === commedityId
            ? {
              ...el,
              name: this.state.itemName,
              quantity: this.state.itemQuantity,
              weight: this.state.itemWeight,
              length: this.state.itemLength,
              width: this.state.itemWidth,
              height: this.state.itemHeight,
              itemType: this.state.itemType,
              files: this.state.files,
              images: this.state.itemImages
            }
            : el
        )
      }));

      if (this.state.errors.commodities) {
        await this.setState(prevState => ({
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
          getRate: false,
          isCommodityEdit: false
        }));
      } else {
        await this.setState({
          itemName: '',
          itemHeight: '',
          itemLength: '',
          itemQuantity: '',
          itemWeight: '',
          itemWidth: '',
          itemImages: [],
          itemType: { _id: '', name: 'Select Item Type' },
          files: [],
          getRate: false,
          isCommodityEdit: false
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

  onFileDrop = file => {
    readImageAsBase64(file, result => {
      this.setState(prevState => ({
        files: [...prevState.files, file],
        itemImages: [...prevState.itemImages, result],
        errors: { ...prevState.errors, itemImages: false }
      }));
    });
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
      <OrderUpdateComponent
        isEdit
        {...this.state}
        user={authClass.getUser}
        onAddItem={this.addItem}
        getRates={this.getRates}
        onFileDrop={this.onFileDrop}
        updateOrder={this.updateOrder}
        onDeleteItem={this.deleteItem}
        onEditItem={this.editItem}
        onInputChange={this.onInputChange}
        handleImageClick={this.handleImageClick}
        mapComponentRef={this.handleMapComponentRef}
        handleSelectChange={this.handleSelectChange}
        handleDialogCallback={this.handleDialogCallback}
        handleDialogVisibility={this.handleDialogVisibility}
        tellInputRef={this.handleTelInputRef}
        handleEditItem={this.handleEditItem}
      />
    );
  }
}

OrderUpdateContainer.propTypes = {
  store: PropTypes.shape({
    setWithRender: PropTypes.func,
    setMultiWithRender: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({ type: PropTypes.string, id: PropTypes.string })
  }),
  history: PropTypes.shape({ push: PropTypes.func })
};

export default withStore(OrderUpdateContainer);
