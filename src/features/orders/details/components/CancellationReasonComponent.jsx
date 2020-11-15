import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ApiCalls from '../../../../service/RequestHandler';
import FormNativeSelectInputField from '../../../../components/form/FormNativeSelectInputField';
import FormTextArea from '../../../../components/form/FormTextArea';
import FormSubmitBtn from '../../../../components/form/FormSubmitBtn';

export default class CancellationReasonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      activity: false,
      sampleReasons: [
        { label: 'Reason 1', value: 'Reason 1' },
        { label: 'Reason 2', value: 'Reason 2' },
        { label: 'Reason 3', value: 'Reason 3' },
        { label: 'Reason 4', value: 'Reason 4' },
        { label: 'Reason 5', value: 'Reason 5' }
      ],
      reason: { label: 'Select a reason', value: '' },
      cancellationReason: ''
    };

    const pickupTime = props.details.pickupTime
      ? props.details.pickupTime.from.split(':')
      : '00:00';
    const pickup = moment(props.details.pickupDate)
      .hour(pickupTime[0])
      .minute(pickupTime[1]);

    this.showCancellationFeeMessage = moment(pickup).isSame(moment(), 'day');
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: false,
      ...(name === 'reason' ? { cancellationReason: value.value } : {})
    });
  };

  handleCancelOrder = async () => {
    const reason = this.state.cancellationReason;
    const status =
      this.props.cancelType === 'user'
        ? 'cancelledbyuser'
        : 'cancelledbytransporter';
    if (reason) {
      this.setState({ activity: true });
      try {
        await ApiCalls.cancelOrder({
          _id: this.props.details._id,
          cancellationReason: reason,
          status
        });
        const newDetails = { ...this.props.details };
        newDetails.status = status;
        newDetails.cancellationReason = reason;

        this.props.handleSetDetails(newDetails);
      } catch (error) {
        this.setState({ activity: false });
      }
    } else {
      this.setState({ error: true });
    }
  };

  handleReasonLabelRef = ref => (this.reasonLabelRef = ref);

  render() {
    const { activity } = this.state;

    return (
      <div className="cancel-request-dialog">
        <DialogTitle>Cancel Request</DialogTitle>
        <DialogContent>
          {this.showCancellationFeeMessage ? (
            <small>
              You will be charged a cancellation fee of{' '}
              <strong style={{ fontSize: '1rem' }}>
                &euro;{Number(5).toFixed(2)}
              </strong>
              .
            </small>
          ) : null}
          <div style={{ paddingTop: '1em' }}>
            <FormNativeSelectInputField
              name="reason"
              type="react-select"
              style={{ padding: 0 }}
              error={this.state.error}
              value={this.state.reason}
              onChange={this.handleChange}
              options={this.state.sampleReasons}
            />
          </div>
          <div style={{ paddingTop: '1em' }}>
            <FormTextArea
              rows={5}
              style={{ padding: 0 }}
              error={this.state.error}
              name="cancellationReason"
              onChange={this.handleChange}
              value={this.state.cancellationReason}
              placeholder="Please provide us with a reason."
            />
          </div>
        </DialogContent>
        <DialogActions>
          <FormSubmitBtn
            label="Back"
            disabled={activity}
            onSubmit={this.props.handleDialogClose}
            style={{ width: 'unset', borderRadius: 4 }}
          />
          <FormSubmitBtn
            className="cancel-btn"
            label="Cancel Request"
            disabled={activity}
            onSubmit={this.handleCancelOrder}
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

CancellationReasonComponent.propTypes = {
  cancelType: PropTypes.string,
  handleSetDetails: PropTypes.func,
  handleDialogClose: PropTypes.func,
  details: PropTypes.shape({
    _id: PropTypes.string,
    pickupTime: PropTypes.shape(),
    pickupDate: PropTypes.string
  })
};
