import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Checkbox, FormControlLabel } from '@material-ui/core';
import { classNames } from '../../../../utils/functions';
import moment from 'moment';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { timeFormat } from '../../../../constants/project-constants';
import ApiCalls from '../../../../service/RequestHandler';
import FormDateInputField from '../../../../components/form/FormDateInputField';
import FormTimeInputField from '../../../../components/form/FormTimeInputField';
import FormSubmitBtn from '../../../../components/form/FormSubmitBtn';
import * as authUtil from '../../../../utils/auth.util';
import { newGrowl } from '../../../../components/ui/GrowlComponent';

const INITIAL_STATE = {
  errors: {},
  activity: false,
  pickupDate: null,
  to: null,
  from: null,
  deliveryDate: null,
  flexibleDate: false,
  deliveryTimeTo: null,
  deliveryTimeFrom: null,
  flexibleDeliveryDate: false,
  userType: ''
};

export default class RequestRescheduleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      activity: false,
      pickupDate: null,
      to: null,
      from: null,
      deliveryDate: null,
      flexibleDate: false,
      deliveryTimeTo: null,
      deliveryTimeFrom: null,
      flexibleDeliveryDate: false,
      userType: ''
    };

    const pickupTime = props.details.pickupTime
      ? props.details.pickupTime.from.split(':')
      : '00:00';
    const pickup = moment(props.details.pickupDate)
      .hour(pickupTime[0])
      .minute(pickupTime[1]);

    this.showCancellationFeeMessage = moment(pickup).isSame(moment(), 'day');
  }

  async componentDidMount() {
    const user = await authUtil.getUser();
    const userType = user.userType;
    this.setState({ userType });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: false,
      ...(name === 'reason' ? { cancellationReason: value.value } : {})
    });
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

  handleRequestReschedule = async () => {
    const {
      pickupDate,
      from,
      to,
      deliveryDate,
      deliveryTimeFrom,
      deliveryTimeTo,
      flexibleDate,
      flexibleDeliveryDate
    } = this.state;
    const data = {
      _id: this.props.details._id,
      ...(flexibleDate
        ? {
            pickupTime: {
              from: '00:00',
              to: '00:00'
            }
          }
        : {
            pickupTime: {
              from: moment(from).format(timeFormat),
              to: moment(to).format(timeFormat)
            }
          }),
      ...(flexibleDeliveryDate
        ? {
            deliveryTime: {
              from: '00:00',
              to: '00:00'
            }
          }
        : {
            deliveryTime: {
              from: moment(deliveryTimeFrom).format(timeFormat),
              to: moment(deliveryTimeTo).format(timeFormat)
            }
          }),
      pickupDate: moment(pickupDate).format('M/DD/YYYY'),
      deliveryDate: moment(deliveryDate).format('M/DD/YYYY'),
      flexibleDate: flexibleDate,
      flexibleDeliveryDate: flexibleDeliveryDate,
      userType: this.state.userType
    };

    this.setState({ activity: true });

    try {
      const response = await ApiCalls.requestReschedule(data);
      this.setState({
        ...INITIAL_STATE
      });
      this.props.handleSetDetails(this.props.details);
      newGrowl.showGrowl(
        'success',
        'Success',
        'Your rescheduling request has been submitted successfully.'
      );
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleReasonLabelRef = ref => (this.reasonLabelRef = ref);

  render() {
    const {
      activity,
      pickupDate,
      flexibleDate,
      to,
      from,
      errors,
      deliveryDate,
      flexibleDeliveryDate,
      deliveryTimeFrom,
      deliveryTimeTo
    } = this.state;
    return (
      <div className="cancel-request-dialog">
        <DialogTitle>Request Reschedule</DialogTitle>
        <DialogContent>
          <div className="p-col-12 p-md-12 p-lg-12">
            <p className="heading">Pickup</p>
            <FormDateInputField
              placeholder="Pickup Date"
              name="pickupDate"
              value={pickupDate ? new Date(pickupDate) : null}
              onChange={e =>
                this.onInputChange({
                  target: {
                    name: 'pickupDate',
                    value: moment(e)
                  }
                })
              }
              error={errors.pickupDate}
              left={
                <img
                  style={{ width: '1rem' }}
                  alt=""
                  src={require('../../../../static/icons/date-icon.png')}
                />
              }
            />
          </div>
          {!flexibleDate ? (
            <div style={{ display: 'flex' }}>
              <div className="p-col-6 p-md-6 p-lg-6">
                <p
                  className="heading"
                  style={{ height: this.headingHeight }}
                ></p>
                <FormTimeInputField
                  value={from ? from : null}
                  onChange={e =>
                    this.onInputChange({
                      target: {
                        name: 'from',
                        value: e
                      }
                    })
                  }
                  format="hh:mm a"
                  error={errors.from}
                  placeholder="Pickup Time From"
                  left={
                    <img
                      style={{ width: '1.1rem' }}
                      alt=""
                      src={require('../../../../static/icons/fromtime-icon.png')}
                    />
                  }
                />
              </div>
              <div className="p-col-6 p-md-6 p-lg-6">
                <p
                  className="heading"
                  style={{ height: this.headingHeight }}
                ></p>
                <FormTimeInputField
                  value={to ? to : null}
                  onChange={e =>
                    this.onInputChange({
                      target: {
                        name: 'to',
                        value: e
                      }
                    })
                  }
                  format="hh:mm a"
                  error={errors.to}
                  placeholder="Pickup Time To"
                  left={
                    <img
                      style={{ width: '1.1rem' }}
                      alt=""
                      src={require('../../../../static/icons/fromtime-icon.png')}
                    />
                  }
                />
              </div>
            </div>
          ) : null}
          <div
            className={classNames([
              ['p-col-12 p-md-12 p-lg-12', !flexibleDate],
              ['p-col-12 p-md-6 p-lg-9', flexibleDate]
            ])}
          >
            <FormControlLabel
              className="form-checkbox-label-input"
              control={
                <Checkbox
                  checked={flexibleDate}
                  onChange={this.onInputChange}
                  value="flexibleDate"
                  name="flexibleDate"
                  color="default"
                />
              }
              label="Flexible Pickup Date and Time"
            />
          </div>
          <div className="p-col-12 p-md-12 p-lg-12">
            <p className="heading">Dropoff</p>
            <FormDateInputField
              name="deliveryDate"
              placeholder="Dropoff Date"
              value={deliveryDate ? new Date(deliveryDate) : null}
              minDate={pickupDate ? new Date(pickupDate) : new Date()}
              onChange={e =>
                this.onInputChange({
                  target: {
                    name: 'deliveryDate',
                    value: moment(e)
                  }
                })
              }
              error={errors.deliveryDate}
              left={
                <img
                  style={{ width: '1rem' }}
                  alt=""
                  src={require('../../../../static/icons/date-icon.png')}
                />
              }
            />
          </div>
          {!flexibleDeliveryDate ? (
            <div style={{ display: 'flex' }}>
              <div className="p-col-12 p-md-12 p-lg-6">
                <p
                  className="heading"
                  style={{ height: this.headingHeight }}
                ></p>
                <FormTimeInputField
                  value={deliveryTimeFrom ? deliveryTimeFrom : null}
                  onChange={e =>
                    this.onInputChange({
                      target: {
                        name: 'deliveryTimeFrom',
                        value: e
                      }
                    })
                  }
                  format="hh:mm a"
                  error={errors.deliveryTimeFrom}
                  placeholder="Dropoff Time From"
                  left={
                    <img
                      style={{ width: '1.1rem' }}
                      alt=""
                      src={require('../../../../static/icons/fromtime-icon.png')}
                    />
                  }
                />
              </div>
              <div className="p-col-12 p-md-12 p-lg-6">
                <p
                  className="heading"
                  style={{ height: this.headingHeight }}
                ></p>
                <FormTimeInputField
                  value={deliveryTimeTo ? deliveryTimeTo : null}
                  onChange={e =>
                    this.onInputChange({
                      target: {
                        name: 'deliveryTimeTo',
                        value: e
                      }
                    })
                  }
                  format="hh:mm a"
                  error={errors.deliveryTimeTo}
                  placeholder="Dropoff Time To"
                  left={
                    <img
                      style={{ width: '1.1rem' }}
                      alt=""
                      src={require('../../../../static/icons/fromtime-icon.png')}
                    />
                  }
                />
              </div>
            </div>
          ) : null}
          <div
            className={classNames([
              ['p-col-12 p-md-12 p-lg-12', !flexibleDeliveryDate],
              ['p-col-12 p-md-6 p-lg-9', flexibleDeliveryDate]
            ])}
          >
            <FormControlLabel
              className="form-checkbox-label-input"
              control={
                <Checkbox
                  checked={flexibleDeliveryDate}
                  onChange={this.onInputChange}
                  value="flexibleDeliveryDate"
                  name="flexibleDeliveryDate"
                  color="default"
                />
              }
              label="Flexible Dropoff Date and Time"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <FormSubmitBtn
            label="Cancel"
            disabled={activity}
            onSubmit={this.props.handleDialogClose}
            style={{ width: 'unset', borderRadius: 4 }}
          />
          <FormSubmitBtn
            className="confirm-btn"
            label="Request Reschedule"
            disabled={activity}
            onSubmit={this.handleRequestReschedule}
            style={{
              width: 'unset',
              borderRadius: 4
            }}
          />
        </DialogActions>
      </div>
    );
  }
}

RequestRescheduleComponent.propTypes = {
  cancelType: PropTypes.string,
  handleSetDetails: PropTypes.func,
  handleDialogClose: PropTypes.func,
  details: PropTypes.shape({
    _id: PropTypes.string,
    pickupTime: PropTypes.shape(),
    pickupDate: PropTypes.string
  })
};
