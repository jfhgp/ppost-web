import React from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@material-ui/core';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import Page from '../../../components/layout/Page';
import RequestInformationComponent from './RequestInformationComponent';
import GoogleMapsComponent from '../../../components/map/GoogleMapsComponent';
// import DriverCard from '../components/DriverCard';
import ContainerLayout from '../../../components/layout/ContainerLayout';

const MapViewComponent = props => {
  const { activity, filteredDrivers, myDrivers, history } = props;
  const ipadWidth = useMediaQuery('(max-width:768px)');
  const mobileWidth = useMediaQuery('(max-width:420px)');
  const veryLargeWidth = useMediaQuery('(min-width:1400px)');

  return (
    <Page activity={activity} className="m-d-list-page" noActivity>
      <div className="page-title multiple-items">
        <span style={ipadWidth ? { width: '100%', paddingBottom: 10 } : {}}>
          Route Management
        </span>
      </div>
      <ContainerLayout>
        <div
          className="p-col-12"
          style={mobileWidth ? { padding: '0.5rem' } : { padding: '1rem' }}
        >
          <div style={{ border: '5px solid #d7d7d7' }}>
            <GoogleMapsComponent
              showMarkers
              mapType="static"
              mapViewLocations={props.mapViewLocations}
              coordinates={props.locations}
              containerElement={
                <div style={mobileWidth ? { height: 220 } : { height: 350 }} />
              }
              mapElement={<div style={{ height: '100%' }} />}
              ref={props.handleGoogleMapsComponentRef}
              handleDialogVisibility={props.handleDialogVisibility}
            />
          </div>
        </div>
      </ContainerLayout>
      <Dialog
        maxWidth="md"
        open={props.isDialogVisible}
        onClose={props.handleDialogClose}
      >
        <RequestInformationComponent
          details={props.selectedRequest}
        />
      </Dialog>
    </Page>
  );
};

MapViewComponent.propTypes = {
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

export default MapViewComponent;
