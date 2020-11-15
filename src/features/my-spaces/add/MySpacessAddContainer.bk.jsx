import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ApiCalls from '../../../service/RequestHandler';
import MyVehiclesAddComponent from './MyVehiclesAddComponent.bk';
import { validateAdd } from '../my-vehicles-validator';
import { readImageAsBase64Promise } from '../../../utils/functions';

const fields = {
  flightNumber: ['flightNumber', 'airline'],
  information: ['information'],
  make: ['make', 'model', 'color', 'numberPlate']
};
export default class MyVehiclesAddContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: false,
      errors: {},
      files: [],
      fieldsType: 'information',

      mode: '',
      make: '',
      model: '',
      color: '',
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
      numberPlatePicture: []
    };

    this.modeLabelRef = React.createRef();
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

  handleSubmit = async () => {
    if (this.isValid()) {
      this.setState({ activity: true });

      const data = {
        mode: this.state.mode,
        documents: [],
        vehiclePictures: [],
        numberPlatePicture: [],
        length: this.state.length,
        width: this.state.width,
        height: this.state.height,
        weight: this.state.weight
      };
      fields[this.state.fieldsType].forEach(item => {
        data[item] = this.state[item];
      });

      try {
        const uploadPaths = await Promise.all(
          this.state.files.map(file => this.uploadFile(file))
        );
        uploadPaths.forEach(item => {
          data[item.stateKey].push(item.path);
        });
        const response = await ApiCalls.addVehicle(data);

        await this.props.history.push('/transporter/vehicles');
        const newMyVehicles = [...this.props.myVehicles];
        newMyVehicles.push(response.data);
        this.props.handleSetVehicles(newMyVehicles);
      } catch (error) {
        this.setState({ activity: false });
      }
    }
  };

  handleChange = async e => {
    const { name, key, value } = e.target;

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
            fieldsType: this.getFieldsType(value),
            errors: { ...prevState.errors, [name]: false }
          }));
        } else {
          if (this.state.fieldsType !== 'make') {
            this.setState({
              [name]: value,
              fieldsType: this.getFieldsType(value),
              documents: [],
              vehiclePictures: [],
              numberPlatePicture: []
            });
            return;
          } else {
            this.setState({
              [name]: value,
              fieldsType: this.getFieldsType(value)
            });
          }
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
    this.state[key].splice(index, 1);
    this.state.files.splice(index, 1);
    this.setState({});
  };

  isValid() {
    const { errors, isValid } = validateAdd(this.state);
    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    return (
      <MyVehiclesAddComponent
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        modeLabelRef={this.modeLabelRef}
        removeDocument={this.removeDocument}
      />
    );
  }
}

MyVehiclesAddContainer.propTypes = {
  handleSetVehicles: PropTypes.func,
  myVehicles: PropTypes.arrayOf(PropTypes.shape()),
  history: PropTypes.shape({ push: PropTypes.func }),
  match: PropTypes.shape({
    params: PropTypes.shape({ type: PropTypes.string })
  })
};
