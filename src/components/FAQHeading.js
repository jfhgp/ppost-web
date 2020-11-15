import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import PropTypes from 'prop-types';

class FAQHeading extends Component {
  render() {
    return (
      <Grid item xs={12}>
        <div
          style={{
            background: '#ccc',
            padding: '1rem'
          }}
        >
          <h1
            className="text-center"
            style={{
              fontSize: '2rem',
              textAlign: 'center',
              color: '#152972'
            }}
          >
            {this.props.heading}
          </h1>
        </div>
      </Grid>
    );
  }
}

FAQHeading.propTypes = {
  heading: PropTypes.string
};

export default FAQHeading;
