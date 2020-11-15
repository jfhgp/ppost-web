import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

const Guide = props => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Grid
        container
        spacing={16}
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px 0px',
          paddingRight: 0,
          width: '100%',
          color: 'white',
          margin: 0,
          maxWidth: 1366
        }}
      >
        {props.children}
      </Grid>
    </div>
  );
};

Guide.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

export default Guide;
