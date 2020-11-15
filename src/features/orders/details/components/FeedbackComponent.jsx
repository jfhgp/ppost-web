import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import StarRatingComponent from 'react-star-rating-component';

import ApiCalls from '../../../../service/RequestHandler';
import FormSubmitBtn from '../../../../components/form/FormSubmitBtn';
import FormTextArea from '../../../../components/form/FormTextArea';

const INITIAL_STATE = {
  activity: false,
  rating: 0,
  attitude: 0,
  timing: 0,
  delivery: 0,
  comment: '',
  error: false
};

export default class FeedbackComponent extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleSubmit = async () => {
    if (this.state.comment && this.state.rating > 0) {
      const { details } = this.props;
      this.setState({ activity: true });
      console.log("THis is the feedabck component state", this.state)
      try {
        const response = await ApiCalls.rateOrder({
          order: details._id,
          rating: this.state.rating,
          comment: this.state.comment,
          attitude: this.state.attitude,
          timing: this.state.timing,
          delivery: this.state.delivery,
          [this.props.feedbackTo]: details[this.props.feedbackTo]._id
        });

        const newDetails = { ...details };
        newDetails[this.props.ratingKey] = response.data;
        this.props.handleSetDetails(newDetails);
      } catch (error) {
        this.setState({ activity: false });
      }
    }
    else {
      this.setState({ error: true });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, error: false });
  };

  render() {
    const { activity } = this.state;
    return (
      <div className="feedback-dialog">
        <DialogTitle>
          Rate {this.props.feedbackTo === 'user' ? 'Customer' : 'Transporter'}
        </DialogTitle>
        <div className="p-grid" style={{ margin: '0', padding: '1em' }}>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1em' }}>
            <p className="heading">
              Overall
              </p>
            <StarRatingComponent
              name="rating"
              value={this.state.rating}
              onStarClick={(value, previous, name) =>
                this.handleChange({ target: { name, value } })
              }
              starColor="#fa7816"
              emptyStarColor="#888"
              editing
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1em' }}>
            <p className="heading">
              Attitude
              </p>
            <StarRatingComponent
              name="attitude"
              value={this.state.attitude}
              onStarClick={(value, previous, name) =>
                this.handleChange({ target: { name, value } })
              }
              starColor="#fa7816"
              emptyStarColor="#888"
              editing
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1em' }}>
            <p className="heading">
              Timing
              </p>
            <StarRatingComponent
              name="timing"
              value={this.state.timing}
              onStarClick={(value, previous, name) =>
                this.handleChange({ target: { name, value } })
              }
              starColor="#fa7816"
              emptyStarColor="#888"
              editing
            />
          </div>
          <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1em' }}>
            <p className="heading">
              Delivery
              </p>
            <StarRatingComponent
              name="delivery"
              value={this.state.delivery}
              onStarClick={(value, previous, name) =>
                this.handleChange({ target: { name, value } })
              }
              starColor="#fa7816"
              emptyStarColor="#888"
              editing
            />
          </div>
          <div className="comment p-col-12 p-md-6 p-lg-12">
            <FormTextArea
              rows={5}
              style={{ padding: 0 }}
              error={this.state.error}
              name="comment"
              onChange={this.handleChange}
              value={this.state.comment}
              placeholder="Write a thank you note."
            />
          </div>
        </div>
        <DialogActions>
          <FormSubmitBtn
            label="Back"
            disabled={activity}
            onSubmit={this.props.handleDialogClose}
            style={{ width: 'unset', borderRadius: 4 }}
          />
          <FormSubmitBtn
            label="Submit"
            disabled={activity}
            onSubmit={this.handleSubmit}
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

FeedbackComponent.propTypes = {
  ratingKey: PropTypes.string,
  feedbackTo: PropTypes.string,
  handleSetDetails: PropTypes.func,
  handleDialogClose: PropTypes.func,
  details: PropTypes.shape({
    _id: PropTypes.string,
    transporter: PropTypes.shape({ _id: PropTypes.string })
  })
};
