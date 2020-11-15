import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Lightbox from 'react-images';

import { withStore } from '../utils/store.util';

class ImageLightBoxComponent extends Component {
  static propTypes = {
    store: PropTypes.shape({
      get: PropTypes.func,
      setMultiWithRender: PropTypes.func
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      lightBoxIsOpen: false,
      images: [],
      currentImage: 0
    };
  }

  static getDerivedStateFromProps(props) {
    if (!props.store.lightBoxIsOpen) {
      return { currentImage: 0 };
    }
    return {};
  }

  handleCloseLightBox = () => {
    this.props.store.setMultiWithRender({
      lightBoxIsOpen: false,
      lightBoxImages: []
    });
  };

  handleNext = () => {
    this.setState(prevState => ({ currentImage: prevState.currentImage + 1 }));
  };

  handlePrevious = () => {
    this.setState(prevState => ({ currentImage: prevState.currentImage - 1 }));
  };

  render() {
    const { store } = this.props;

    return (
      <Lightbox
        images={store.get('lightBoxImages') || []}
        isOpen={store.get('lightBoxIsOpen')}
        currentImage={this.state.currentImage}
        onClickPrev={this.handlePrevious}
        onClickNext={this.handleNext}
        onClose={this.handleCloseLightBox}
      />
    );
  }
}

export default withStore(ImageLightBoxComponent);
