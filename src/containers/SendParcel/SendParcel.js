import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import routes from '../../constants/route-constants';

import Footer from '../Footer';
import Header from '../Header';
import ContactUs from '../ContactUs';
import Feature from '../../components/Feature';
import SliderComponent from '../../components/SliderComponent';
import MobileScreenComponent from '../../components/MobileScreenComponent';
import MobileScreensComponent from '../../components/MobileScreensComponent';
import FAQComponent from '../../components/FAQs';
import { FAQData } from '../DashboardHelpPageData';
import FAQHeading from '../../components/FAQHeading';

class SendParcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faqs: []
    };
  }

  componentDidMount() {
    let sendParcel = FAQData.filter(parcel => parcel.name === 'Send Parcel');
    this.setState({
      faqs: sendParcel[0].items
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
    const SendParcelColumnStart = Math.floor(faqs.length / 2);
    return (
      <React.Fragment>
        <Header
          classes="track-parcel-header"
          showHeader={false}
          handleLoginModalOpen={this.props.handleLoginModalOpen}
        />
        <Feature>
          <SliderComponent sliderImage="send-parcel-header.png" />
        </Feature>

        {/* ======================== */}

        <Link to={`/${routes.typeUser}/${routes.orders}/${routes.addOrder}`}>
          <div className="send-parcel-info">
            <Grid container>
              <Grid item xs={12} sm={6}>
                <img
                  alt=""
                  src={`${process.env.PUBLIC_URL}/assets/images/send-parcel-image.png`}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div>
                  <h1>SEND PARCEL</h1>
                  <div>
                    <p style={{ margin: 0 }}>
                      You can deliver any kind of permissible item via PPost. Be
                      it office document or home accessory; gift-pack or books;
                      dress or travel bag; perishable food or fragile gadget;
                      heavy furniture or urgently required medicines; auto-parts
                      or important documents. We are ready to serve you. Just
                      give us sender, receiver and parcel details.
                    </p>
                    <p style={{ margin: 0 }}>
                      After signup, you can order “Send Parcel” from PPost
                      website, or from PPost mobile app. This is a simple 3-step
                      procedure. Step 1 is about sender’s name, contact and
                      location. Step 2 is about receiver’s name, contact and
                      location. Step 3 is about parcel info, for instance,
                      parcel weight, size and quantity.
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Link>
        <MobileScreensComponent bgImagePath="/assets/images/awesome-opportunities-bg.png">
          <MobileScreenComponent screen="/assets/images/send-parcel-process01.png" />
          <MobileScreenComponent screen="/assets/images/send-parcel-process02.png" />
          <MobileScreenComponent screen="/assets/images/send-parcel-process03.png" />
        </MobileScreensComponent>

        {/* ======================== */}
        {/* <Guide>
        <GuideLine bgColor="#fa7816" order={1}>
          <Typography
            variant="h4"
            component="h4"
            color="inherit"
            style={{
              color: colors.blue,
              fontSize: '2rem',
              fontWeight: 'bold'
            }}
          >
            SEND PARCEL GUIDELINE
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color="inherit"
            style={{ textAlign: 'left', padding: '2rem 5rem 0 5rem' }}
          >
            After signup, you can order “Send Parcel” from PPost website or from
            PPost mobile app. This is a simple 3-step procedure. Step 1 is about
            sender’s name, contact and location. Step 2 is about receiver’s
            name, contact and location. Step 3 is about parcel info, for
            instance, parcel weight, size and quantity.
          </Typography>
        </GuideLine>
        <FAQs order={2}>
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
            <FAQHeading heading="FAQs - Help about Send Parcel" />
            <Grid item xs={12} md={6}>
              <FAQComponent
                data={faqs.slice(0, SendParcelColumnStart)}
                toggleFAQ={this.toggleFAQ}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FAQComponent
                data={faqs.slice(SendParcelColumnStart)}
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

SendParcel.propTypes = {
  handleLoginModalOpen: PropTypes.func
};

export default SendParcel;
