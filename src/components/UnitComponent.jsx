import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';

import {
  currencyUnits,
  weightUnits,
  measurementUnits
} from '../utils/unit.util';
import ApiCalls from '../service/RequestHandler';
import FormSelectInput from './form/FormSelectInput';

class UnitComponent extends Component {
  state = {
    activity: false,
    currency: 'EUR',
    weightUnit: 'kg',
    measurementUnit: 'm'
  };

  changeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateUnits = async () => {
    const { currency, weightUnit, measurementUnit } = this.state;
    this.setState({ activity: true });
    try {
      await ApiCalls.updateTransporterProfile({
        config: { currency, weightUnit, measurementUnit }
      });
      await this.props.navigateTo(`/transporter/home`);
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  render() {
    const { currency, weightUnit, measurementUnit } = this.state;
    return (
      <div className="p-grid">
        <div className="p-col-12">
          <FormSelectInput
            label="Currency"
            id="profile-currency"
            value={currency}
            onChange={this.changeInput}
            name="currency"
            options={currencyUnits}
          />
        </div>
        <div className="p-col-12">
          <FormSelectInput
            label="Weight Unit"
            id="profile-weight-unit"
            value={weightUnit}
            onChange={this.changeInput}
            name="weightUnit"
            options={weightUnits}
          />
        </div>
        <div className="p-col-12">
          <FormSelectInput
            label="Measurement Unit"
            id="profile-measurement-unit"
            value={measurementUnit}
            onChange={this.changeInput}
            name="measurementUnit"
            options={measurementUnits}
          />
        </div>
        <div className="p-col-12">
          <Button
            variant="contained"
            color="primary"
            onClick={this.updateUnits}
          >
            Update
          </Button>
        </div>
      </div>
    );
  }
}

UnitComponent.propTypes = {
  navigateTo: PropTypes.func
};

export default UnitComponent;
