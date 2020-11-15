import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

function MobileScreenComponent(props) {
  return (
    <Grid item xs={12} sm={4} style={{ padding: '1rem' }}>
      <img alt="" src={props.screen} style={{ width: '100%' }} />
    </Grid>
  );
}

MobileScreenComponent.propTypes = {
  screen: PropTypes.string
};

export default MobileScreenComponent;
