import { Typography } from '@material-ui/core';
import React from 'react';
import { colors } from '../constants/colors';

require('../layout/layout.css');

const MobileAppComponent = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#ebebeb'
      }}
    >
      <div className="mobileRoot">
        <h1 className="_heading">
          <span style={{ color: colors.blue }}>PPOST</span>&nbsp;&nbsp;
          <span style={{ color: colors.orange }}>MOBILE APP</span>
        </h1>
        <p style={{ fontSize: 18 }}>
          an affordable and trusted courier service
        </p>
        <hr
          style={{
            width: 100,
            height: 5,
            backgroundColor: colors.orange,
            border: 'none',
            outline: 'none'
          }}
        />

        <div className="flexContainer">
          <div className="flexContainerDiv">
            <div
              className="leftSide"
              style={{
                padding: '10px 0px',
                textAlign: 'end'
              }}
            >
              <React.Fragment>
                <div>
                  <Typography variant="h4">Free App</Typography>
                  <Typography variant="body1">
                    PPost mobile application is completely free to download and
                    use for unlimited period. There is no direct or indirect
                    charges in the name of subscription or in-app purchase. Just
                    download PPost now, and signup for free.
                  </Typography>
                </div>
                <div>
                  <Typography variant="h4">Fully Featured</Typography>
                  <Typography variant="body1">
                    PPost mobile application provides rich variety of features
                    (language, currency, units of size, weight, and distance).
                    You can easily customize it, according you ease and needs.
                    PPost application also provides real time tracking, and
                    instance notifications.
                  </Typography>
                </div>
                <div>
                  <Typography variant="h4">Secured and Integrated</Typography>
                  <Typography variant="body1">
                    PPost mobile application provides rich variety of features
                    (language, currency, units of size, weight, and distance).
                    You can easily customize it, according you ease and needs.
                    PPost application also provides real time tracking, and
                    instance notifications.
                  </Typography>
                </div>
              </React.Fragment>
            </div>
          </div>

          <div className="flexContainerDiv">
            <img
              alt=""
              style={{ height: 500, minHeight: 300 }}
              src={`${process.env.PUBLIC_URL}/assets/images/PPost-App-img.png`}
            />
          </div>

          <div className="flexContainerDiv">
            <div
              className="rightSide"
              style={{
                padding: '10px 0px',
                textAlign: 'start'
              }}
            >
              <React.Fragment>
                <div>
                  <Typography variant="h4">User Friendly</Typography>
                  <Typography variant="body1">
                    Sending and Receiving Parcel via PPost is as easy as step
                    one-two-three. You only need to enter sender, receiver and
                    parcel information. The interface is highly initiative and
                    user-friendly. There is detailed help for every section.
                  </Typography>
                </div>
                <div>
                  <Typography variant="h4">Offers Best Price</Typography>
                  <Typography variant="body1">
                    PPost mobile application offers cheapest rate comparing any
                    other online courier service. You can get free quotation,
                    for any two locations. There are variety of options too. For
                    getting rates, you can customize (Standard-Urgent-Economy)
                    delivery type, weight, and size of parcel.
                  </Typography>
                </div>
                <div>
                  <Typography variant="h4">Enjoy Discount</Typography>
                  <Typography variant="body1">
                    PPost mobile application offers various seasonal and special
                    discounts. The coupon system is also available for the
                    customers. Download the PPost now, from your favourite app
                    store, and enjoy the discount offer.
                  </Typography>
                </div>
              </React.Fragment>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppComponent;
