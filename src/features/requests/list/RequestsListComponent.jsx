import React from 'react';
import PropTypes from 'prop-types';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import Page from '../../../components/layout/Page';
import routes from '../../../constants/route-constants';
import RequestCard from '../../requests/components/RequestCard';
import EmptyPlaceholder from '../../../components/ui/EmptyPlaceholder';
import FormSearchInput from '../../../components/form/FormSearchInput';
import ListLayoutComponent from '../../../components/ListLayoutComponent';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';
import ContainerLayout from '../../../components/layout/ContainerLayout';
import Paginate from '../../../components/Paginate';
import { ExportCSV } from '../../../components/ExportCSVComponent';

const RequestsListComponent = props => {
  const {
    activity,
    fetched,
    requests,
    handleInputChange,
    handlePageClick,
    pageCount
  } = props;
  const ipadWidth = useMediaQuery('(max-width:768px)');
  const mobileWidth = useMediaQuery('(max-width:420px)');
  const veryLargeWidth = useMediaQuery('(min-width:1400px)');

  return (
    <Page activity={activity} className="r-list-container" noActivity>
      <div className="page-title multiple-items">
        <span style={ipadWidth ? { width: '100%', paddingBottom: 10 } : {}}>
          Find a Request
        </span>
        <div
          style={
            mobileWidth
              ? { margin: '10px 0', flexDirection: 'column-reverse' }
              : {}
          }
        >
          <div
            style={
              mobileWidth
                ? { marginTop: '1em', padding: '3px 0', width: '100%' }
                : { marginRight: '1em', padding: '3px 0' }
            }
          >
            <FormSearchInput
              name="pickup"
              value={props.pickup}
              placeholder="Search by pickup"
              onChange={handleInputChange}
              right={
                <img
                  alt=""
                  src={require('../../../static/icons/icon-search.png')}
                />
              }
            />
          </div>
          <div
            style={
              mobileWidth
                ? { marginTop: '1em', padding: '3px 0', width: '100%' }
                : { marginRight: '1em', padding: '3px 0' }
            }
          >
            <FormSearchInput
              name="dropoff"
              value={props.dropoff}
              placeholder="Search by dropoff"
              onChange={handleInputChange}
              right={
                <img
                  alt=""
                  src={require('../../../static/icons/icon-search.png')}
                />
              }
            />
          </div>
          <div
            style={
              mobileWidth
                ? { marginTop: '1em', padding: '3px 0', width: '100%' }
                : { marginRight: '1em', padding: '3px 0' }
            }
          >
            <FormSubmitBtn
              label="Search"
              disabled={activity}
              onSubmit={props.handleSearch}
              style={{ width: 'unset', borderRadius: 4 }}
            />
          </div>
          <div
            className="layout-btn-div"
            style={mobileWidth ? { width: '100%' } : {}}
          >
            <img
              alt="Switch to grid view."
              style={{ marginRight: '1em' }}
              src={require('../../../static/icons/icon-grid.png')}
              onClick={() =>
                handleInputChange({ target: { name: 'layout', value: 'grid' } })
              }
            />
            <img
              alt="Switch to list view."
              src={require('../../../static/icons/icon-list.png')}
              onClick={() =>
                handleInputChange({ target: { name: 'layout', value: 'list' } })
              }
            />
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'right', margin: '1rem 2rem' }}>
        {!activity ? (
          <ExportCSV
            csvData={props.detailsExcelData}
            fileName={props.fileName}
            disabled={activity}
          />
        ) : null}
      </div>
      <ContainerLayout>
        {props.layout === 'grid' ? (
          props.fetched ? (
            requests.length ? (
              requests.map(request => {
                return (
                  <div
                    key={request._id}
                    className="p-col-12 p-md-6 p-lg-4 p-xl-4"
                    style={
                      veryLargeWidth
                        ? { padding: '1rem', width: `${100 / 4}%` }
                        : mobileWidth
                        ? { padding: '0.5rem' }
                        : { padding: '1rem' }
                    }
                  >
                    <RequestCard request={request} user={props.user} />
                  </div>
                );
              })
            ) : (
              <div className="p-col-12">
                <EmptyPlaceholder message="We could not find any requests around your service areas and journeys." />
              </div>
            )
          ) : null
        ) : null}
        {props.layout === 'list' ? (
          <div style={{ padding: '1rem', width: '100%', overflowX: 'auto' }}>
            <ListLayoutComponent
              user={props.user}
              sortBy={props.sortBy}
              history={props.history}
              options={props.options}
              headings={props.headings}
              handleSort={props.handleSort}
              values={props.sortedRequests}
              shouldListLayoutComponentUpdate={
                props.shouldListLayoutComponentUpdate
              }
              goTo={`${routes.requests}/${routes.requestDetails}`}
            />
          </div>
        ) : null}
      </ContainerLayout>
      {fetched && requests.length && pageCount > 1 ? (
        <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
      ) : null}
    </Page>
  );
};

RequestsListComponent.propTypes = {
  history: PropTypes.shape(),
  user: PropTypes.shape(),
  fetched: PropTypes.bool,
  activity: PropTypes.bool,
  status: PropTypes.string,
  sortBy: PropTypes.string,
  pickup: PropTypes.string,
  layout: PropTypes.string,
  dropoff: PropTypes.string,
  userType: PropTypes.string,
  handleSort: PropTypes.func,
  handleSearch: PropTypes.func,
  handleInputChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  headings: PropTypes.arrayOf(PropTypes.object),
  shouldListLayoutComponentUpdate: PropTypes.bool,
  requests: PropTypes.arrayOf(PropTypes.shape({})),
  sortedRequests: PropTypes.arrayOf(PropTypes.shape({})),
  handlePageClick: PropTypes.func,
  pageCount: PropTypes.number,
  detailsExcelData: PropTypes.arrayOf(PropTypes.shape({})),
  fileName: PropTypes.string
};

export default RequestsListComponent;
