import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import Header from '../Header';
import Footer from '../Footer';
import ContactUs from '../ContactUs';
import Feature from '../../components/Feature';
import { colors } from '../../constants/colors';
import SliderComponent from '../../components/SliderComponent';
// import { NonFuncFeatures, NonFuncFeaturesCard } from '../NonFuncFeatures';

const PPostSpace = props => {
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
      <div className="about-us-info send-parcel-info">
        <Grid container>
          <Grid item xs={12} sm={6} md={6}>
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/assets/images/send-parcel-image.png`}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div style={{ backgroundImage: colors.blueToRight }}>
              <h1>PPostSpace</h1>
              <div>
                <p style={{ marginTop: 10 }}>
                  A new addition in postal and courier services that aims to save the time of busy customers. It works as provisional store-house between origin and destination. PPost Space is similar to ‘parcel-shop’ where you can drop off your parcel without waiting for the transporter to pick your parcel from your home or office. The ‘Space’ services offered by PPost is not limited to dropping off parcel, you can also pick your parcel, that is sent to you by someone else.

  In addition, ‘PPost Space’ also functions as ‘small warehouse’ for transporters, shippers, importers and exporters. There are many ‘PPost Spaces’ (registered locations) in every big city and town of Europe. You can find nearest available ‘Space’ via PPost mobile application.
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <ContactUs bgImagePath="footer-contactus-bg.png" />
      <Footer bgImagePath="/assets/images/footer-bg.png" />
    </React.Fragment>
  );
};

PPostSpace.propTypes = {
  handleLoginModalOpen: PropTypes.func
};

export default PPostSpace;



// import React from 'react';
// import PropTypes from 'prop-types';

// import Header from '../Header';
// import Footer from '../Footer';
// import Feature from '../../components/Feature';
// import SliderComponent from '../../components/SliderComponent';
// import ContactUs from '../ContactUs';

// const PPostSpace = props => {
//   return (
//     <React.Fragment>
//       <Header
//         classes="ppost-space-header"
//         showHeader={false}
//         handleLoginModalOpen={props.handleLoginModalOpen}
//       />
//       <Feature>
//         <SliderComponent sliderImage="about-header.png" />
//       </Feature>
//       <div
//         className="page-title"
//         style={{
//           textAlign: 'center',
//           ...(props.addStyle && props.addStyle.pageTitle)
//         }}
//       >
//         <span style={{ width: '100%', paddingBottom: 10 }}>PPost Space</span>
//       </div>

//       <ContactUs bgImagePath="footer-contactus-bg.png" />
//       <Footer bgImagePath="/assets/images/footer-bg.png" />
//     </React.Fragment>
//   );
// };

// PPostSpace.propTypes = {
//   handleLoginModalOpen: PropTypes.func
// };

// export default PPostSpace;
