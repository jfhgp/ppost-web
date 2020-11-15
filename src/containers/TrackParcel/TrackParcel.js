import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Footer from '../Footer';
import Header from '../Header';
import ContactUs from '../ContactUs';
import Feature from '../../components/Feature';
import SliderComponent from '../../components/SliderComponent';
import TrackParcelSearchBar from '../../components/TrackParcelSearchBar';
import { Grid } from '@material-ui/core';
import FAQHeading from '../../components/FAQHeading';
import FAQComponent from '../../components/FAQs';
import { FAQData } from '../DashboardHelpPageData';

class TrackParcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faqs: []
    };
  }

  componentDidMount() {
    let trackParcel = FAQData.filter(parcel => parcel.name === 'Track Parcel');
    this.setState({
      faqs: trackParcel[0].items
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
    const TrackParcelColumnStart = Math.floor(faqs.length / 2);
    return (
      <React.Fragment>
        <Header
          classes="track-parcel-header"
          showHeader={false}
          handleLoginModalOpen={this.props.handleLoginModalOpen}
        />
        <Feature>
          <SliderComponent sliderImage="track-parcel-header.png" />
        </Feature>
        <div className="receive-parcel-info">
          <Grid container>
            <Grid item xs={12} sm={6}>
              <div>
                <h1>TRACK PARCEL</h1>
                <div>
                  <p style={{ margin: 0 }}>
                    PPost parcel tracking system provides exhaustive details,
                    including exact geographical location, distance covered,
                    transporter’s name, transporter’s contact number, expected
                    delivery time, and virtual progress bar. Furthermore, you
                    can locate and directly contact the transporter carrying
                    your parcel.
                  </p>
                  <p style={{ margin: 0 }}>
                    PPost system generates unique eight–digits Parcel Order
                    number, after submission of every successful requests. Jus
                    enter valid Parcel Order number, and get real time tracking
                    on mobile or web. Moreover, registered users can also
                    contact driver (courier-man) who is delivering the parcel.
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
        <Grid container justify="center">
          <Grid
            item
            xs={12}
            sm={7}
            md={5}
            lg={4}
            xl={3}
            style={{ padding: '0 2rem' }}
          >
            <TrackParcelSearchBar />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid
            item
            xs={12}
            sm={7}
            md={5}
            lg={4}
            xl={3}
            style={{ padding: '2rem' }}
          >
            <img
              alt=""
              src="/assets/images/track-parcel-process.png"
              style={{ width: '100%' }}
            />
          </Grid>
        </Grid>
        {/* ======================== */}

        <Grid container>
          <FAQHeading heading="FAQs - Help about Track Parcel" />
          <Grid item xs={12} md={6}>
            <FAQComponent
              data={faqs.slice(0, TrackParcelColumnStart)}
              toggleFAQ={this.toggleFAQ}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FAQComponent
              data={faqs.slice(TrackParcelColumnStart)}
              toggleFAQ={this.toggleFAQ}
            />
          </Grid>
        </Grid>
        {/* ======================== */}
        <ContactUs bgImagePath="footer-contactus-bg.png" />
        <Footer bgImagePath="/assets/images/footer-bg.png" />
      </React.Fragment>
    );
  }
}

TrackParcel.propTypes = {
  handleLoginModalOpen: PropTypes.func
};

export default TrackParcel;
