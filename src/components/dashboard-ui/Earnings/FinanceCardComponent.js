import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { getFinancesColors } from '../../../utils/functions';
import { dateFormat } from '../../../constants/project-constants';

const FinanceCardComponent = props => {
  return (
    <>
      <div className="_finance_card finance-card" onClick={props.openDialog}>
        <div style={{ flex: 1 }}>
          <p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/icon/icon-Price.png`}
              alt=""
              className="icon"
            />
            {props.currency} {props.amount}
          </p>
          <p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/icon/icon-package.png`}
              alt=""
              className="icon"
            />
            {`${props.orders} (Orders)`}
          </p>

          {props.lastPaidDate ? (
            <p>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/icon/icon-Date.png`}
                alt=""
                className="icon"
              />
              {moment(props.lastPaidDate).format(dateFormat)}
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div
          className="text-right _finance-status"
          style={{
            alignSelf: 'flex-end',
            justifySelf: 'flex-end',
            backgroundColor: getFinancesColors(props.status)
          }}
        >
          <p style={{ padding: 0 }}>
            {props.status === 'pending' ? 'Unpaid' : props.status}
          </p>
        </div>
      </div>
    </>
  );
};

FinanceCardComponent.propTypes = {
  openDialog: PropTypes.func,
  status: PropTypes.string,
  currency: PropTypes.string,
  amount: PropTypes.string,
  orders: PropTypes.number,
  lastPaidDate: PropTypes.string
};

export default FinanceCardComponent;
