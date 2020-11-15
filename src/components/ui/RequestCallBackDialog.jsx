import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Checkbox, FormControlLabel } from '@material-ui/core';
import { classNames } from '../../../../utils/functions';
import moment from 'moment';
import {
  Dialog
} from '@material-ui/core';
import _ from "lodash";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { timeFormat } from '../../../../constants/project-constants';
import ApiCalls from '../../../../service/RequestHandler';
import FormTextArea from '../../../../components/form/FormTextArea';
import FormInput from '../../../../components/form/FormInputS';
import FormSubmitBtn from '../../../../components/form/FormSubmitBtn';
import * as authUtil from '../../../../utils/auth.util';
import { newGrowl } from '../../../../components/ui/GrowlComponent';
import EmptyPlaceholder from '../../../../components/ui/EmptyPlaceholder';

const INITIAL_STATE = {
  errors: {},
  activity: false,
  amount: null,
  reason: null,
};

export default class RequestCallBackDialog extends Component {
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

  handleaddExpenses = async () => {
    const {
      amount,
      reason
    } = this.state;
    const { details } = this.props
    const data = {
      amount: amount,
      order: details._id,
      reason: reason
    }
    this.setState({ activity: true });

    try {
      const response = await ApiCalls.addExpenses(data);
      this.setState({
        ...INITIAL_STATE
      });
      this.props.handleDialogClose();
      this.props.handleGetExpenses();
      newGrowl.showGrowl(
        'success',
        'Success',
        'Your expense has been submitted successfully.'
      );
    } catch (error) {
      this.setState({ activity: false });
      
    }
  };



  handleReasonLabelRef = ref => (this.reasonLabelRef = ref);

  render() {
    const {
      activity,
      amount,
      reason,
      errors,

    } = this.state;
    const { dialog, expenses } = this.props
    return (
      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        aria-labelledby="actions-dialog"
        className="u-r-d-actions-dialog"
      >
        <div className="cancel-request-dialog">
          <DialogTitle>{dialog.type === "add" ? "Add Expenses" : "Expenses"}</DialogTitle>
          <DialogContent>
            {dialog.type === "add" ? (
              <div>
                <div className="p-col-12 p-md-12 p-lg-12">
                  <p className="heading">Amount</p>
                  <FormInput
                    placeholder="amount"
                    name="amount"
                    value={amount}
                    onChange={e =>
                      this.onInputChange({
                        target: {
                          name: 'amount',
                          value: e.target.value
                        }
                      })
                    }
                    error={errors.amount}
                    left={
                      <img
                        style={{ width: '1rem' }}
                        alt=""
                        src={require('../../../../static/icons/date-icon.png')}
                      />
                    }
                  />
                </div>
                <div className="p-col-12 p-md-12 p-lg-12">
                  <p className="heading">Reason</p>
                  <FormTextArea
                    rows={5}
                    name="reason"
                    value={reason}
                    onChange={e =>
                      this.onInputChange({
                        target: {
                          name: 'reason',
                          value: e.target.value
                        }
                      })
                    }
                    error={errors.reason}
                    placeholder="Please provide reason of expense"
                  />
                </div>
              </div>
            ) : (
                expenses.length ? (_.map(expenses, (item, index) => (
                  <div className="r-list-request-card" style={{ marginBottom: "1rem" }}>
                    <div className="multiple-items">
                      <div className="item">
                        <span>Expense Reason : {item.reason} </span>
                      </div>
                      <div className="item">
                        <span>Amount : {item.amount} </span>
                      </div>
                    </div>
                  </div>
                ))) : (
                    <div className="p-col-12">
                      <EmptyPlaceholder message="We could not find any expenses." />
                    </div>
                  )
              )}

          </DialogContent>
          <DialogActions>

            {dialog.type === "view" ? (

              <FormSubmitBtn
                label="Cancel"
                disabled={activity}
                onSubmit={this.props.handleDialogClose}
                style={{ width: 'unset', borderRadius: 4 }}
              />
            ) : (
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
                    onSubmit={this.handleaddExpenses}
                    style={{
                      width: 'unset',
                      borderRadius: 4
                    }}


                  />
                </div>
              )}
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}

RequestCallBackDialog.propTypes = {
  cancelType: PropTypes.string,
  handleSetDetails: PropTypes.func,
  handleDialogClose: PropTypes.func,
  details: PropTypes.shape({
    _id: PropTypes.string,
    pickupTime: PropTypes.shape(),
    pickupDate: PropTypes.string
  })
};
