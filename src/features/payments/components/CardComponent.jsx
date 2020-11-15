import React from 'react';
import PropTypes from 'prop-types';

import Switch from '@material-ui/core/Switch';
import { FormControlLabel } from '@material-ui/core';

const CardComponent = props => {
  const { card, deleteCard, makeDefaultCard } = props;
  return (
    <div className="payments-card">
      {props.canDelete ? (
        <img
          className="delete-card"
          alt="Delete Card"
          src={require(`../../../static/icons/delete-icon.png`)}
          onClick={() => deleteCard(card._id)}
        />
      ) : null}
      <img
        src={require(`../../../static/images/${
          card.defaultCard ? 'card-bg-show.png' : 'card-bg-hide.png'
        }`)}
        style={{ width: '100%' }}
      />
      <div>
        <div>{card.type}Card</div>
        <div>
          <span>XXXX</span>
          <span>XXXX</span>
          <span>XXXX</span>
          <span>{card.lastFour}</span>
        </div>
        <div className="mark-as-default">
          <span>
            {card.defaultCard ? (
              'Default'
            ) : (
              <FormControlLabel
                labelPlacement="start"
                label="Mark as default"
                control={
                  <Switch
                    checked={card.defaultCard}
                    color="primary"
                    onChange={() => makeDefaultCard(card._id)}
                  />
                }
              />
            )}
          </span>
          <span>
            Expiry {card.expiryMonth}/{card.expiryYear}
          </span>
        </div>
      </div>
    </div>
  );
};

CardComponent.propTypes = {
  card: PropTypes.shape({
    type: PropTypes.string,
    lastFour: PropTypes.string,
    defaultCard: PropTypes.bool,
    expiryMonth: PropTypes.number,
    expiryYear: PropTypes.number
  }),
  canDelete: PropTypes.bool,
  deleteCard: PropTypes.func,
  makeDefaultCard: PropTypes.func
};

export default CardComponent;
