import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import Header from '../Header';
import Footer from '../Footer';
import ContactUs from '../ContactUs';
import Feature from '../../components/Feature';
import AwesomeOpportunities from '../AwesomeOpportunities';
import SliderComponent from '../../components/SliderComponent';
import { colors } from '../../constants/colors';

function Transporters(props) {
  return (
    <div>
      <Header classes="track-parcel-header" showHeader={false} handleLoginModalOpen={props.handleLoginModalOpen}/>
      <Feature>
        <SliderComponent sliderImage="transporter-header.png" />
      </Feature>
      <div
        className="about-us-info send-parcel-info"
        style={{ paddingBottom: 0 }}
      >
        <Grid container>
          <Grid item xs={12} sm={6} md={6}>
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/assets/images/about-img.png`}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div style={{ backgroundImage: colors.blueToRight }}>
              <h1>TRANSPORTERS</h1>
              <div style={{ paddingTop: '1.5rem', justifyContent: 'unset' }}>
                <p style={{ margin: 0 }}>
                  The ever-mobile courier (i.e. drivers and transporters) are
                  the PPost face on ground. We have a great team of transporters
                  at every corner of Europe. They are dedicated to their work,
                  and quick to deliver your parcel at right time and right
                  place. PPost offers great opportunity to join work as
                  transporter and earn well. You can serve as full-time or
                  part-time according to your schedule. PPost select
                  transporters on the merit of valid driving license, vehicle
                  quality and capacity, understanding of routes, and endorsement
                  of logistics ethics. If you are an interested candidate to
                  become a transporter, then please signup as transporter, or
                  contact us for further details.
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <AwesomeOpportunities />
      <ContactUs bgImagePath="footer-contactus-bg.png" />
      <Footer bgImagePath="/assets/images/footer-bg.png" />
    </div>
  );
}

Transporters.propTypes = {
  handleLoginModalOpen: PropTypes.func,
};

export default Transporters;
