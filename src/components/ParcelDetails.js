import React from 'react';
import PropTypes from 'prop-types';

export const RightParcelDetails = ({
  children,
  headingColor = '#fa7816',
  imagePath,
  name
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        className="p-grid"
        style={{ margin: 0, padding: '2rem 0', maxWidth: 1366 }}
      >
        <div className="p-col-12 p-md-12 p-lg-6">
          <img
            className="right-parcel-image"
            alt=""
            src={`${process.env.PUBLIC_URL}${imagePath}`}
          />
        </div>
        <div
          className="p-col-12 p-md-12 p-lg-6 parcel-details"
          style={{
            padding: '2rem',
            backgroundColor: '#152972'
          }}
        >
          <h1
            style={{
              color: headingColor,
              textAlign: 'center',
              fontSize: '2rem',
              fontFamily: 'Exo2-Medium',
              fontWeight: 'bold'
            }}
          >
            {name}
          </h1>
          <div>
            <p
              style={{
                margin: 0,
                padding: '2rem 5rem 0 5rem',
                color: '#fff',
                fontFamily: 'Exo2-Medium'
              }}
            >
              {children}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LeftParcelDetails = ({
  children,
  headingColor = '#fa7816',
  imagePath,
  name
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        className="p-grid"
        style={{ margin: 0, padding: '2rem 0', maxWidth: 1366 }}
      >
        <div
          className="p-col-12 p-md-12 p-lg-6"
          style={{
            backgroundImage:
              'linear-gradient(to right,rgb(250, 120, 22),rgb(250, 178, 22))'
          }}
        >
          <h1
            style={{
              color: headingColor,
              textAlign: 'center',
              padding: '2rem',
              fontSize: '2rem',
              fontFamily: 'Exo2-Medium',
              fontWeight: 'bold'
            }}
          >
            {name}
          </h1>
          <p
            style={{
              padding: '0 5rem',
              color: '#fff',
              fontFamily: 'Exo2-Medium'
            }}
          >
            {children}
          </p>
        </div>
        <div className="p-col-12 p-md-12 p-lg-6">
          <img
            className="left-parcel-image"
            alt=""
            src={`${process.env.PUBLIC_URL}${imagePath}`}
          />
        </div>
      </div>
    </div>
  );
};

RightParcelDetails.propTypes = {
  children: PropTypes.string,
  backgroundColor: PropTypes.string,
  headingColor: PropTypes.string,
  imagePath: PropTypes.string,
  name: PropTypes.string
};

LeftParcelDetails.propTypes = {
  children: PropTypes.string,
  backgroundColor: PropTypes.string,
  headingColor: PropTypes.string,
  imagePath: PropTypes.string,
  name: PropTypes.string
};
