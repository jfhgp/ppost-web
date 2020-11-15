import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import routes from '../../constants/route-constants';
import { getColor } from '../../utils/functions';

const allTimeRecords = ['pending', 'inprogress', 'cancelled', 'delivered'];

class TransporterRequestComponent extends Component {
  getTotalOrders = () =>
    this.props.allTimeRecord.length &&
    this.props.allTimeRecord.reduce(
      (total, current) => total + current.count,
      0
    );

  getAllTimeRecords = () => {
    const { allTimeRecord } = this.props;

    let allTimeRecordData = Array.from(Array(4), (x, index) => ({
      _id: allTimeRecords[index],
      count: 0
    }));

    allTimeRecord.length &&
      allTimeRecord.forEach(rec => {
        const foundIndex = allTimeRecordData.findIndex(el => {
          if (rec._id === 'accepted' || rec._id === 'picked') {
            return el._id === 'inprogress';
          } else if (
            rec._id === 'cancelledbyuser' ||
            rec._id === 'cancelledbytransporter' ||
            rec._id === 'cancelledbyadmin'
          ) {
            return el._id === 'cancelled';
          }
          return el._id === rec._id;
        });
        const found = allTimeRecordData[foundIndex];

        let updateData;
        if (found) {
          updateData = { ...found };
          updateData.count = updateData.count + rec.count;
          allTimeRecordData = [...allTimeRecordData];
          allTimeRecordData[foundIndex] = updateData;
        }
      });

    return allTimeRecordData;
  };

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

  render() {
    let totalOrders = this.getTotalOrders();
    let allRecords = this.getAllTimeRecords();
    return (
      <List dense={true}>
        {allRecords.map(req => {
          const { _id, count } = req;
          return (
            <React.Fragment key={_id}>
              <Link
                to={`/${routes.typeTransporter}/${
                  routes.myRequests
                }/${this.getStatus(_id)}`}
              >
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
              </Link>
            </React.Fragment>
          );
        })}
        <div style={{ marginBottom: 5, background: '#fff' }}>
          <Link to={`/${routes.typeTransporter}/${routes.myRequests}/all`}>
            <ListItem>
              <ListItemText style={{ textTransform: 'capitalize' }}>
                All Records
              </ListItemText>
              <ListItemSecondaryAction>
                <ListItemText>{totalOrders}</ListItemText>
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        </div>

        {/* {allTimeRecord.length
          ? allTimeRecord
              .filter(
                record =>
                  record._id !== 'cancelledbyuser' &&
                  record._id !== 'cancelledbytransporter'
              )
              .map(req => {
                const { _id, count } = req;
                return (
                  <React.Fragment key={_id}>
                    <div style={{ marginBottom: 5, background: '#fff' }}>
                      <ListItem>
                        <ListItemText style={{ textTransform: 'capitalize' }}>
                          {_id}
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <ListItemText>{count}</ListItemText>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </div>
                  </React.Fragment>
                );
              })
          : ['Picked', 'Accepted', 'Delivered', 'Pending'].map(req => {
              return (
                <React.Fragment key={req}>
                  <div style={{ marginBottom: 5, background: '#fff' }}>
                    <ListItem>
                      <ListItemText style={{ textTransform: 'capitalize' }}>
                        {req}
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <ListItemText>0</ListItemText>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </div>
                </React.Fragment>
              );
            })} */}
      </List>
    );
  }
}

TransporterRequestComponent.propTypes = {
  allTimeRecord: PropTypes.array
};

export default TransporterRequestComponent;
