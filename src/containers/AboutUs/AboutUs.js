import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import Header from '../Header';
import Footer from '../Footer';
import ContactUs from '../ContactUs';
import Feature from '../../components/Feature';
import { colors } from '../../constants/colors';
import SliderComponent from '../../components/SliderComponent';
import { NonFuncFeatures, NonFuncFeaturesCard } from '../NonFuncFeatures';

const AboutUs = props => {
  return (
    <React.Fragment>
      <Header
        classes="track-parcel-header"
        showHeader={false}
        handleLoginModalOpen={props.handleLoginModalOpen}
      />
      <Feature>
        <SliderComponent sliderImage="about-header.png" />
      </Feature>
      <div className="about-us-info send-parcel-info">
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
              <h1>ABOUT US</h1>
              <div>
                <p style={{ margin: 0 }}>
                  PPost is an affordable and trusted service provider company.
                  We offer online logistics and transportation services to
                  deliver wide range of parcels, packages, posts, mails. Having
                  its head office in Paris (France), PPost network exclusively
                  covers all 28 countries of EU (European Union). We have
                  state-of-the-art virtual platform, robust web and mobile
                  applications, and professional team to serve our valued
                  customers round the clock. Affordability, security, and
                  timeliness are benchmarks of PPost.
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <NonFuncFeatures>
        <Grid item xs={12} sm={6} md={4}>
          <NonFuncFeaturesCard
            bgImage="/assets/images/about-affordability.png"
            heading="Affordability"
            body="With PPost, you get the cheapest rate, comparing any other courier service.
Moreover, we do not have any hidden charges. Here we go above and beyond, what other
companies promise. This is not just a claim. Download PPost mobile app, and get a free
rate."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <NonFuncFeaturesCard
            bgImage="/assets/images/about-security.png"
            heading="Security"
            body="PPost does not merely provide vague status to the customers in the name of track
parcel. The ‘Track Parcel’ system of PPost offers rich details including exact geographical
location, distance covered, transporter’s name, transporter’s contact number, expected
delivery time, and virtual progress bar. On top of this, you can locate and directly contact to
transporter carrying your parcel. In order to claim damage or lose, you can entertain
insurance service as well."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <NonFuncFeaturesCard
            bgImage="/assets/images/about-timeliness.png"
            heading="Timeliness"
            body="The ever-mobile team of PPost transporters strive best to deliver your posts and
parcels on time. In this regard, we are committed to provide best services to its valued
customers. We deliver parcels in hours, not in days. Because PPost delivery system is direct
and straightforward, without waiting other requests, or involving third party."
          />
        </Grid>
      </NonFuncFeatures>

      <ContactUs bgImagePath="footer-contactus-bg.png" />
      <Footer bgImagePath="/assets/images/footer-bg.png" />
    </React.Fragment>
  );
};

AboutUs.propTypes = {
  handleLoginModalOpen: PropTypes.func
};

export default AboutUs;
