import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import ApiCalls from '../../service/RequestHandler';
import { validateAdd } from './my-vehicles-validator';
import { readImageAsBase64Promise, capitalize } from '../../utils/functions';
import VehiclesFormComponent from './VehiclesFormComponent';
import { newGrowl } from '../../components/ui/GrowlComponent';
import * as authUtil from '../../utils/auth.util';

const fields = {
  flightNumber: ['flightNumber', 'airline'],
  information: ['information'],
  make: ['make', 'model', 'color', 'numberPlate']
};

const airDimensions = {
  length: 50, //cm
  width: 38, //cm
  height: 70, //cm
  weight: 23 //kg
};

const INITIAL_STATE = {
  activity: false,
  errors: {},
  files: [],
  fieldsType: 'information',

  make: '',
  cars: '',
  makeOptions: [],
  model: '',
  modelOptions: [],
  color: '',
  bodyType: { value: '', label: 'Body Type' },
  width: '',
  length: '',
  height: '',
  weight: '',
  airline: '',
  documents: [],
  numberPlate: '',
  information: '',
  flightNumber: '',
  vehiclePictures: [],
  numberPlatePicture: [],
  mode: { value: '', label: 'Mode' },
  config: '',
  carrySuitcase: false,
  carryBox: false
};

export default class VehiclesFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.modeLabelRef = React.createRef();
    this.heading = this.props.heading;
    this.isEdit = this.props.updateVehicleData ? true : false;
  }

  async componentDidMount() {
    const user = await authUtil.getUser();
    this.setState({ config: user.config });
    this.getCars();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.updateVehicleData !== prevProps.updateVehicleData &&
      !this.state._id
    ) {
      const { updateVehicleData } = this.props;
      console.log(">>>>", updateVehicleData)

      this.setState({
        _id: updateVehicleData._id,
        make: {
          value: updateVehicleData.make,
          label: capitalize(updateVehicleData.make)
        },
        model: {
          value: updateVehicleData.model,
          label: capitalize(updateVehicleData.model)
        },
        color: updateVehicleData.color,
        width: updateVehicleData.width,
        active: updateVehicleData.active,
        length: updateVehicleData.length,
        height: updateVehicleData.height,
        weight: updateVehicleData.weight,
        drivers: updateVehicleData.drivers,
        airline: updateVehicleData.airline,
        documents: updateVehicleData.documents,
        carrySuitcase: updateVehicleData.carrySuitcase,
        carryBox: updateVehicleData.carryBox,
        numberPlate: updateVehicleData.numberPlate,
        information: updateVehicleData.information,
        mode: {
          value: updateVehicleData.mode,
          label: capitalize(updateVehicleData.mode)
        },
        flightNumber: updateVehicleData.flightNumber,
        vehiclePictures: updateVehicleData.vehiclePictures,
        fieldsType: this.getFieldsType(updateVehicleData.mode),
        numberPlatePicture: updateVehicleData.numberPlatePicture
      });
    }
  }

  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await ApiCalls.uploadTFile(formData);
      return { path: response.data.path, stateKey: file.stateKey };
    } catch (error) {
      throw error;
    }
  }

  groupData = (d) => {
    let g = Object.entries(d.reduce((r, c) => (r[c.make] = [...r[c.make] || [], c], r), {}))
    return g.reduce((r, c) => (r.children.push(
      { make: c[0], children: c[1] }), r), { children: [] })
  }


  getCars = async () => {
    try {
      const response = await ApiCalls.getCars();
      console.log("This is all Cars i get", response.data)
      const { children } = this.groupData(response.data);
      console.log("THis all childer how are you?", children)
      const makeOptions = _.map(children, (item, index) => {
        return (
          {
            index: index,
            label: item.make,
            value: item.make
          }
        )

      })
      this.setState({ makeOptions, cars: children })
    }
    catch (error) {
      throw error;
    }
  }

  onUpdateVehicleData = async () => {
    if (this.isValid()) {
      this.setState({ activity: true });
      const data = {
        _id: this.state._id,
        mode: this.state.mode.value,
        documents: this.state.documents,
        vehiclePictures: this.state.vehiclePictures,
        numberPlatePicture: this.state.numberPlatePicture,
        length: this.state.length,
        width: this.state.width,
        height: this.state.height,
        weight: this.state.weight,
        carrySuitcase: this.state.carrySuitcase,
        carryBox: this.state.carryBox
      };
      fields[this.state.fieldsType].forEach(item => {
        if (item === "make" || item === "model") {
          data[item] = this.state[item].value;
        }
        else {
          data[item] = this.state[item];
        }
      });
      try {
        const uploadPaths = await Promise.all(
          this.state.files.map(file => this.uploadFile(file))
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
          make: {
            value: response.data.make,
            label: capitalize(response.data.make)
          },
          model: {
            value: response.data.model,
            label: capitalize(response.data.model)
          },
        });
        newGrowl.showGrowl(
          'success',
          'Success',
          'Your vehicle was updated successfully.'
        );
      } catch (error) {
        this.setState({ activity: false });
      }
    }
  };

  handleSubmit = async () => {
    if (this.isValid()) {
      this.setState({ activity: true });

      const data = {
        documents: [],
        vehiclePictures: [],
        numberPlatePicture: [],
        width: this.state.width,
        length: this.state.length,
        height: this.state.height,
        weight: this.state.weight,
        mode: this.state.mode.value,
        carrySuitcase: this.state.carrySuitcase,
        carryBox: this.state.carryBox
      };
      fields[this.state.fieldsType].forEach(item => {
        if (item === "make" || item === "model") {
          data[item] = this.state[item];
        }
        else {
          data[item] = this.state[item];
        }
      });
      console.log("This is add data all", data)
      try {
        const uploadPaths = await Promise.all(
          this.state.files.map(file => this.uploadFile(file))
        );
        uploadPaths.forEach(item => {
          data[item.stateKey].push(item.path);
        });
        await ApiCalls.addVehicle(data);
        newGrowl.showGrowl(
          'success',
          'Success',
          'Your vehicle was added successfully.'
        );
        this.setState(INITIAL_STATE);
      } catch (error) {
        this.setState({ activity: false });
      }
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

  getDimension = (value) => {
    const measurementUnit = this.state.config.measurementUnit;
    switch (measurementUnit) {
      case 'feet':
        return (value / 30.48).toFixed(3);
      case 'inch':
        return (value / 2.54).toFixed(3);
      case 'cm':
        return value.toFixed(3);
      case 'm':
        return (value / 100).toFixed(3);
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

  handleChange = async e => {
    const measurementUnit = this.state.config.measurementUnit;
    const { name, key, value, index } = e.target;

    switch (name) {
      case 'files': {
        const files = [...this.state.files];

        Promise.all(
          value.map(item => {
            item.stateKey = key;
            files.push(item);
            return readImageAsBase64Promise(item);
          })
        ).then(res => {
          this.setState({
            files,
            [key]: [...this.state[key], ...res]
          });
        });

        break;
      }
      case 'mode': {
        if (this.state.errors[name]) {
          this.setState(prevState => ({
            [name]: value,
            fieldsType: this.getFieldsType(value.value),
            errors: { ...prevState.errors, [name]: false }
          }));
        }
        else if (value.value === "air") {
          this.setState({
            [name]: value,
            width: this.getDimension(airDimensions.width),
            length: this.getDimension(airDimensions.length),
            weight: this.getWeight(airDimensions.weight),
            height: this.getDimension(airDimensions.height),
            fieldsType: this.getFieldsType(value.value)
          });
        }

        else {
          this.setState({
            [name]: value,
            make: "",
            model: "",
            width: "",
            height: "",
            length: "",
            weight: "",
            color: '',
            numberPlate: '',
            fieldsType: this.getFieldsType(value.value)
          });
        }
        break;
      }
      case 'make': {
        if (this.state.errors[name]) {
          this.setState(prevState => ({
            [name]: value,
            model: "",
            width: "",
            height: "",
            length: "",
            modelOptions: this.state.cars[value.index].children,
            errors: { ...prevState.errors, [name]: false }
          }));
        }

        else if (this.state.mode.value === "car") {
          this.setState({
            [name]: value,
            model: "",
            width: "",
            height: "",
            length: "",
            modelOptions: this.state.cars[value.index].children,
          });
        }
        else {
          this.setState({
            [name]: value,
            model: "",
            width: "",
            height: "",
            length: "",
          });
        }

        break;
      }
      case 'model': {
        if (this.state.errors[name]) {
          this.setState(prevState => ({
            [name]: value,
            width: measurementUnit === "m" ? (value.width["cm"] / 100) : value.width[measurementUnit],
            length: measurementUnit === "m" ? (value.length["cm"] / 100) : value.length[measurementUnit],
            height: measurementUnit === "m" ? (value.height["cm"] / 100) : value.height[measurementUnit],
            errors: { ...prevState.errors, [name]: false }
          }));
        } else if (this.state.mode.value === "car") {
          this.setState({
            [name]: value,
            width: measurementUnit === "m" ? (value.width["cm"] / 100) : value.width[measurementUnit],
            length: measurementUnit === "m" ? (value.length["cm"] / 100) : value.length[measurementUnit],
            height: measurementUnit === "m" ? (value.height["cm"] / 100) : value.height[measurementUnit],
          });
        }
        else {
          this.setState({
            [name]: value,
            width: '',
            length: '',
            height: '',
          });
        }
        break;
      }
      default: {
        if (this.state.errors[name]) {
          this.setState(prevState => ({
            [name]: value,
            errors: { ...prevState.errors, [name]: false }
          }));
        } else {
          this.setState({ [name]: value });
        }
        break;
      }
    }
  };

  getFieldsType(value) {
    if (value === 'air') {
      return 'flightNumber';
    }

    if (value === 'bus' || value === 'train' || value === 'sea') {
      return 'information';
    } else {
      return 'make';
    }
  }

  removeDocument = (index, key) => {
    try {
      this.state[key].splice(index, 1);
      let currentKey = '';
      let currentKeyIndex = -1;
      const files = this.state.files.filter(item => {
        if (currentKey !== item.stateKey) {
          currentKeyIndex = 0;
          currentKey = item.stateKey;
        } else {
          currentKeyIndex++;
        }
        if (currentKey === key && currentKeyIndex === index) {
          return false;
        }
        return true;
      });

      this.setState({ files });
    } catch (error) {
      //
    }
  };

  isValid() {
    const { errors, isValid } = validateAdd(this.state);
    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  handleDriversAfterAction = drivers => {
    this.setState({ drivers });
  };

  render() {
    return (
      <VehiclesFormComponent
        {...this.state}
        heading={this.heading}
        isEdit={this.isEdit}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        onUpdateVehicleData={this.onUpdateVehicleData}
        modeLabelRef={this.modeLabelRef}
        removeDocument={this.removeDocument}
        handleToggleChange={this.handleToggleChange}
        handleDriversAfterAction={this.handleDriversAfterAction}
        onInputChange={this.onInputChange}
      />
    );
  }
}

VehiclesFormContainer.propTypes = {
  handleSetVehicles: PropTypes.func,
  myVehicles: PropTypes.arrayOf(PropTypes.shape()),
  updateVehicleData: PropTypes.shape(),
  heading: PropTypes.string,
  history: PropTypes.shape({ push: PropTypes.func }),
  match: PropTypes.shape({
    params: PropTypes.shape({ type: PropTypes.string })
  })
};
