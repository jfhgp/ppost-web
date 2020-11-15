import React, { Component } from 'react';

import PreviousTransportersComponent from './PreviousTransportersComponent';
import ApiCalls from '../../service/RequestHandler';

export default class PreviousTransportersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,
      prevTransporters: []
    };
  }

  componentDidMount() {
    this.getPreviousTransporters();
  }

  async getPreviousTransporters() {
    try {
      const response = await ApiCalls.prevTransportersList();
      this.setState({ activity: false, prevTransporters: response.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  render() {
    return <PreviousTransportersComponent {...this.state} />;
  }
}
