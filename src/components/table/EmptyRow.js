import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class EmptyRow extends PureComponent {
  render() {
    const { colSpan, message } = this.props;
    return (
      <TableRow>
        <TableCell align="center" colSpan={colSpan}>
          <div className="empty-row">{message || 'No items.'}</div>
        </TableCell>
      </TableRow>
    );
  }
}

EmptyRow.propTypes = {
  colSpan: PropTypes.number,
  message: PropTypes.string
};

export default EmptyRow;
