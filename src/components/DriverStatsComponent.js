import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import routes from '../constants/route-constants';
import { getColor } from '../utils/functions';

const allTimeRecords = ['pending', 'inprogress', 'cancelled', 'delivered'];

class DriverStatsComponent extends Component {
  getTotalOrders = () =>
    Object.entries(this.props.stats).reduce(
      (accumulator, currentValue) => accumulator + currentValue[1],
      0
    );

  getStatus = type => {
    switch (type) {
      case 'delivered':
        return 'completed';
      case 'inprogress':
        return 'accepted';
      case 'assigned':
        return 'pending';
      default:
        return type;
    }
  };

  getAllTimeRecords = () => {
    const prop = Object.keys(this.props.stats);
    let allTimeRecordData = Array.from(Array(4), (x, index) => ({
      _id: allTimeRecords[index],
      count: 0
    }));

    prop.length &&
      prop.forEach(rec => {
        const foundIndex = allTimeRecordData.findIndex(el => {
          if (rec === 'accepted' || rec === 'picked') {
            return el._id === 'inprogress';
          } else if (
            rec === 'cancelledbyuser' ||
            rec === 'cancelledbytransporter' ||
            rec === 'cancelledbyadmin'
          ) {
            return el._id === 'cancelled';
          }
          return el._id === rec;
        });
        const found = allTimeRecordData[foundIndex];

        let updateData;
        if (found) {
          updateData = { ...found };
          updateData.count = updateData.count + this.props.stats[rec];
          allTimeRecordData = [...allTimeRecordData];
          allTimeRecordData[foundIndex] = updateData;
        }
      });

    return allTimeRecordData;
  };
  render() {
    let totalOrders = this.getTotalOrders();
    let allRecords = this.getAllTimeRecords();
    return (
      <List dense={true}>
        {allRecords.map(req => {
          const { _id, count } = req;
          return (
            <React.Fragment key={_id}>
              {/* <Link
                to={`/${routes.typeTransporter}/${
                  routes.myRequests
                }/${this.getStatus(_id)}`}
              > */}
              <div style={{ marginBottom: 5, background: getColor(_id) }}>
                <ListItem>
                  <ListItemText style={{ textTransform: 'capitalize' }}>
                    <span style={{ color: 'white' }}>
                      {_id === 'pending' ? 'Assigned' : _id}
                    </span>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <ListItemText>
                      <span style={{ color: 'white' }}>{count}</span>
                    </ListItemText>
                  </ListItemSecondaryAction>
                </ListItem>
              </div>
              {/* </Link> */}
            </React.Fragment>
          );
        })}

        <div style={{ marginBottom: 5, background: '#fff' }}>
          {/* <Link to={`/${routes.typeTransporter}/${routes.myRequests}/all`}> */}
          <ListItem>
            <ListItemText style={{ textTransform: 'capitalize' }}>
              All Orders
            </ListItemText>
            <ListItemSecondaryAction>
              <ListItemText>{totalOrders}</ListItemText>
            </ListItemSecondaryAction>
          </ListItem>
          {/* </Link> */}
        </div>
      </List>
    );
  }
}

DriverStatsComponent.propTypes = {
  stats: PropTypes.object.isRequired
};

export default DriverStatsComponent;
