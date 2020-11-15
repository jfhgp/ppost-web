import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactPaginate from 'react-paginate';

import './Paginate.css';

class Paginate extends Component {
  render() {
    return (
      <>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.props.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.props.handlePageClick}
          containerClassName={'p-grid container-layout pagination'}
          pageClassName={'page-list'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </>
    );
  }
}

Paginate.propTypes = {
  handlePageClick: PropTypes.func,
  pageCount: PropTypes.number
};

export default Paginate;
