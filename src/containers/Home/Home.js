import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';
import ContactUs from '../ContactUs';
import Parcel from '../../components/Parcel';
import Parcels from '../../components/Parcels';
import Carrousel from '../../components/Carrousel';
import AwesomeOpportunities from '../AwesomeOpportunities';
import MobileAppComponent from '../../components/MobilAppComponent';

require('../style.css');
require('../../layout/layout.css');

const Home = props => {
  return (
    <div className="App">
      <Header
        showHeader={true}
        handleLoginModalOpen={props.handleLoginModalOpen}
      />
      <Carrousel />
      <div className="parcel-boxes-div">
        <Parcels>
          <Parcel
            goto="send-parcel"
            name="Send Parcel"
            details="Sending parcel is as simple as step 1, 2, 3. Choose your own plan, delivery option and pickup schedule."
          />
          <Parcel
            goto="receive-parcel"
            name="Receive Parcel"
            details="A unique offer to receive parcel as payer. A secure timely delivery. We also offer shipping ‘bought items’ from stores"
          />
          <Parcel
            goto="track-parcel"
            name="Track Parcel"
            details="Rich details of your parcel status from origin to destination. Keep in contact with your carrier, anytime, anywhere"
          />
        </Parcels>
      </div>
      <AwesomeOpportunities showHeading showBackground />
      <MobileAppComponent />
      <ContactUs bgImagePath="footer-contactus-bg.png" />
      <Footer bgImagePath="/assets/images/footer-bg.png" />
    </div>
  );
};

Home.propTypes = {
  handleLoginModalOpen: PropTypes.func,
}

export default Home;
