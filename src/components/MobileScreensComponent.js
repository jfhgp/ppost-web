import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

function MobileScreensComponent(props) {
  return (
    <div>
      <Grid container style={{ justifyContent: 'center' }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            maxWidth: 1366,
            padding: '0 1rem',
            paddingBottom: '2rem'
          }}
        >
          {props.children}
        </div>
      </Grid>
    </div>
  );
}

MobileScreensComponent.propTypes = {
  bgImagePath: PropTypes.string
};

export default MobileScreensComponent;
