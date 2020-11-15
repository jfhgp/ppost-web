import React from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { dateFormatDatePicker } from '../../constants/project-constants';
import { getPrimaryColors } from '../../utils/functions';

const UiCard = ({
  children,
  icon = 'home',
  name,
  showDate,
  startDate,
  endDate,
  handleDateChange
}) => {
  return (
    <div
      style={{
        position: 'relative',
        border: '0.5px solid orange',
        minHeight: 220,
        height: '100%',
        background: '#f5f5f5',
        // overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
        // padding: 4
      }}
    >
      {/* left */}
      <div
        style={{
          maxWidth: 302,
          background: '#fa7816',
          // position: 'absolute',
          top: 0,
          left: 0,
          borderBottomRightRadius: 30,
          color: '#fff',
          fontSize: '18px',
          padding: 8
        }}
      >
        <span>
          <i className={`fa fa-${icon}`} />
          <span style={{ marginLeft: 5 }}>{name}</span>
        </span>
      </div>

      {/* right */}
      {showDate ? (
        <div className="chartDateContainer">
          <div
            className="dashboard-date-picker"
            style={{
              marginRight: 5,
              padding: 5,
              display: 'flex',
              backgroundColor: getPrimaryColors('primary'),
              borderRadius: 5
            }}
          >
            <img alt="" src={require('../../static/icons/calender-icon.png')} />
            <DatePicker
              selected={startDate}
              onChange={e => handleDateChange(e, 'startDate')}
              dateFormat={dateFormatDatePicker}
            />
          </div>
          <div
            className="dashboard-date-picker"
            style={{
              padding: 5,
              display: 'flex',
              backgroundColor: getPrimaryColors('primary'),
              borderRadius: 5
            }}
          >
            <img alt="" src={require('../../static/icons/calender-icon.png')} />
            <DatePicker
              selected={endDate}
              onChange={e => handleDateChange(e, 'endDate')}
              dateFormat={dateFormatDatePicker}
            />
          </div>
        </div>
      ) : null}

      <div
        className="statistic-chart"
        style={{
          padding: 4,
          color: 'black',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </div>
    </div>
  );
};

UiCard.propTypes = {
  children: PropTypes.element,
  icon: PropTypes.string,
  name: PropTypes.string,
  showDate: PropTypes.bool,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  handleDateChange: PropTypes.func
};

export default UiCard;
