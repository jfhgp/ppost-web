import React, { Component } from 'react';
import routes from '../constants/route-constants';
// import PropTypes from 'prop-types';

class TrackParcelSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      activity: false,

      orderNumber: ''
    };
  }

  handleChange = e => {
    this.setState({
      error: false,
      orderNumber: e.target.value.replace(/[^\dA-Z]/g, '').trim()
    });
  };

  handleRouteTo = () => {
    // const orderNumber = this.state.orderNumber.replace(
    //   new RegExp(/ /, 'g'),
    //   ''
    // );
    const orderNumber = this.state.orderNumber;
    if (orderNumber.length === 16) {
      const a = document.createElement('a');
      a.href = `${window.location.origin}/#/${routes.requests}/${routes.staticDetails}/${orderNumber}`;
      a.target = '_blank';
      a.click();
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div className="track-parcel-search-bar">
        <div>
          <input
            style={{
              borderBottom: this.state.error ? '1px solid red' : 'unset'
            }}
            maxLength={16}
            id="trackParcel"
            autoComplete="off"
            placeholder="PARCEL NUMBER"
            onChange={this.handleChange}
            value={this.state.orderNumber}
          />
          <button disabled={this.state.activity} onClick={this.handleRouteTo}>
            TRACK
          </button>
        </div>
      </div>
    );
  }
}

TrackParcelSearchBar.propTypes = {};

export default TrackParcelSearchBar;
