import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { withStyles } from '@material-ui/core/styles';

import { getPrimaryColors } from '../../utils/functions';
import { dateFormat } from '../../constants/project-constants';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#152972',
    color: theme.palette.common.white,
    borderRight: '1px solid #fefefe',
    padding: '4px 18px 4px 18px'
  },
  body: {
    fontSize: 14,
    color: '#2b2b2b',
    textTransform: 'capitalize',
    borderRight: '1px solid #fefefe',
    padding: '5px'
  }
}))(TableCell);

const styles = () => ({
  root: {
    width: '100%',
    flexGrow: 1,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#ccc',
      padding: 0
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#ebebeb',
      padding: 0
    }
  }
});

class RecentActivity extends Component {
  render() {
    const { classes, rows, history, goTo } = this.props;
    return (
      <>
        <div className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell align="left">OrdersID</CustomTableCell>
                <CustomTableCell align="left">Pickup</CustomTableCell>
                <CustomTableCell align="left">DropOff</CustomTableCell>
                <CustomTableCell align="left" style={{ minWidth: 100 }}>
                  Date
                </CustomTableCell>
                <CustomTableCell align="left">Status</CustomTableCell>
                <CustomTableCell align="left" style={{ minWidth: 110 }}>
                  Currency
                </CustomTableCell>
                <CustomTableCell align="left" style={{ minWidth: 110 }}>
                  Notes
                </CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? (
                rows.map(row => (
                  <TableRow
                    className={classes.row}
                    key={row._id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => history.push(`${goTo}/${row._id}`)}
                  >
                    <CustomTableCell align="left">
                      {row.orderNumber}
                    </CustomTableCell>
                    <CustomTableCell align="left">
                      {row.pickup.address}
                    </CustomTableCell>
                    <CustomTableCell align="left">
                      {row.dropoff.address}
                    </CustomTableCell>
                    <CustomTableCell align="left">
                      {moment(row.pickupDate).format(dateFormat)}
                    </CustomTableCell>
                    <CustomTableCell align="left">
                      <span style={{ color: 'darkgreen', fontWeight: 'bold' }}>
                        {row.status}
                      </span>
                    </CustomTableCell>
                    {/* <CustomTableCell align="left">
                    {`${row.config.currency} ${parseFloat(row.rates.price).toFixed(2)}`}
                    </CustomTableCell> */}
                    <CustomTableCell align="left">
                      {row.rates
                        ? `${row.config.currency} ${parseFloat(
                          row.rates.price
                        ).toFixed(2)}`
                        : `${row.config.currency} ${parseFloat(0).toFixed(2)}`}
                    </CustomTableCell>
                    <CustomTableCell align="left">
                      {row.notes}
                    </CustomTableCell>
                  </TableRow>
                ))
              ) : (
                  <TableRow className={classes.row}>
                    <CustomTableCell scope="col" colSpan={7}>
                      No Recent Activities
                  </CustomTableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </div>
        <div className="text-right" style={{ padding: '5px 0' }}>
          <Link to={this.props.routeTo} style={{ color: '#7d7d7d' }}>
            More{' '}
            <span
              style={{
                color: getPrimaryColors('secondary'),
                padding: '0px 5px',
                fontWeight: 'bolder'
              }}
            >
              <i className="fas fa-long-arrow-alt-right" />
            </span>
          </Link>
        </div>
      </>
    );
  }
}

RecentActivity.defaultProps = {
  routeTo: 'requests'
};

RecentActivity.propTypes = {
  routeTo: PropTypes.string,
  classes: PropTypes.object.isRequired,
  rows: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.arrayOf(PropTypes.shape())
  ]),
  history: PropTypes.shape({ push: PropTypes.func }),
  goTo: PropTypes.string
};

export default withRouter(withStyles(styles)(RecentActivity));
