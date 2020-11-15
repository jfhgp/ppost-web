import React from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@material-ui/core';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import Page from '../../../components/layout/Page';
import routes from '../../../constants/route-constants';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';
import EmptyPlaceholder from '../../../components/ui/EmptyPlaceholder';
import FormSearchInput from '../../../components/form/FormSearchInput';
import ListLayoutComponent from '../../../components/ListLayoutComponent';
import FormNativeSelectInput from '../../../components/form/FormNativeSelectInput';
import MyDriversAddContainer from '../add/MyDriversAddContainer';
import GoogleMapsComponent from '../../../components/map/GoogleMapsComponent';
import DriverCard from '../components/DriverCard';
import ContainerLayout from '../../../components/layout/ContainerLayout';

const MyDriversListComponent = props => {
  const { activity, filteredDrivers, myDrivers, history } = props;
  const ipadWidth = useMediaQuery('(max-width:768px)');
  const mobileWidth = useMediaQuery('(max-width:420px)');
  const veryLargeWidth = useMediaQuery('(min-width:1400px)');

  return (
    <Page activity={activity} className="m-d-list-page" noActivity>
      <div className="page-title multiple-items">
        <span style={ipadWidth ? { width: '100%', paddingBottom: 10 } : {}}>
          My Drivers
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
            <FormSubmitBtn
              label="Add Driver"
              onSubmit={() => props.handleDialogVisibility(true)}
              disabled={props.activity}
            />
          </div>
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
              onChange={props.handleActiveFilter}
              options={[
                { value: 'all', label: 'All' },
                { value: 'true', label: 'Active' },
                { value: 'false', label: 'Inactive' }
              ]}
            />
          </div>
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
              placeholder="Search your drivers"
              // onChange={onInputChange}
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
                props.handleChange({
                  target: { name: 'layout', value: 'grid' }
                })
              }
            />
            <img
              alt="Switch to list view."
              src={require('../../../static/icons/icon-list.png')}
              onClick={() =>
                props.handleChange({
                  target: { name: 'layout', value: 'list' }
                })
              }
            />
          </div>
        </div>
      </div>
      <ContainerLayout>
        <div
          className="p-col-12"
          style={mobileWidth ? { padding: '0.5rem' } : { padding: '1rem' }}
        >
          <div style={{ border: '5px solid #d7d7d7' }}>
            <GoogleMapsComponent
              coordinates={props.locations}
              containerElement={
                <div style={mobileWidth ? { height: 220 } : { height: 350 }} />
              }
              mapElement={<div style={{ height: '100%' }} />}
              ref={props.handleGoogleMapsComponentRef}
            />
          </div>
        </div>
        {props.fetched ? (
          <React.Fragment>
            {props.layout === 'grid' ? (
              filteredDrivers.length ? (
                filteredDrivers.map(driver => {
                  return (
                    <div
                      key={driver._id}
                      className="p-col-12 p-md-6 p-lg-4 p-xl-4"
                      style={
                        veryLargeWidth
                          ? { padding: '1rem', width: `${100 / 4}%` }
                          : mobileWidth
                          ? { padding: '0.5rem' }
                          : { padding: '1rem' }
                      }
                    >
                      <DriverCard driver={driver} />
                    </div>
                  );
                })
              ) : (
                <div className="p-col-12">
                  <EmptyPlaceholder message="We could not find any drivers." />
                </div>
              )
            ) : null}
            {props.layout === 'list' ? (
              <div
                className="p-col-12"
                style={{ width: '100%', overflowX: 'auto' }}
              >
                <ListLayoutComponent
                  history={history}
                  user={props.user}
                  options={props.options}
                  goTo={routes.myDrivers}
                  values={filteredDrivers}
                  headings={props.headings}
                  shouldListLayoutComponentUpdate={
                    props.shouldListLayoutComponentUpdate
                  }
                  emptyDataMessage="We could not find any drivers."
                />
              </div>
            ) : null}
          </React.Fragment>
        ) : null}
      </ContainerLayout>
      <Dialog
        maxWidth="md"
        open={props.isDialogVisible}
        onClose={props.handleDialogVisibility}
      >
        <MyDriversAddContainer
          myDrivers={myDrivers}
          handleSetMyDrivers={props.handleSetMyDrivers}
        />
      </Dialog>
    </Page>
  );
};

MyDriversListComponent.propTypes = {
  history: PropTypes.shape(),
  user: PropTypes.shape(),
  fetched: PropTypes.bool,
  activity: PropTypes.bool,
  layout: PropTypes.string,
  status: PropTypes.string,
  search: PropTypes.string,
  handleChange: PropTypes.func,
  isDialogVisible: PropTypes.bool,
  handleActiveFilter: PropTypes.func,
  handleSetMyDrivers: PropTypes.func,
  handleDialogVisibility: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  handleGoogleMapsComponentRef: PropTypes.func,
  headings: PropTypes.arrayOf(PropTypes.object),
  locations: PropTypes.arrayOf(PropTypes.object),
  myDrivers: PropTypes.arrayOf(PropTypes.shape()),
  shouldListLayoutComponentUpdate: PropTypes.bool,
  filteredDrivers: PropTypes.arrayOf(PropTypes.shape())
};

export default MyDriversListComponent;
