import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Times from './Times';
import { Dialog, Checkbox, Button } from '@material-ui/core';
const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];
class AddScheduleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleFieldValueChange(data) {
    this.props.handleFieldValueChange(data.val);
  }

  handleCheckboxChange = (event, index) => {
    const checkedValue = event.target.checked;

    const matchedRecord = this.props.businessHours[index];
    matchedRecord.open = checkedValue;

    let businessHours = this.props.businessHours;
    businessHours[index] = matchedRecord;
    this.handleFieldValueChange({
      key: 'businessHours',
      val: businessHours
    });
  };

  onTimeInSelect = (time, day) => {
    const matchedRecord = this.props.businessHours[days.indexOf(day)];
    matchedRecord.startTime = time;

    let businessHours = this.props.businessHours;
    businessHours[days.indexOf(day)] = matchedRecord;
    this.handleFieldValueChange({
      key: 'businessHours',
      val: businessHours
    });
  };

  onTimeOutSelect = (time, day) => {
    const matchedRecord = this.props.businessHours[days.indexOf(day)];
    matchedRecord.endTime = time;
    let businessHours = this.props.businessHours;
    businessHours[days.indexOf(day)] = matchedRecord;
    this.handleFieldValueChange({
      key: 'businessHours',
      val: businessHours
    });
  };
  render() {
    const details = { ...this.props };

    return (
      <Dialog
        maxWidth="lg"
        className="full-width-dialog full-height-dialog"
        open={this.props.show}
        onClose={this.props.handleClose}
      >
        {_.map(details.businessHours, (item, index) => (
          <div className="p-grid">
            <div className="p-col-12 p-sm-1">
              <Checkbox
                checked={item.open}
                onChange={e => this.handleCheckboxChange(e, index)}
                value="open"
                name="open"
                color="primary"
              />
            </div>
            <div className="p-col-12 p-sm-1">
              <p className="heading">{item.day}</p>
            </div>
            <div className="p-col-12 p-sm-3">
              <p>Time In</p>
              <Times
                isDisabled={!item.open}
                onSelectTime={this.onTimeInSelect}
                day={item.day}
                time={item.startTime}
              />
            </div>
            <div className="p-col-12 p-sm-3">
              <p>Time Out </p>
              <Times
                isDisabled={!item.open}
                onSelectTime={this.onTimeOutSelect}
                day={item.day}
                time={item.endTime}
              />
            </div>
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={event => this.props.handleClose()}
        >
          Done
        </Button>
      </Dialog>
    );
  }
}

AddScheduleModal.defaultProps = {};

AddScheduleModal.propTypes = {
  handleFieldValueChange: PropTypes.func,
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  businessHours: PropTypes.array
};

export default AddScheduleModal;
