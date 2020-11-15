import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import Page from '../../../components/layout/Page';
import routes from '../../../constants/route-constants';
import RequestCard from '../../requests/components/RequestCard';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';
import EmptyPlaceholder from '../../../components/ui/EmptyPlaceholder';
import FormSearchInput from '../../../components/form/FormSearchInput';
import ListLayoutComponent from '../../../components/ListLayoutComponent';
import FormNativeSelectInput from '../../../components/form/FormNativeSelectInput';
import ContainerLayout from '../../../components/layout/ContainerLayout';
import { ExportCSV } from '../../../components/ExportCSVComponent';

const OrdersListComponent = props => {
  const { activity, status, requests, onInputChange } = props;
  const fetched = !!requests[status];
  const ipadWidth = useMediaQuery('(max-width:768px)');
  const mobileWidth = useMediaQuery('(max-width:420px)');
  const veryLargeWidth = useMediaQuery('(min-width:1400px)');

  return (
    <Page activity={activity} className="r-list-container" noActivity>
      <div className="page-title multiple-items">
        <span style={ipadWidth ? { width: '100%', paddingBottom: 10 } : {}}>
          My Requests
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
                ? { marginTop: '1rem', textAlign: 'right', width: '100%' }
                : { marginRight: '1.5rem' }
            }
          >
            <Link
              to={`/${routes.typeUser}/${routes.orders}/${routes.addOrder}`}
            >
              <FormSubmitBtn
                label="Add Request"
                // onSubmit={props.onSubmit}
                disabled={props.activity}
              />
            </Link>
          </div>
          {!props.search ? (
            <div
              style={
                mobileWidth
                  ? { marginTop: '1rem', width: '100%' }
                  : { marginRight: '1.5rem' }
              }
            >
              <FormNativeSelectInput
                name="status"
                value={props.status}
                onChange={onInputChange}
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'accepted', label: 'Accepted' },
                  { value: 'picked', label: 'Picked' },
                  { value: 'completed', label: 'Delivered' },
                  { value: 'cancelled', label: 'Cancelled' }
                ]}
              />
            </div>
          ) : null}
          <div
            style={
              mobileWidth
                ? { marginTop: '1rem', width: '100%' }
                : { marginRight: '1.5rem' }
            }
          >
            <FormSearchInput
              name="search"
              value={props.search}
              placeholder="Search your requests"
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
              style={{ marginRight: '1rem' }}
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
          <ExportCSV
            csvData={props.detailsExcelData}
            fileName={props.fileName}
            disabled={activity}
          />
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
                    className="p-col-12 p-md-6 p-lg-6 p-xl-4"
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
                      goTo={routes.orders}
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
              goTo={`${routes.orders}/${routes.orderDetail}`}
            />
          </div>
        ) : null}
      </ContainerLayout>
    </Page>
  );
};

OrdersListComponent.propTypes = {
  user: PropTypes.shape(),
  sortBy: PropTypes.string,
  activity: PropTypes.bool,
  status: PropTypes.string,
  search: PropTypes.string,
  layout: PropTypes.string,
  userType: PropTypes.string,
  handleSort: PropTypes.func,
  onInputChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  headings: PropTypes.arrayOf(PropTypes.object),
  shouldListLayoutComponentUpdate: PropTypes.bool,
  sortedRequests: PropTypes.arrayOf(PropTypes.shape({})),
  requests: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({})))
};

export default OrdersListComponent;
