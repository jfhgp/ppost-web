import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

const GuideLine = props => {
  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        className="parcel-details"
        style={{
          order: props.order,
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: props.bgColor
        }}
      >
        {props.children}
      </Grid>
    </React.Fragment>
  );
};
GuideLine.propTypes = {
  order: PropTypes.number,
  bgColor: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
};

export default GuideLine;
