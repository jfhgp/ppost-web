import React, { Component } from 'react';
import Page from '../components/layout/Page';
import {
  ProhibitedItemsList,
  RestrictedItemsList
} from './DashboardHelpPageData';
import PropTypes from 'prop-types';

class ProhibitedItems extends Component {
  render() {
    const ProhibitedSecondColumnStart = Math.floor(
      ProhibitedItemsList.length / 2
    );
    const RestrictedSecondColumnStart = Math.floor(
      RestrictedItemsList.length / 2
    );
    const { addStyle } = this.props;
    return (
      <Page>
        <div className="page-title" style={addStyle && addStyle.pageTitle}>
          <span style={{ width: '100%', paddingBottom: 10 }}>
            Prohibited Items
          </span>
        </div>
        <Page
          className={`dashboard-prohibited-items ${this.props.className}`}
          style={addStyle && addStyle.background}
        >
          <div className="prohibited-container">
            <div>
              <h1>List of Prohibited Items</h1>
              <p>
                In compliance of international, regional and national laws,
                rules, regulations and safety measures, PPost and its services
                will not accept and entertain following prohibited items for any
                sort of carriage. PPost faithfully follows the standards and
                regulations set by the concerned bodies of ‘European Union’
                (EU); ‘Agreement on Dangerous Goods by Road’ (ADR),
                ‘International Air Transport Association’ (IATA); and
                ‘International Maritime Dangerous Goods’ (IMDG). It is the
                responsibility of the shipper to check the presence of
                prohibited item in the parcel before packaging and confirming
                the order.
              </p>
            </div>

            <div className="p-grid">
              <div className="p-col-12 p-md-6" style={{ paddingLeft: 8 }}>
                {ProhibitedItemsList.slice(0, ProhibitedSecondColumnStart).map(
                  item => (
                    <div className="items" key={item}>
                      <i className="fa fa-ban img" aria-hidden="true"></i>
                      <p>{item}</p>
                    </div>
                  )
                )}
              </div>
              <div className="p-col-12 p-md-6">
                {ProhibitedItemsList.slice(ProhibitedSecondColumnStart).map(
                  item => (
                    <div className="items" key={item}>
                      <i className="fa fa-ban img" aria-hidden="true"></i>
                      <p>{item}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="restricted-container">
            <div>
              <h1>List of Restricted Items</h1>
              <span>(subject to conditions)</span>
              <p>
                There is a subtle difference between prohibited and restricted
                items. Restricted goods may be allowed to be shipped only within
                certain circumstances or under certain conditions. Their
                transportation generally requires special licenses or permits.
                Some restricted items may be allowed in limited quantities for
                personal use only. Whereas some restricted items are only
                allowed when they are packed as per safety standards and do not
                pose any risks or ecological hazards .
              </p>
            </div>
            <div className="p-grid">
              <div className="p-col-12 p-md-6" style={{ paddingLeft: 8 }}>
                {RestrictedItemsList.slice(0, RestrictedSecondColumnStart).map(
                  item => (
                    <div className="items" key={item}>
                      <i className="fa fa-ban img" aria-hidden="true"></i>
                      <p>{item}</p>
                    </div>
                  )
                )}
              </div>
              <div className="p-col-12 p-md-6">
                {RestrictedItemsList.slice(RestrictedSecondColumnStart).map(
                  item => (
                    <div className="items" key={item}>
                      <i className="fa fa-ban img" aria-hidden="true"></i>
                      <p>{item}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </Page>
      </Page>
    );
  }
}

ProhibitedItems.defaultProps = {
  className: ''
};

ProhibitedItems.propTypes = {
  addStyle: PropTypes.object,
  className: PropTypes.string
};

export default ProhibitedItems;
