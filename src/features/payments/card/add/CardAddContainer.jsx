import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StripeProvider, Elements } from 'react-stripe-elements';

import CardAddComponent from './CardAddComponent';
import ApiCalls from '../../../../service/RequestHandler';
import { newGrowl } from '../../../../components/ui/GrowlComponent';

export default class CardAddContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: false,
      stripe: null,
      error: ''
    };
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe('pk_test_Jm6TLlZpB34LliBhWfkd5JdG')
      });
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: window.Stripe('pk_test_Jm6TLlZpB34LliBhWfkd5JdG')
        });
      });
    }
  }

  handleSubmit = async params => {
    this.setState({ activity: true });
    try {
      const response = await ApiCalls.addCard(params);
      if (response.status === 200) {
        const cards = [...this.props.cards];
        cards.push(response.data);
        this.props.setCards(cards);

        newGrowl.showGrowl(
          'success',
          'Success',
          'Your card was added successfully.'
        );
      }
    } catch (error) {
      newGrowl.showGrowl('error', 'Error', error.response.data.message);
      this.setState({ activity: false });
    }
  };

  handleCardChange = e => {
    if (e.error) {
      this.setState({ error: e.error.message });
    }

    if (this.state.error && !e.error) {
      this.setState({ error: '' });
    }
  };

  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <CardAddComponent
            {...this.state}
            growl={newGrowl}
            growlRef={this.growlRef}
            onClose={this.props.onClose}
            onSubmit={this.handleSubmit}
            onCardChange={this.handleCardChange}
          />
        </Elements>
      </StripeProvider>
    );
  }
}

CardAddContainer.propTypes = {
  onClose: PropTypes.func,
  setCards: PropTypes.func,
  cards: PropTypes.arrayOf(PropTypes.object)
};
