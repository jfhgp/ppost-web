import React, { Component } from 'react';
import Page from '../components/layout/Page';
import { privacyPolicyPoints } from './DashboardHelpPageData';
import moment from 'moment';

import PropTypes from 'prop-types';

class PrivacyAndPolicy extends Component {
  renderSubItems = ({ items, showBullets }, termIndex) =>
    items.map((item, i) => {
      return (
        <React.Fragment key={i}>
          <p>
            {showBullets && <span>{`${termIndex + 1}.${i + 1} `}</span>}
            {item}
          </p>
        </React.Fragment>
      );
    });

  renderPrivacyPolicy = () =>
    privacyPolicyPoints.map((terms, i) => {
      return (
        <React.Fragment key={i}>
          {i !== 0 && i !== 1 ? (
            <h1>{`${i}. ${terms.name}`}</h1>
          ) : (
            <h1>{terms.name}</h1>
          )}

          {terms.items && this.renderSubItems(terms, i)}
        </React.Fragment>
      );
    });
  render() {
    const { addStyle } = this.props;
    return (
      <Page>
        <div className="page-title" style={addStyle && addStyle.pageTitle}>
          <span style={{ width: '100%', paddingBottom: 10 }}>
            Privacy Policy
          </span>
        </div>
        <div
          className={`dashboard-privacy-policy ${this.props.className}`}
          style={addStyle && addStyle.background}
        >
          <p>Last update: {moment(new Date()).format('MMMM Do, YYYY')}</p>
          {this.renderPrivacyPolicy()}
        </div>
      </Page>
    );
  }
}

PrivacyAndPolicy.defaultProps = {
  className: ''
};

PrivacyAndPolicy.propTypes = {
  addStyle: PropTypes.object,
  className: PropTypes.string
};

export default PrivacyAndPolicy;
