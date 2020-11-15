import React, { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer
} from 'recharts';

import PropTypes from 'prop-types';

const monthName = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export class LineChartComponent extends Component {
  getEarning = () => {
    const { earningReport } = this.props;
    let earnings = Array.from(Array(12), (x, index) => ({
      month: monthName[index],
      monthName: monthName[index],
      total: 0
    }));

    earningReport.map(earning => {
      const found = earnings.some(
        el => el.month === monthName[earning._id.month - 1]
      );
      if (!found) {
        earnings.push({
          month: earning._id.month - 1,
          monthName: monthName[earning._id.month - 1],
          total: earning.total
        });
      } else {
        earnings[earning._id.month - 1].total = earning.total;
      }
    });
    return earnings;
  };
  render() {
    let earnings = this.getEarning();
    earnings = earnings.sort((a, b) => a.month - b.month);
    return (
      <ResponsiveContainer>
        <LineChart
          data={earnings}
          margin={{
            top: 8,
            right: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <XAxis dataKey="monthName" />
          <YAxis dataKey="total" />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#152972"
            dot={true}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export class BarChartComponent extends Component {
  getData = () => {
    const { pending, cancelled, delivered, inprogress } = this.props;

    var finalData = Array.from(Array(6), (x, index) => ({
      month: monthName[index],
      pending: 0,
      delivered: 0,
      cancelled: 0,
      inprogress: 0
    }));

    pending.forEach(pending => {
      const found = finalData.some(
        el => el.month === monthName[pending._id.month - 1]
      );

      if (!found) {
        finalData.push({
          month: monthName[pending._id.month - 1],
          pending: pending.count
        });
      } else {
        finalData[pending._id.month - 1].pending = pending.count;
      }
    });

    delivered.forEach(delivered => {
      const found = finalData.some(
        el => el.month === monthName[delivered._id.month - 1]
      );

      if (!found) {
        finalData.push({
          month: monthName[delivered._id.month - 1],
          delivered: delivered.count
        });
      } else {
        finalData[delivered._id.month - 1].delivered = delivered.count;
      }
    });

    cancelled.forEach(cancelled => {
      const found = finalData.some(
        el => el.month === monthName[cancelled._id.month - 1]
      );

      if (!found) {
        finalData.push({
          month: monthName[cancelled._id.month - 1],
          cancelled: cancelled.count
        });
      } else {
        finalData[cancelled._id.month - 1].cancelled = cancelled.count;
      }
    });

    inprogress.forEach(inprogress => {
      const found = finalData.some(
        el => el.month === monthName[inprogress._id.month - 1]
      );

      if (!found) {
        finalData.push({
          month: monthName[inprogress._id.month - 1],
          inprogress: inprogress.count
        });
      } else {
        finalData[inprogress._id.month - 1].inprogress = inprogress.count;
      }
    });

    return finalData;
  };

  render() {
    const data1 = this.getData();
    const { getRequestColor } = this.props;
    return (
      <div style={{ width: '100%', height: 180 }}>
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={200}
            data={data1}
            margin={{
              top: 3,
              right: 0,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="delivered" fill={getRequestColor('delivered')} />
            <Bar dataKey="pending" fill={getRequestColor('pending')} />
            <Bar dataKey="cancelled" fill={getRequestColor('cancelled')} />
            <Bar dataKey="inprogress" fill={getRequestColor('inprogress')} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

LineChartComponent.propTypes = {
  earningReport: PropTypes.array
};

BarChartComponent.propTypes = {
  delivered: PropTypes.array,
  pending: PropTypes.array,
  cancelled: PropTypes.array,
  inprogress: PropTypes.array,
  getRequestColor: PropTypes.func
};
