import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Checkbox, FormControlLabel } from '@material-ui/core';
import { classNames, getDiscountedPrice } from '../../../../utils/functions';
import moment from 'moment';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getPrimaryColors } from '../../../../utils/functions';
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

export default class ChangeLocationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }
  render() {
    const {
      activity,
      pickup,
      dropoff,
      getRate,
      promoObject,
      rates,
      user
    } = this.props;
    return (
      <div className="cancel-request-dialog">
        <DialogTitle>Request Change Location</DialogTitle>
        <DialogContent>
          <div
            className="p-grid"
            style={{
              margin: 0,
              padding: '0',
              flexGrow: 1
            }}
          >
            <div className="p-col-12 p-lg-6" style={{ padding: 0 }}>
              <div className="subheading-big" style={{ padding: '1em' }}>
                <p>Pickup</p>
                <img
                  alt=""
                  src={require('../../../../static/icons/icon-Pickup.png')}
                />
                <span>{pickup.address}</span>


              </div>
            </div>
            <div
              className="p-col-12 p-lg-6"
              style={{ padding: '0', backgroundColor: '#fff' }}
            >



              <div className="subheading-big" style={{ padding: '1em' }}>
                <p>Dropoff</p>

                <img
                  alt=""
                  src={require('../../../../static/icons/icon-DropOff.png')}
                />
                <span>{dropoff.address}</span>
              </div>

            </div>
          </div>
          {getRate ? (
            <>
              <p className="heading">Request Price</p>
              <div
                style={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: 'Exo2-Medium'
                }}
              >
                <span
                  style={
                    promoObject._id
                      ? {
                        fontSize: '1em',
                        marginRight: 10,
                        textDecoration: 'line-through',
                        color: getPrimaryColors('primary')
                      }
                      : {
                        fontSize: '1.3rem',
                        color: getPrimaryColors('error')
                      }
                  }
                >
                  {/* {user.config.currency} {rates.price.toFixed(2)} */}
                  {user.config.currency} {rates.minPrice.toFixed(2)} -{' '}
                  {user.config.currency} {rates.maxPrice.toFixed(2)}
                </span>
                {promoObject._id ? (
                  <span
                    style={{
                      fontSize: '1.3rem',
                      color: getPrimaryColors('error')
                    }}
                  >
                    {/* {user.config.currency}{' '}
                      {getDiscountedPrice(
                        rates.price,
                        promoObject.discount
                      ).toFixed(2)} */}
                    {user.config.currency}{' '}
                    {getDiscountedPrice(
                      rates.minPrice,
                      promoObject.discount
                    ).toFixed(2)}{' '}
                    {' - '}
                    {user.config.currency}{' '}
                    {getDiscountedPrice(
                      rates.maxPrice,
                      promoObject.discount
                    ).toFixed(2)}
                  </span>
                ) : null}
              </div>
            </>
          ) : null}
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
            label="Submit"
            disabled={activity}
            onSubmit={this.props.handleSubmitOrder}
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

ChangeLocationComponent.propTypes = {
  cancelType: PropTypes.string,
  handleSetDetails: PropTypes.func,
  handleDialogClose: PropTypes.func,
  details: PropTypes.shape({
    _id: PropTypes.string,
    pickupTime: PropTypes.shape(),
    pickupDate: PropTypes.string
  })
};
