import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';
import Feature from '../../components/Feature';
import SliderComponent from '../../components/SliderComponent';

const HowToDoBusiness = props => {
  return (
    <React.Fragment>
      <Header
        classes="how-to-do-business-header"
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
        <h1>How To Do Business</h1>
      </div>
      <Footer bgImagePath="/assets/images/footer-bg.png" />
    </React.Fragment>
  );
};

HowToDoBusiness.propTypes = {
  handleLoginModalOpen: PropTypes.func
};

export default HowToDoBusiness;
