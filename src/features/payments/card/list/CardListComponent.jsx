import React from 'react';
import PropTypes from 'prop-types';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';

import Page from '../../../../components/layout/Page';
import CardAddContainer from '../add/CardAddContainer';
import CardComponent from '../../components/CardComponent';
import FormSubmitBtn from '../../../../components/form/FormSubmitBtn';
import EmptyPlaceholder from '../../../../components/ui/EmptyPlaceholder';
import ContainerLayout from '../../../../components/layout/ContainerLayout';

const CardListComponent = props => {
  const {
    activity,
    cards,
    setDialogVisibility,
    dialogOpen,
    deleteCard,
    makeDefaultCard
  } = props;

  const mobileWidth = useMediaQuery('(max-width:425px)');

  const btnFontSize = mobileWidth
    ? { fontSize: '0.9rem' }
    : { fontSize: '1.2rem' };

  return (
    <Page activity={activity} className="orders-add-container" noActivity>
      <div className="page-title">
        <span>Payments</span>
      </div>
      <ContainerLayout>
        <div className="p-col-12">
          <div className={mobileWidth ? '' : 'text-right'}>
            <FormSubmitBtn
              onSubmit={() => setDialogVisibility(true)}
              label="Add Card"
              style={{
                width: 'unset',
                borderRadius: 4,
                margin: 10,
                padding: '5px 1rem',
                ...btnFontSize
              }}
            />
            <FormSubmitBtn
              label="Paypal"
              style={{
                width: 'unset',
                borderRadius: 4,
                margin: 10,
                padding: '5px 1rem',
                ...btnFontSize
              }}
            />
            <FormSubmitBtn
              label="Apple Pay"
              style={{
                width: 'unset',
                borderRadius: 4,
                margin: 10,
                padding: '5px 1rem',
                ...btnFontSize
              }}
            />
          </div>
        </div>
        <div className="p-col-12" style={{ padding: '1rem 1rem 0 1rem' }}>
          <p className="heading">Your Cards</p>
        </div>
        {cards.length ? (
          cards.map(card => (
            <div
              key={card._id}
              className="p-col-12 p-md-6 p-lg-4"
              style={mobileWidth ? { padding: '0.5rem' } : { padding: '1rem' }}
            >
              <CardComponent
                card={card}
                deleteCard={deleteCard}
                makeDefaultCard={makeDefaultCard}
                canDelete={cards.length > 1 && !card.defaultCard}
              />
            </div>
          ))
        ) : (
          <div className="p-col-12">
            <EmptyPlaceholder message="We could not find any cards." />
          </div>
        )}
      </ContainerLayout>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogVisibility(false)}
        aria-labelledby="add-card-dialog"
        className="c-list-dialog"
      >
        <CardAddContainer
          onClose={() => setDialogVisibility(false)}
          cards={cards}
          setCards={props.setCards}
        />
      </Dialog>
    </Page>
  );
};

CardListComponent.propTypes = {
  activity: PropTypes.bool,
  cards: PropTypes.arrayOf(PropTypes.object),
  setCards: PropTypes.func,
  setDialogVisibility: PropTypes.func,
  dialogOpen: PropTypes.bool,
  deleteCard: PropTypes.func,
  makeDefaultCard: PropTypes.func
};

export default CardListComponent;
