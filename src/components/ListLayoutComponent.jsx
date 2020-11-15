import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import moment from 'moment';

import { classNames } from '../utils/functions';

class ListLayoutComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.shouldListLayoutComponentUpdate;
  }

  getLabel = (type, data, keys, user, options, format) => {
    let label = data;

    switch (type) {
      case 'address': {
        keys.forEach(key => {
          label = label[key];
        });
        return label;
      }
      case 'price': {
        keys.forEach(key => {
          if (label) {
            label = label[key];
          }
        });
        if (label) {
          return `${user.config.currency} ${label.toFixed(2)}`;
        }
        return '';
      }
      case 'date': {
        keys.forEach(key => {
          label = label[key];
        });
        return moment(label).format(format);
      }
      case 'concat': {
        label = '';
        keys.forEach(key => {
          label += data[key];
          label += ' ';
        });
        return label.trim();
      }
      case 'bool': {
        keys.forEach(key => {
          label = options[label[key]];
        });
        return label;
      }

      default:
        return '';
    }
  };

  handleSort(e, item) {
    e.stopPropagation();
    if (item.sortBy) {
      this.props.handleSort(item.sortBy, item.key);
    }
  }

  render() {
    const { values, options, history } = this.props;

    return (
      <Table className="list-layout-table">
        <TableHead>
          <TableRow>
            {this.props.headings.map((heading, index) => (
              <TableCell
                key={`${heading.label}-${index + 1}`}
                className={classNames([['is-clickable', heading.sortBy]])}
                style={
                  index === this.props.headings.length - 1
                    ? { borderRight: 'none', padding: '1em' }
                    : { padding: '1em' }
                }
                onClick={e => this.handleSort(e, heading)}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span
                    className={classNames([
                      ['expand-short', heading.label.length >= 5],
                      ['expand-long', heading.label.length >= 10]
                    ])}
                  >
                    {heading.label}
                  </span>
                  {heading.sortBy === this.props.sortBy ? (
                    <i
                      style={{ marginLeft: '0.5em', fontSize: 12 }}
                      className="fas fa-chevron-down"
                    />
                  ) : null}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {values.length ? (
            values.map((value, index) => (
              <TableRow
                key={`TableRow-${index + 1}`}
                style={{
                  backgroundColor: index % 2 !== 0 ? '#e1e1e1' : 'none',
                  cursor: 'pointer'
                }}
                onClick={() => history.push(`${this.props.goTo}/${value._id}`)}
              >
                {options.map((key, i) => (
                  <TableCell
                    key={`TableCell-${i + 1}`}
                    style={
                      i === options.length - 1
                        ? { borderRight: 'none', padding: '1em' }
                        : { padding: '1em' }
                    }
                  >
                    {key.getLabel
                      ? this.getLabel(
                          key.type,
                          value,
                          key.keys,
                          this.props.user,
                          key.options,
                          key.format
                        )
                      : value[key.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow style={{ backgroundColor: '#e1e1e1' }}>
              <TableCell
                colSpan={this.props.headings.length}
                style={{
                  color: '#999',
                  padding: '1em',
                  borderRight: 'none',
                  textAlign: 'center'
                }}
              >
                {this.props.emptyDataMessage || 'We could find any requests.'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}

ListLayoutComponent.defaultProps = {
  values: [],
  options: [],
  headings: [],
  shouldListLayoutComponentUpdate: false
};

ListLayoutComponent.propTypes = {
  goTo: PropTypes.string,
  user: PropTypes.shape(),
  sortBy: PropTypes.string,
  history: PropTypes.shape(),
  handleSort: PropTypes.func,
  emptyDataMessage: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.shape()),
  options: PropTypes.arrayOf(PropTypes.shape()),
  headings: PropTypes.arrayOf(PropTypes.shape()),
  shouldListLayoutComponentUpdate: PropTypes.bool
};

export default withRouter(ListLayoutComponent);
