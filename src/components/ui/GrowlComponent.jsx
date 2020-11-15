import React, { Component } from 'react';

import { Growl } from 'primereact/growl';

const growlClosure = () => {
  let instance = null;
  return {
    setInstance: ref => {
      instance = ref;
    },
    showGrowl: (severity, summary, detail) =>
      instance.show({
        severity,
        summary,
        detail
      })
  };
};

export const newGrowl = growlClosure();

export default class GrowlComponent extends Component {
  handleRef = el => (this.growl = el);

  componentDidMount() {
    newGrowl.setInstance(this.growl);
  }

  render() {
    return <Growl ref={this.handleRef} className="app-growl" />;
  }
}
