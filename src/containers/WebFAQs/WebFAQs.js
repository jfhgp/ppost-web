import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';
import Feature from '../../components/Feature';
import SliderComponent from '../../components/SliderComponent';
import ContactUs from '../ContactUs';
import FAQDashboard from '../FAQDashboard';

const styles = {
  background: {
    background: '#f0f0f0'
  },
  pageTitle: {}
};

const WebFAQs = props => {
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
      <FAQDashboard addStyle={styles} className="web-faq-dashboard" />
      <ContactUs bgImagePath="footer-contactus-bg.png" />
      <Footer bgImagePath="/assets/images/footer-bg.png" />
    </React.Fragment>
  );
};

WebFAQs.propTypes = {
  handleLoginModalOpen: PropTypes.func
};

export default WebFAQs;
