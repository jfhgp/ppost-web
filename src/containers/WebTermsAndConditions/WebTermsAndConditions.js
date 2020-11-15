import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';
import Feature from '../../components/Feature';
import SliderComponent from '../../components/SliderComponent';
import ContactUs from '../ContactUs';

import TermsAndConditions from '../TermsAndConditions';

const styles = {
  background: {
    background: '#f0f0f0'
  },
  pageTitle: {}
};

const WebTermsAndConditions = props => {
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
      <TermsAndConditions addStyle={styles} className="web-terms-conditions" />
      <ContactUs bgImagePath="footer-contactus-bg.png" />
      <Footer bgImagePath="/assets/images/footer-bg.png" />
    </React.Fragment>
  );
};

WebTermsAndConditions.propTypes = {
  handleLoginModalOpen: PropTypes.func
};

export default WebTermsAndConditions;
