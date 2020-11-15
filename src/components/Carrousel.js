// import React from 'react';
// import PropTypes from 'prop-types';
// import Slider from 'react-slick';

// const Carrousel = props => {
//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true
//   };

//   return (
//     <div
//       className="carrousel_wrapper"
//       style={{
//         height: `${window.innerHeight - 100}px`,
//         overflow: 'hidden'
//       }}
//     >
//       <Slider {...settings}>{props.children}</Slider>
//     </div>
//   );
// };

// Carrousel.propTypes = {};

// export default Carrousel;

import React from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

import './slider-animations.css';
import '../layout/layout.css';

const content = [
  {
    title: 'PPost',
    description: 'an affordable and trusted courier service',
    android: 'Android',
    iOS: 'iOS',
    image: require('../static/images/slider-images/Slider-01.png')
  },
  {
    title: 'Send Parcel',
    description:
      'find an unbelievable low rate, send or receive parcel at your scheduled time',
    android: 'Android',
    iOS: 'iOS',
    image: require('../static/images/slider-images/Slider-02.png')
  },
  {
    title: 'Track Parcel',
    description:
      'trace and track parcel with real time status, and keep in touch with transporter',
    android: 'Android',
    iOS: 'iOS',
    image: require('../static/images/slider-images/Slider-03.png')
  },
  {
    title: 'Career Opportunities',
    description:
      'your career opportunities in courier business, come and join PPost as transporter',
    android: 'Android',
    iOS: 'iOS',
    image: require('../static/images/slider-images/Slider-04.png')
  }
];
const settings = {
  autoplay: 3000,
  duration: 3000
};

const Carrousel = () => (
  <div>
    <Slider className="slider-wrapper" {...settings}>
      {content.map((item, index) => (
        <div
          key={index}
          className="slider-content"
          style={{
            background: `url('${item.image}') no-repeat`
          }}
        >
          <div className="inner">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            {item.iOS && (
              <button className="btn btn-google" href="#" title="Google Play">
                Google Play
              </button>
            )}
            {item.android && (
              <button className="btn btn-apple" href="#" title="App Store">
                App Store
              </button>
            )}
          </div>
        </div>
      ))}
    </Slider>
  </div>
);
export default Carrousel;
