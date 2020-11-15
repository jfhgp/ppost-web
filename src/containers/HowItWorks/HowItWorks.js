import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';
import Feature from '../../components/Feature';
import SliderComponent from '../../components/SliderComponent';

const HowItWorks = props => {
  return (
    <React.Fragment>
      <Header
        classes="how-it-works-header"
        showHeader={false}
        handleLoginModalOpen={props.handleLoginModalOpen}
      />
      <Feature>
        <SliderComponent sliderImage="contact-header.png" />
      </Feature>
      <div
        style={{
          marginTop: '2rem',
          backgroundColor: 'orange',
          color: '#f1f1f1',
          textAlign: 'center',
          padding: '20px 2rem'
        }}
      >
        <h1>How It Works</h1>
      </div>
      <Footer bgImagePath="/assets/images/footer-bg.png" />
    </React.Fragment>
  );
};

HowItWorks.propTypes = {
  handleLoginModalOpen: PropTypes.func
};

export default HowItWorks;
