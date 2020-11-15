import React from 'react';
import PropTypes from 'prop-types';

import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';

import Page from '../../../components/layout/Page';
// import FormExpansionPanel from '../../../components/form/FormExpansionPanel';
import GoogleMapsComponent from '../../../components/map/GoogleMapsComponent';
// import PlacesAutocompleteComponent from '../../orders/components/PlacesAutocompleteComponent';

const ServiceAreasEditComponent = props => {
  const { activity } = props;
  // handleChange

  return (
    <Page activity={activity}>
      <DialogTitle style={{ padding: '1rem' }}>{props.name}</DialogTitle>
      <DialogContent>
        <div className="p-grid" style={{ margin: 0 }}>
          {/* <div className="p-col-12">
            <FormExpansionPanel
              defaultExpanded
              label="Search location"
              content={
                <PlacesAutocompleteComponent
                  onInputChange={handleChange}
                  name="mapCenter"
                />
              }
            />
          </div> */}
          <div className="p-col-12">
            <GoogleMapsComponent
              drawCircle
              markerType="single"
              coordinates={props.coordinates}
              // handleMapClick={props.handleMapClick}
              ref={props.handleGoogleMapsComponentRef}
              mapElement={<div style={{ height: '100%' }} />}
              containerElement={<div style={{ height: 300 }} />}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleGoBack} disabled={activity}>
          Back
        </Button>
        {/* <Button
          color="primary"
          variant="contained"
          disabled={props.coordinates.length < 1 || activity}
          onClick={props.handleEditServiceArea}
          style={{ marginLeft: '1rem' }}
        >
          SAVE
        </Button> */}
      </DialogActions>
    </Page>
  );
};

ServiceAreasEditComponent.propTypes = {
  name: PropTypes.string,
  activity: PropTypes.bool,
  handleChange: PropTypes.func,
  handleGoBack: PropTypes.func,
  handleMapClick: PropTypes.func,
  handleEditServiceArea: PropTypes.func,
  handleGoogleMapsComponentRef: PropTypes.func,
  coordinates: PropTypes.arrayOf(PropTypes.number)
};

export default ServiceAreasEditComponent;
