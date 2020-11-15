import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import { colors } from '../../constants/colors';
import LoginCards from '../../components/LoginCards';

const AwesomeOpportunities = ({ showHeading, showBackground }) => {
  return (
    <div
      style={{
        background: showBackground
          ? `url(${process.env.PUBLIC_URL}/assets/images/awesome-opportunities-bg.png) no-repeat center`
          : 'transparent',
        backgroundSize: 'cover',
        objectFit: 'cover',
        color: '#fff',
        padding: '2rem 0',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Grid container style={{ maxWidth: 1000 }}>
        {showHeading ? (
          <Grid item xs={12}>
            <h1
              variant="h2"
              component="h2"
              color="inherit"
              style={{
                textAlign: 'center',
                marginBottom: 20,
                fontSize: 42
              }}
            >
              <span style={{ color: colors.blue }}>Awesome </span>
              <span style={{ color: colors.orange }}>Opportunities</span>
            </h1>
          </Grid>
        ) : null}
        <Grid container style={{ margin: '0 1rem' }}>
          <LoginCards />
        </Grid>
      </Grid>
    </div>
  );
};

AwesomeOpportunities.propTypes = {
  showHeading: PropTypes.bool,
  showBackground: PropTypes.bool
};

export default AwesomeOpportunities;
