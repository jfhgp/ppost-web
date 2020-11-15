import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import Footer from '../Footer';
import Header from '../Header';
import ContactUs from '../ContactUs';
import Feature from '../../components/Feature';
import SliderComponent from '../../components/SliderComponent';
import MobileScreenComponent from '../../components/MobileScreenComponent';
import MobileScreensComponent from '../../components/MobileScreensComponent';
import { FAQData } from '../DashboardHelpPageData';
import FAQHeading from '../../components/FAQHeading';
import FAQComponent from '../../components/FAQs';

class ReceiveParcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faqs: []
    };
  }

  componentDidMount() {
    let receiveParcel = FAQData.filter(
      parcel => parcel.name === 'Receive Parcel'
    );
    this.setState({
      faqs: receiveParcel[0].items
    });
  }

  toggleFAQ = _id => {
    let faq = this.state.faqs.map(faq => {
      if (faq._id === _id) {
        faq.open = !faq.open;
      } else {
        faq.open = false;
      }
      return faq;
    });
    this.setState({
      faqs: faq
    });
  };

  render() {
    const { faqs } = this.state;
    const ReceiveParcelColumnStart = Math.floor(faqs.length / 2);
    return (
      <React.Fragment>
        <Header classes="track-parcel-header" showHeader={false} handleLoginModalOpen={this.props.handleLoginModalOpen}/>
        <Feature>
          <SliderComponent sliderImage="receive-parcel-header.png" />
        </Feature>
        <div className="receive-parcel-info">
          <Grid container>
            <Grid item xs={12} sm={6}>
              <div>
                <h1>RECEIVE PARCEL</h1>
                <div>
                  <p style={{ margin: 0 }}>
                    PPost also offers unique facility of receiving parcel, where
                    you are the payer as receiver. Now you can easily bring any
                    sort of parcel from your parents, kids, friends, and/or
                    subordinates, without burdening them cost of courier
                    payment. Subject to conditions, you can also avail shipping
                    ‘bought-items’ from notable malls, and online-stores.
                  </p>
                  <p style={{ margin: 0 }}>
                    After signup, you can order “Receive Parcel” from PPost
                    website or from PPost mobile app. This is a simple 3-step
                    procedure. Step 1 is about receiver’s name, contact and
                    location. Step 2 is about sender’s name, contact and
                    location. Step 3 is about parcel info, for instance, parcel
                    weight, size and quantity.
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img
                alt=""
                src={`${process.env.PUBLIC_URL}/assets/images/receive-parcel-image.png`}
              />
            </Grid>
          </Grid>
        </div>
        <MobileScreensComponent bgImagePath="/assets/images/awesome-opportunities-bg.png">
          <MobileScreenComponent screen="/assets/images/receive-parcel-process-01.png" />
          <MobileScreenComponent screen="/assets/images/receive-parcel-process-02.png" />
          <MobileScreenComponent screen="/assets/images/receive-parcel-process-03.png" />
        </MobileScreensComponent>

        {/* <Guide>
        <GuideLine bgColor="#152972" order={2}>
          <Typography
            variant="h4"
            component="h4"
            color="inherit"
            style={{ color: '#fa7816', fontFamily: 'Exo2-Medium' }}
          >
            RECEIVE PARCEL GUIDELINE
          </Typography>
          <br />
          <Typography
            variant="body1"
            component="p"
            color="inherit"
            style={{
              fontFamily: 'Exo2-Medium',
              textAlign: 'left',
              lineHeight: '22px'
            }}
          >
            After signup, you can order “Receive Parcel” from PPost website or
            from PPost mobile app. This is a simple 3-step procedure. Step 1 is
            about receiver’s name, contact and location. Step 2 is about
            sender’s name, contact and location. Step 3 is about parcel info,
            for instance, parcel weight, size and quantity.
          </Typography>
        </GuideLine>
        <FAQs>
          <Typography variant="h4" component="h4" color="inherit">
            FAQs
          </Typography>
          <FAQ
            question="About PPOST"
            details="Nulla aute ullamco sunt ipsum nostrud reprehenderit id irure elit
            elit irure exercitation deserunt ea. Sit veniam esse eiusmod
            labore sit occaecat esse dolor excepteur enim."
          />
          <FAQ
            question="About PPOST2"
            details="Nulla quis sunt qui incididunt laborum non dolore adipisicing ea. Consectetur
            cupidatat est magna minim aliqua laboris excepteur duis pariatur."
          />
          <FAQ
            question="About PPOST3"
            details="Nulla quis sunt qui incididunt laborum non dolore adipisicing ea. Consectetur
            cupidatat est magna minim aliqua laboris excepteur duis pariatur."
          />
        </FAQs>
      </Guide> */}
        {/* ======================== */}

        <div
          style={{
            display: 'flex',
            marginBottom: '2rem',
            justifyContent: 'center'
          }}
        >
          <Grid
            container
            style={{ maxWidth: 1366 }}
            className="send-parcel-faqs"
          >
            <FAQHeading heading="FAQs - Help about Receive Parcel" />
            <Grid item xs={12} md={6}>
              <FAQComponent
                data={faqs.slice(0, ReceiveParcelColumnStart)}
                toggleFAQ={this.toggleFAQ}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FAQComponent
                data={faqs.slice(ReceiveParcelColumnStart)}
                toggleFAQ={this.toggleFAQ}
              />
            </Grid>
          </Grid>
        </div>
        {/* ======================== */}
        <ContactUs bgImagePath="footer-contactus-bg.png" />
        <Footer bgImagePath="/assets/images/footer-bg.png" />
      </React.Fragment>
    );
  }
}

ReceiveParcel.propTypes = {
  handleLoginModalOpen: PropTypes.func,
}

export default ReceiveParcel;
