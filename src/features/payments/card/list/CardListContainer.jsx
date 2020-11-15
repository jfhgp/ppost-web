import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardListComponent from './CardListComponent';
import { withStore } from '../../../../utils/store.util';
import ApiCalls from '../../../../service/RequestHandler';

class CardListContainer extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      activity: true,
      cards: [],
      dialogOpen: false
    };
  }

  componentDidMount() {
    this.getUserCards();
  }

  handleMakeDefaultCard = _id => {
    this.props.store.setWithRender('messageDialog', {
      open: true,
      actionBtnLabel: 'Yes',
      title: 'Are you sure you want to make this card your default card?',
      action: () => this.makeDefaultCard(_id)
    });
  };

  makeDefaultCard = async _id => {
    this.setState({ activity: false });
    try {
      const response = await ApiCalls.makeDefaultCard({ _id });
      this.handleSetCards(response.data);
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleDeleteCard = _id => {
    this.props.store.setWithRender('messageDialog', {
      open: true,
      className: 'danger',
      actionBtnLabel: 'Delete',
      title: 'Are you sure you want to delete?',
      action: () => this.deleteCard(_id)
    });
  };

  deleteCard = async _id => {
    this.setState({ activity: true });
    try {
      const response = await ApiCalls.deleteCard({ _id });
      this.handleSetCards(response.data);
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  async getUserCards() {
    try {
      const response = await ApiCalls.getCards();
      this.handleSetCards(response.data);
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  handleSetCards = cards => {
    this.setState({ cards, activity: false, dialogOpen: false });
  };

  handleDialogVisibility = dialogOpen => {
    this.setState({ dialogOpen });
  };

  render() {
    return (
      <CardListComponent
        {...this.state}
        setDialogVisibility={this.handleDialogVisibility}
        setCards={this.handleSetCards}
        deleteCard={this.handleDeleteCard}
        makeDefaultCard={this.handleMakeDefaultCard}
      />
    );
  }
}

CardListContainer.propTypes = {
  store: PropTypes.shape({
    setWithRender: PropTypes.func
  })
};

export default withStore(CardListContainer);
