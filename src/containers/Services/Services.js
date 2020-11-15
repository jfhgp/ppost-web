import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';

import Header from '../Header';
import Footer from '../Footer';
import ContactUs from '../ContactUs';
import Service from '../../components/Service';
import Feature from '../../components/Feature';
import { colors } from '../../constants/colors';
import ServicesComponent from '../ServicesComponent';
import SliderComponent from '../../components/SliderComponent';

const Services = props => {
  return (
    <React.Fragment>
      <Header
        classes="track-parcel-header"
        showHeader={false}
        handleLoginModalOpen={props.handleLoginModalOpen}
      />
      <Feature>
        <SliderComponent sliderImage="services-header.png" />
      </Feature>
      <div
        style={{
          color: colors.blue,
          background: '#f1f1f2',
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div style={{ maxWidth: 1366, textAlign: 'center' }}>
          <Typography
            variant="h4"
            style={{ color: 'inherit', lineHeight: 0.8 }}
          >
            Services
          </Typography>
          <p style={{ color: '#020202' }}>
            PPost Services can be encapsulated in three main categories, Send
            Parcel, Receive Parcel, Track Parcel. Each Gateway Offers diverse
            range of options.
          </p>
        </div>
      </div>
      <ServicesComponent>
        <Service bgColor={colors.orangeToRight}>
          <div className="services-cards-info">
            <h1>SEND PARCEL</h1>
            <div>
              <p style={{ margin: 0 }}>
                You can deliver any kind of permissible item via PPost. Be it
                office document or home accessory; gift-pack or books; dress or
                travel bag; perishable food or fragile gadget; heavy furniture
                or urgently required medicines; auto-parts or important
                documents. We are ready to serve you. Just give us sender,
                receiver and parcel details.
              </p>
            </div>
          </div>
        </Service>
        <Service>
          <div className="services-cards-info">
            <h1 style={{ color: '#fa7816' }}>RECEIVE PARCEL</h1>
            <div>
              <p style={{ margin: 0, color: '#000' }}>
                PPost also offers unique facility of receiving parcel, where you
                are the payer as receiver. Now you can easily bring any sort of
                parcel from your parents, kids, friends, and/or subordinates,
                without burdening them cost of courier payment. Subject to
                conditions, you can also avail shipping ‘bought-items’ from
                notable malls, and online-stores.
              </p>
            </div>
          </div>
        </Service>
        <Service>
          <div className="services-cards-info">
            <h1 style={{ color: '#fa7816' }}>TRACK PARCEL</h1>
            <div>
              <p style={{ margin: 0, color: '#000' }}>
                PPost parcel tracking system provides exhaustive details,
                including exact geographical location, distance covered,
                transporter’s name, transporter’s contact number, expected
                delivery time, and virtual progress bar. Furthermore, you can
                locate and directly contact the transporter carrying your
                parcel.
              </p>
            </div>
          </div>
        </Service>
        <Service bgColor={colors.orangeToRight}>
          <div className="services-cards-info">
            <h1>GET RATE (FREE)</h1>
            <div>
              <p style={{ margin: 0 }}>
                You can easily get the quote of parcel delivery free of cost.
                Download PPost mobile app, and get a free rate. With PPost, you
                get the cheapest rate, comparing any other courier service. Here
                we go above and beyond, what other companies promise.
              </p>
            </div>
          </div>
        </Service>
      </ServicesComponent>
      <ContactUs bgImagePath="footer-contactus-bg.png" />
      <Footer bgImagePath="/assets/images/footer-bg.png" />
    </React.Fragment>
  );
};

Services.propTypes = {
  handleLoginModalOpen: PropTypes.func
};

export default Services;
