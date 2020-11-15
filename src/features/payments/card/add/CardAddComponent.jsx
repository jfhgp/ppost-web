import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { injectStripe, CardElement } from 'react-stripe-elements';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { authClass } from '../../../../utils/auth.util';
import { getPrimaryColors } from '../../../../utils/functions';
import FormSubmitBtn from '../../../../components/form/FormSubmitBtn';

class CardAddComponent extends Component {
  onSubmit = async () => {
    const user = authClass.getUser;
    let token = await this.props.stripe.createToken({
      name: `${user.firstName} ${user.lastName} `
    });
    if (token.error) {
      this.props.growl.showGrowl('error', 'Error', token.error.message);
      return;
    }

    const params = {
      tokenInfo: token.token.id,
      expiryMonth: token.token.card.exp_month,
      expiryYear: token.token.card.exp_year,
      type: token.token.card.brand,
      lastFour: token.token.card.last4,
      cardId: token.token.card.id
    };

    this.props.onSubmit(params);
  };

  render() {
    const { activity } = this.props;
    return (
      <div className="c-a-request-dialog">
        <DialogTitle>Accept Request</DialogTitle>
        <div>
          <span style={{ color: getPrimaryColors('primary') }}>
            Please provide details of your card.
          </span>
          <div id="card-element">
            <CardElement
              hidePostalCode={true}
              onChange={this.props.onCardChange}
            />
          </div>
          <div id="card-error">{this.props.error}</div>
        </div>
        <DialogActions>
          <FormSubmitBtn
            label="Cancel"
            disabled={activity}
            onSubmit={this.props.onClose}
            style={{ width: 'unset', borderRadius: 4 }}
          />
          <FormSubmitBtn
            label="Submit"
            disabled={activity}
            onSubmit={this.onSubmit}
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

CardAddComponent.propTypes = {
  activity: PropTypes.bool,
  onClose: PropTypes.func,
  onCardChange: PropTypes.func,
  onSubmit: PropTypes.func,
  error: PropTypes.string,
  growl: PropTypes.shape({ showGrowl: PropTypes.func }),
  stripe: PropTypes.shape({ createToken: PropTypes.func })
};

export default injectStripe(CardAddComponent);
