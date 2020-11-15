import React from 'react';
import PropTypes from 'prop-types';

const SliderComponent = props => {
  return (
    <div className="slider-component">
      <div></div>
      <div
        className="carrousel_image"
        style={{
          backgroundImage: `url(${require(`../static/images/slider-images/${props.sliderImage}`)})`
        }}
      />
    </div>
  );
};

SliderComponent.propTypes = {
  sliderImage: PropTypes.string
};

export default SliderComponent;
