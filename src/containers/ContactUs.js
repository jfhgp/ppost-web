import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Grid } from '@material-ui/core';

import { getPrimaryColors } from '../utils/functions';
import ContactDetails from './ContactDetails';
import ContactForm from './ContactForm';

const ContactUs = props => {
  return (
    <div
      className="home-contact-us"
      style={{
        padding: '0 2rem',
        background: `url(${process.env.PUBLIC_URL}/assets/images/${props.bgImagePath}) no-repeat center`
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div
          style={{ maxWidth: 600, padding: '2rem 1rem', textAlign: 'center' }}
        >
          <Typography variant="h5" style={{ marginBottom: 10 }}>
            <span style={{ color: getPrimaryColors('secondary') }}>
              Contact
            </span>{' '}
            <span style={{ color: getPrimaryColors('primary') }}>Us</span>
          </Typography>
          <Typography variant="body2">
            If you have any question, confusion, suggestion or feedback then
            feel free to contact us. We’d like to hear about it right away. The
            dedicated Support Team of PPost is on hand to troubleshoot and steer
            you in the right direction.
          </Typography>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '3rem'
        }}
      >
        <Grid
          container
          className="contact-details"
          style={{ justifyContent: 'center' }}
        >
          <Grid item xs={12} md={5}>
            <ContactDetails />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={7}
            style={{ justifyContent: 'center' }}
          >
            <ContactForm />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

ContactUs.propTypes = {
  bgImagePath: PropTypes.string.isRequired
};

export default ContactUs;
