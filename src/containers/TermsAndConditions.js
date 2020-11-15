import React, { Component } from 'react';
import Page from '../components/layout/Page';
import { termsAndConditionsPoints } from './DashboardHelpPageData';
import PropTypes from 'prop-types';
import routes from '../constants/route-constants';
import FormSearchInput from '../components/form/FormSearchInput';
import Highlighter from "react-highlight-words";
import {
  callAfterDebounceTime,
  getSortingFunction,
  getNestedValue,
  isEmpty
} from '../utils/functions';

class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };

    this.callAfterDebounceTime = callAfterDebounceTime();

  }



  handleOnInputChange = e => {
    const { name, value, id } = e.target;
    this.setState({
      [name]: value,
      pageCount: 1,
      pageNumber: 1,
      per_page_limit: 50
    });
    if (name === 'search') {
      this.callAfterDebounceTime(() => this.handleSearch(value), {
        clear: !value
      });

      if (!value) {
        this.getRequests(this.state.status);
      }
    }
    if (name === 'status') {
      // this.props.history.push(
      //   `/${routes.typeTransporter}/${routes.myRequests}/${value}`
      // );
      this.getRequests(value);
    }
    if (name === 'mode') {
      // this.props.history.push(
      //   `/${routes.typeTransporter}/${routes.myRequests}/${value}`
      // );
      this.filterRequests({ filterType: "transport", value });
    }
    if (name === 'spaceStatus') {
      this.props.history.push(
        `/${routes.typeTransporter}/${routes.space}/${this.props.match.params.spaceId}/${value}`
      );

      this.getRequests(value);
    }
  };




  renderSubItems = ({ items, showBullets }, termIndex) =>
    items.map((item, i) => {
      return (
        <React.Fragment key={i}>
          <div>
            {showBullets && <span>{`${termIndex}.${i + 1} `}</span>}
            <p>{item}</p>
          </div>
        </React.Fragment>
      );
    });

  renderTermsAndConditionsPoints = () =>
    termsAndConditionsPoints.map((terms, i) => {
      return (
        <React.Fragment key={i}>
          {i !== 0 ? (
            <h1>
              <span>{i}.</span>
              {terms.name}
            </h1>
          ) : (
              <h1>{terms.name}</h1>
            )}

          {terms.items && this.renderSubItems(terms, i)}
        </React.Fragment>
      );
    });

  render() {
    console.log("this terms and conditions", termsAndConditionsPoints)
    const { addStyle } = this.props;
    return (
      <Page>
        <div className="page-title" style={addStyle && addStyle.pageTitle}>
          <span style={{ width: '100%', paddingBottom: 10 }}>
            Terms and Conditions
          </span>
        </div>
        {/* <div
        // style={
        //   mobileWidth
        //     ? { marginTop: '1em', width: '100%' }
        //     : { marginRight: '1em' }
        // }
        >
          <FormSearchInput
            name="search"
            value={this.state.search}
            placeholder={this.props.searchPlaceholder}
            onChange={this.handleOnInputChange}
            right={
              <img
                alt=""
                src={require('../static/icons/icon-search.png')}
              />
            }
          />
        </div> */}
        <div
          className={`dashboard-terms-conditions ${this.props.className}`}
          style={addStyle && addStyle.background}
        >
          {this.renderTermsAndConditionsPoints()}
        </div>
      </Page>
    );
  }
}

TermsAndConditions.defaultProps = {
  className: '',
  searchPlaceholder: 'Search Your Requests'
};

TermsAndConditions.propTypes = {
  addStyle: PropTypes.object,
  className: PropTypes.string
};

export default TermsAndConditions;
