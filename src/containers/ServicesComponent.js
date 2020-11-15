import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

const ServicesComponent = props => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Exo2-Medium'
      }}
    >
      <Grid container style={{ maxWidth: 1366, textAlign: 'left' }}>
        {props.children}
      </Grid>
    </div>
  );
};
ServicesComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

export default ServicesComponent;
