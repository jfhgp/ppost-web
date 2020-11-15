/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import Page from '../../../components/layout/Page';
import routes from '../../../constants/route-constants';
import RequestCard from '../../requests/components/RequestCard';
import EmptyPlaceholder from '../../../components/ui/EmptyPlaceholder';
import FormSearchInput from '../../../components/form/FormSearchInput';
import ListLayoutComponent from '../../../components/ListLayoutComponent';
import FormNativeSelectInput from '../../../components/form/FormNativeSelectInput';
import FormNativeSelectInputField from '../../../components/form/FormNativeSelectInputField';
import ContainerLayout from '../../../components/layout/ContainerLayout';
import Paginate from '../../../components/Paginate';
import { Button } from '@material-ui/core';

import { ExportCSV } from '../../../components/ExportCSVComponent';

const MyRequestsListComponent = props => {
  const {
    activity,
    status,
    mode,
    requests,
    onInputChange,
    fetched,
    handlePageClick,
    pageCount,
    categories
  } = props;
  const ipadWidth = useMediaQuery('(max-width:768px)');
  const mobileWidth = useMediaQuery('(max-width:420px)');
  const veryLargeWidth = useMediaQuery('(min-width:1600px)');

  return (
    <Page activity={activity} className="r-list-container" noActivity>
      <div className="page-title multiple-items">
        <span style={ipadWidth ? { width: '100%', paddingBottom: 10 } : {}}>
          {props.pageTitle}
        </span>
        <div
          style={
            mobileWidth
              ? { margin: '10px 0', flexDirection: 'column-reverse' }
              : {}
          }
        >
          {props.spaceSearch ? (
            <div
              style={
                mobileWidth
                  ? { marginTop: '1em', width: '100%' }
                  : { marginRight: '1em' }
              }
            >
              {/* <FormNativeSelectInput
                name="spaceStatus"
                value={props.spaceStatus}
                onChange={onInputChange}
                options={[
                  { value: 'all', label: 'all' },
                  { value: 'accepted', label: 'Accepted' },
                  { value: 'picked', label: 'Picked' },
                  { value: 'pending', label: 'Assigned' },
                  { value: 'completed', label: 'Delivered' },
                  { value: 'cancelled', label: 'Cancelled' }
                ]}
              /> */}
            </div>
          ) : !props.search ? (
            <div style={{ display: "flex" }}>
              <div
                style={
                  mobileWidth
                    ? { marginTop: '1em', width: '100%' }
                    : { marginRight: '1em' }
                }
              >
                <FormNativeSelectInput
                  name="status"
                  value={props.status}
                  onChange={onInputChange}
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'accepted', label: 'Accepted' },
                    { value: 'picked', label: 'Picked' },
                    { value: 'pending', label: 'Assigned' },
                    { value: 'completed', label: 'Delivered' },
                    { value: 'cancelled', label: 'Cancelled' }
                  ]}
                />

              </div>
              <div
                style={
                  mobileWidth
                    ? { marginTop: '1em', width: '100%' }
                    : { marginRight: '1em' }
                }
              >
                <FormNativeSelectInput
                  name="mode"
                  value={props.mode}
                  onChange={onInputChange}
                  options={[
                    { label: 'All', value: 'all' },
                    { label: 'Bike', value: 'bike' },
                    { label: 'Car', value: 'car' },
                    { label: 'Van', value: 'van' },
                    { label: 'Truck', value: 'truck' },
                    { label: 'Bus', value: 'bus' },
                    { label: 'Train', value: 'train' },
                    { label: 'Air', value: 'air' },
                    { label: 'Sea', value: 'sea' }
                  ]}
                />
              </div>
              <div
                style={
                  mobileWidth
                    ? { marginTop: '1em', width: '100%' }
                    : { marginRight: '1em' }
                }
              >
                <FormNativeSelectInput
                  name="itemType"
                  value={props.itemType}
                  onChange={onInputChange}
                  options={categories}
                />
              </div>
            </div>
          ) : null}
          <div
            style={
              mobileWidth
                ? { marginTop: '1em', width: '100%' }
                : { marginRight: '1em' }
            }
          >
            <FormSearchInput
              name="search"
              value={props.search}
              placeholder={props.searchPlaceholder}
              onChange={onInputChange}
              right={
                <img
                  alt=""
                  src={require('../../../static/icons/icon-search.png')}
                />
              }
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
                onInputChange({ target: { name: 'layout', value: 'grid' } })
              }
            />
            <img
              alt="Switch to list view."
              src={require('../../../static/icons/icon-list.png')}
              onClick={() =>
                onInputChange({ target: { name: 'layout', value: 'list' } })
              }
            />
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'right', margin: '1rem 2rem' }}>
        {!activity ? (
          <div>
            <ExportCSV
              csvData={props.detailsExcelData}
              fileName={props.fileName}
              disabled={activity}
            />
            <Button
              disabled={activity}
              onClick={() => props.history.push(
                `/${routes.typeTransporter}/${routes.schedulePickup}`
              )}
              style={{ background: '#fa7816', color: 'white', margin: '5px 5px' }}
            >
              Pickup Schedule
              </Button>
            <Button
              disabled={activity}
              onClick={() => props.history.push(
                `/${routes.typeTransporter}/${routes.mapView}`
              )}
              style={{ background: '#fa7816', color: 'white', margin: '5px 5px' }}
            >
              Map View
              </Button>
          </div>
        ) : null}
      </div>

      <ContainerLayout>
        {props.layout === 'grid' ? (
          fetched ? (
            requests[status].length ? (
              requests[status].map(request => {
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
                    <RequestCard
                      request={request}
                      user={props.user}
                      spaceSearch={props.spaceSearch}
                    />
                  </div>
                );
              })
            ) : (
                <div className="p-col-12">
                  <EmptyPlaceholder message="We could not find any requests." />
                </div>
              )
          ) : null
        ) : null}
        {props.layout === 'list' ? (
          <div style={{ padding: '1rem', width: '100%', overflowX: 'auto' }}>
            <ListLayoutComponent
              user={props.user}
              sortBy={props.sortBy}
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
      {
        fetched && requests[status].length && pageCount > 1 ? (
          <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
        ) : null
      }
    </Page >
  );
};

MyRequestsListComponent.defaultProps = {
  pageTitle: 'My Requests',
  searchPlaceholder: 'Search Your Requests'
};

MyRequestsListComponent.propTypes = {
  user: PropTypes.shape(),
  fetched: PropTypes.bool,
  activity: PropTypes.bool,
  sortBy: PropTypes.string,
  status: PropTypes.string,
  search: PropTypes.string,
  layout: PropTypes.string,
  history: PropTypes.shape(),
  userType: PropTypes.string,
  handleSort: PropTypes.func,
  pageTitle: PropTypes.string,
  onInputChange: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  headings: PropTypes.arrayOf(PropTypes.object),
  shouldListLayoutComponentUpdate: PropTypes.bool,
  sortedRequests: PropTypes.arrayOf(PropTypes.shape({})),
  requests: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({}))),
  handlePageClick: PropTypes.func,
  pageCount: PropTypes.number,
  detailsExcelData: PropTypes.arrayOf(PropTypes.shape({})),
  fileName: PropTypes.string
};

export default MyRequestsListComponent;
