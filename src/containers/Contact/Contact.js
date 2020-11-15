import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';
import Location from '../Location';
import ContactUs from '../ContactUs';
import Feature from '../../components/Feature';
import SliderComponent from '../../components/SliderComponent';

class Contact extends Component {
  render() {
    return (
      <React.Fragment>
        <Header
          classes="track-parcel-header"
          showHeader={false}
          handleLoginModalOpen={this.props.handleLoginModalOpen}
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
          <h1>Location Map: PPost Head Office, Pari</h1>
        </div>
        <Location isTrue={true} />
        <ContactUs bgImagePath="footer-contactus-bg.png" />
        <Footer bgImagePath="/assets/images/footer-bg.png" />
      </React.Fragment>
    );
  }
}

Contact.propTypes = {
  handleLoginModalOpen: PropTypes.func
};

export default Contact;
