import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from "lodash";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { timeFormat } from '../../../../constants/project-constants';
import ApiCalls from '../../../../service/RequestHandler';

import FormSubmitBtn from '../../../../components/form/FormSubmitBtn';
import * as authUtil from '../../../../utils/auth.util';
import { newGrowl } from '../../../../components/ui/GrowlComponent';
import {
  currencyUnits,
  weightUnits,
  measurementUnits,
  languages
} from '../../../../utils/unit.util';

import FormNativeSelectInputField from '../../../../components/form/FormNativeSelectInputField';



const INITIAL_STATE = {
  errors: {},
  activity: false,
  amount: null,
  reason: null,
};

export default class ChangeUnitsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      activity: false,
      amount: null,
      reason: null,
      expenses: []
    };

  }

  async componentDidMount() {
    const user = await authUtil.getUser();
    const userType = user.userType;
    this.setState({ userType });
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


handleReasonLabelRef = ref => (this.reasonLabelRef = ref);

  render() {
    const {
      activity,

    } = this.state;
    const { dialog } = this.props
    return (
      <div className="cancel-request-dialog">
        <DialogTitle>Change Units</DialogTitle>
        <DialogContent>
          <div className="p-grid" style={{ margin: '0', padding: '0.5em 0' }}>
            <div className="p-col-12 p-md-6 p-lg-6" style={{ padding: '1em' }}>
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Currency
              </div>
              <FormNativeSelectInputField
                name="currency"
                type="react-select"
                style={{ padding: 0 }}
                value={
                  currencyUnits.find(
                    options => options.value === this.props.currency.value
                  ) || { value: '', label: 'Currency' }
                }
                onChange={this.props.handleCommodityUnit}
                options={currencyUnits}
              />
            </div>
            <div className="p-col-12 p-md-6 p-lg-6" style={{ padding: '1em' }}>
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Language
              </div>
              <FormNativeSelectInputField
                name="language"
                type="react-select"
                style={{ padding: 0 }}
                // error={this.state.error}
                value={
                  languages.find(
                    options => options.value === this.props.language.value
                  ) || { value: '', label: 'Language' }
                }
              // onChange={this.this.props.handleCommodityUnit}
              // options={this.state.myVehicles}
              // getOptionValue={item => item._id}
              // formatOptionLabel={item => getVehicleName(item)}
              />
            </div>
            <div className="p-col-12 p-md-6 p-lg-6" style={{ padding: '1em' }}>
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Weight
              </div>
              <FormNativeSelectInputField
                name="weightUnit"
                type="react-select"
                style={{ padding: 0 }}
                value={
                  weightUnits.find(
                    options => options.value === this.props.weightUnit.value
                  ) || { value: '', label: 'Weight' }
                }
                onChange={this.props.handleCommodityUnit}
                options={weightUnits}
              />
            </div>
            <div className="p-col-12 p-md-6 p-lg-6" style={{ padding: '1em' }}>
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Dimension
              </div>
              <FormNativeSelectInputField
                name="measurementUnit"
                type="react-select"
                style={{ padding: 0 }}
                value={
                  measurementUnits.find(
                    options => options.value === this.props.measurementUnit.value
                  ) || { value: '', label: 'Measurement' }
                }
                onChange={this.props.handleCommodityUnit}
                options={measurementUnits}
              />
            </div>
          </div>



        </DialogContent>
        <DialogActions>


          <div>
            <FormSubmitBtn
              label="Cancel"
              disabled={activity}
              onSubmit={this.props.handleDialogClose}
              style={{ width: 'unset', borderRadius: 4 }}
            />
            <FormSubmitBtn
              className="confirm-btn"
              label="Submit"
              disabled={activity}
              onSubmit={this.props.handleUpdateProfile}
              style={{
                width: 'unset',
                borderRadius: 4
              }}


            />
          </div>

        </DialogActions>
      </div>
    );
  }
}

ChangeUnitsComponent.propTypes = {
  cancelType: PropTypes.string,
  handleSetDetails: PropTypes.func,
  handleDialogClose: PropTypes.func,
  details: PropTypes.shape({
    _id: PropTypes.string,
    pickupTime: PropTypes.shape(),
    pickupDate: PropTypes.string
  })
};
