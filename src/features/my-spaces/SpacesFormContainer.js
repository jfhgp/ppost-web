import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ApiCalls from '../../service/RequestHandler';
import { timeFormat } from '../../constants/project-constants';
import { readImageAsBase64, uploadFile } from '../../utils/functions';
import { continent } from '../../utils/location.util';
import { withStore } from '../../utils/store.util';
import { readImageAsBase64Promise, capitalize } from '../../utils/functions';
import SpacesFormComponent from './SpacesFormComponent';
import { newGrowl } from '../../components/ui/GrowlComponent';
import * as authUtil from '../../utils/auth.util';

const fields = {
  flightNumber: ['flightNumber', 'airline'],
  information: ['information'],
  make: ['make', 'model', 'color', 'numberPlate']
};

const INITIAL_STATE = {
  activity: false,
  errors: {},
  showBusinessHoursModal: false,
  // days: [],

  location: { location: [67.031303, 24.855999], address: '' },
  pictures: [],
  days: [
    { _id: 'monday', value: 'Monday' },
    { _id: 'tuesday', value: 'Tuesady' },
    { _id: 'wednesday', value: 'Wednesday' },
    { _id: 'thursday', value: 'Thurday' },
    { _id: 'friday', value: 'Friday' },
    { _id: 'saturday', value: 'Saturday' },
    { _id: 'sunday', value: 'Sunday' }
  ],
  type: { value: '', label: 'Space Type' },
  selectedDays: [],
  area: '',
  floor: '',
  to: null,
  from: null,
  config: {},
  canStoreFrozenItems: false,
  hasShelves: false,
  userType: '',
  itemImages: [],
  canStoreHeavyItems: false,
  canStoreFlammableItems: false,
  isDialogOpen: false,
  dialogData: {},
  businessHours: [
    {
      id: 1,
      day: 'Monday',
      open: true,
      startTime: '00:00',
      endTime: '23:59',
      timimg: { from: 0, to: 2359 }
    },
    {
      id: 2,
      day: 'Tuesday',
      open: true,
      startTime: '00:00',
      endTime: '23:59',
      timimg: { from: 0, to: 2359 }
    },
    {
      id: 3,
      day: 'Wednesday',
      open: true,
      startTime: '00:00',
      endTime: '23:59',
      timimg: { from: 0, to: 2359 }
    },
    {
      id: 4,
      day: 'Thursday',
      open: true,
      startTime: '00:00',
      endTime: '23:59',
      timimg: { from: 0, to: 2359 }
    },
    {
      id: 5,
      day: 'Friday',
      open: true,
      startTime: '00:00',
      endTime: '23:59',
      timimg: { from: 0, to: 2359 }
    },
    {
      id: 6,
      day: 'Saturday',
      open: true,
      startTime: '00:00',
      endTime: '23:59',
      timimg: { from: 0, to: 2359 }
    },
    {
      id: 7,
      day: 'Sunday',
      open: true,
      startTime: '00:00',
      endTime: '23:59',
      timimg: { from: 0, to: 2359 }
    }
  ]
};

class SpaceFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.mapComponentRef = null;

    this.modeLabelRef = React.createRef();
    this.heading = this.props.heading;
    this.isEdit = this.props.updateVehicleData ? true : false;
  }

  async componentDidMount() {
    const user = await authUtil.getUser();
    const userType = user.userType;
    this.setState({ config: user.config, userType });
  }

  // componentDidUpdate(prevProps) {
  //   if (
  //     this.props.updateVehicleData !== prevProps.updateVehicleData &&
  //     !this.state._id
  //   ) {
  //     const { updateVehicleData } = this.props;

  //     this.setState({
  //       _id: updateVehicleData._id,
  //       make: updateVehicleData.make,
  //       model: updateVehicleData.model,
  //       color: updateVehicleData.color,
  //       bodyType: {
  //         value: updateVehicleData.bodyType,
  //         label: capitalize(updateVehicleData.bodyType)
  //       },
  //       width: updateVehicleData.width,
  //       active: updateVehicleData.active,
  //       length: updateVehicleData.length,
  //       height: updateVehicleData.height,
  //       weight: updateVehicleData.weight,
  //       drivers: updateVehicleData.drivers,
  //       airline: updateVehicleData.airline,
  //       documents: updateVehicleData.documents,
  //       numberPlate: updateVehicleData.numberPlate,
  //       information: updateVehicleData.information,
  //       mode: {
  //         value: updateVehicleData.mode,
  //         label: capitalize(updateVehicleData.mode)
  //       },
  //       flightNumber: updateVehicleData.flightNumber,
  //       vehiclePictures: updateVehicleData.vehiclePictures,
  //       fieldsType: this.getFieldsType(updateVehicleData.mode),
  //       numberPlatePicture: updateVehicleData.numberPlatePicture
  //     });
  //   }
  // }

  handleFieldValueChange = hours => {
    this.setState({ businessHours: hours });
  };

  handleImageClick = images => {
    this.props.store.setMultiWithRender({
      lightBoxIsOpen: true,
      lightBoxImages: images.map(item => ({ src: item }))
    });
  };

  onFileDrop = file => {
    readImageAsBase64(file, result => {
      this.setState(prevState => ({
        pictures: [...prevState.pictures, file],
        itemImages: [...prevState.itemImages, result],
        errors: { ...prevState.errors, itemImages: false }
      }));
    });
  };

  onUpdateVehicleData = async () => {
    this.setState({ activity: true });
    const data = {
      name: this.state.location.address,
      location: this.state.location.location,
      pictures: [],
      area: this.state.area,
      floor: this.state.floor,
      spaceType: this.state.type.value,
      days: this.state.selectedDays,
      userType: this.state.userType,
      timing: {
        from: moment(this.state.from).format(timeFormat),
        to: moment(this.state.to).format(timeFormat)
      },
      canStoreFrozenItems: this.state.canStoreFrozenItems,
      hasShelves: this.state.hasShelves,
      canStoreHeavyItems: this.state.canStoreHeavyItems,
      canStoreFlammableItems: this.state.canStoreFlammableItems
    };
    fields[this.state.fieldsType].forEach(item => {
      data[item] = this.state[item];
    });
    try {
      const uploadPaths = await Promise.all(
        this.state.pictures.map(file => uploadFile(file))
      );
      uploadPaths.forEach(item => {
        data[item.stateKey].push(item.path);
      });
      const response = await ApiCalls.addVehicle(data);
      this.setState({
        ...response.data,
        activity: false,
        mode: {
          value: response.data.mode,
          label: capitalize(response.data.mode)
        },
        bodyType: {
          value: response.data.bodyType,
          label: capitalize(response.data.bodyType)
        }
      });
      newGrowl.showGrowl('success', 'Success', 'Space added successfully.');
    } catch (error) {
      this.setState({ activity: false });
    }
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
    // this.restrictToEU();
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

  handleMapComponentRef = ref => (this.mapComponentRef = ref);

  normalizeData = state => {
    let data = {};

    data = {
      name: state.location.address,
      location: state.location.location,
      pictures: state.pictures,
      area: state.area,
      floor: state.floor,
      spaceType: state.type.value,
      schedule: state.businessHours,
      canStoreFrozenItems: state.canStoreFrozenItems,
      hasShelves: state.hasShelves,
      canStoreHeavyItems: state.canStoreHeavyItems,
      canStoreFlammableItems: state.canStoreFlammableItems,
      userType: state.userType
    };

    return data;
  };

  handleSubmit = async () => {
    // if (this.isValid()) {
    //   this.setState({ activity: true });
    const data = this.normalizeData(this.state);
    const { pictures } = data;

    for (let i = 0; i < pictures.length; i++) {
      try {
        // const imagePaths = await Promise.all(
        //   pictures[i].map(file => uploadFile(file))
        // );
        let file = pictures[i];
        let imagePath = await uploadFile(file);
        pictures[i] = imagePath;
        // delete pict  ures[i];
      } catch (error) {
        console.log('error', error);
        break;
      }
    }

    data.pictures = pictures;
    // eslint-disable-next-line no-console
    try {
      await ApiCalls.addSpace(data);
      newGrowl.showGrowl(
        'success',
        'Success',
        'Your space was added successfully.'
      );
      this.setState(INITIAL_STATE);
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleToggleChange = async () => {
    this.setState({ activity: true });

    try {
      const response = await ApiCalls.markVehicleAvailable({
        _id: this.state._id,
        active: !this.state.active
      });
      this.setState({ activity: false, active: response.active });
    } catch (error) {
      this.setState({ activity: false });
    }
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
      this.setState(
        {
          [name]: type === 'checkbox' ? checked : value
        }
      );
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
            dropoff: false
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

  _toggleBusinessHoursModal = () => {
    this.setState({
      showBusinessHoursModal: !this.state.showBusinessHoursModal
    });
  };

  // isValid() {
  //   const { errors, isValid } = validateAdd(this.state);
  //   if (!isValid) {
  //     this.setState({ errors });
  //   }

  //   return isValid;
  // }

  render() {
    return (
      <SpacesFormComponent
        {...this.state}
        heading={this.heading}
        isEdit={this.isEdit}
        onInputChange={this.onInputChange}
        handleImageClick={this.handleImageClick}
        handleSelectChange={this.handleSelectChange}
        handleChangeMultiple={this.handleChangeMultiple}
        handleSubmit={this.handleSubmit}
        onUpdateVehicleData={this.onUpdateVehicleData}
        modeLabelRef={this.modeLabelRef}
        removeDocument={this.removeDocument}
        mapComponentRef={this.handleMapComponentRef}
        handleToggleChange={this.handleToggleChange}
        handleDialogCallback={this.handleDialogCallback}
        handleDialogVisibility={this.handleDialogVisibility}
        handleDriversAfterAction={this.handleDriversAfterAction}
        onFileDrop={this.onFileDrop}
        showBusinessHoursModal={this.state.showBusinessHoursModal}
        toggleBusinessHoursModal={this._toggleBusinessHoursModal}
        handleFieldValueChange={this.handleFieldValueChange}
      />
    );
  }
}

SpaceFormContainer.propTypes = {
  store: PropTypes.shape({
    setWithRender: PropTypes.func,
    setMultiWithRender: PropTypes.func
  })
};

export default withStore(SpaceFormContainer);
