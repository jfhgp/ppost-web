import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

const Service = ({ children, bgColor }) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      style={{
        background: bgColor
      }}
    >
      {children}
    </Grid>
  );
};
Service.propTypes = {
  children: PropTypes.shape(),
  bgColor: PropTypes.string,
  color: PropTypes.string
};

export default Service;
