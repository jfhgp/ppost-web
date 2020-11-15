import React, { Component } from 'react';

import ApiCalls from '../../service/RequestHandler';
import PromotionsComponent from './PromotionsComponent';
import TranporterPromotionsComponent from './TransporterPromotionsComponent';
import * as authUtil from '../../utils/auth.util';

export default class PromotionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,
      promotions: [],
      userType: ''
    };
  }

  async componentDidMount() {
    const user = await authUtil.getUser();
    this.setState({ userType: user.userType });
    this.getUserPromotions();
  }

  async getUserPromotions() {
    const role = this.state.userType;
    try {
      const response = await ApiCalls.getPromotions(role);
      this.setState({ activity: false, promotions: response.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  renderComponent = () => {
    if (this.state.userType === 'transporter') {
      return (
        <TranporterPromotionsComponent
          {...this.state}
          handlePromotionClick={this.handlePromotionClick}
          handleCopyToClipboard={this.handleCopyToClipboard}
          handlePromotionCodeRef={this.handlePromotionCodeRef}
        />
      );
    } else {
      return (
        <PromotionsComponent
          {...this.state}
          handlePromotionClick={this.handlePromotionClick}
          handleCopyToClipboard={this.handleCopyToClipboard}
          handlePromotionCodeRef={this.handlePromotionCodeRef}
        />
      );
    }
  };

  handleCopyToClipboard = _id => {
    const textArea = document.getElementById(_id);
    try {
      textArea.select();
      document.execCommand('copy');
    } catch (error) {
      //
    }
  };

  handlePromotionClick = async () => {};

  handlePromotionCodeRef = ref => (this.promotionCodeRef = ref);

  render() {
    return this.renderComponent();
  }
}
