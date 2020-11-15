import React from 'react';

import { Grid } from '@material-ui/core';

const Location = () => {
  return (
    <Grid container>
      <Grid item xs={12} style={{ minHeight: 400 }}>
        <iframe
          title="Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.7151731300405!2d2.344309315087621!3d48.863641508292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e18f5177959%3A0x8997e086bb619ba2!2s26+Rue+Montorgueil%2C+75001+Paris%2C+France!5e0!3m2!1sen!2s!4v1566205824166!5m2!1sen!2s"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
        />
      </Grid>
    </Grid>
  );
};

export default Location;
