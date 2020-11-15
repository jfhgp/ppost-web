import React from 'react';
import PropTypes from 'prop-types';

import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@material-ui/core';

import Page from '../../../components/layout/Page';
import FormExpansionPanel from '../../../components/form/FormExpansionPanel';
import PlacesAutocompleteComponent from '../../orders/components/PlacesAutocompleteComponent';
import GoogleMapsComponent from '../../../components/map/GoogleMapsComponent';

const ServiceAreasDrawComponent = props => {
  const { activity, handleChange } = props;

  return (
    <Page activity={activity}>
      <DialogTitle style={{ padding: '1rem' }}>Draw Service Area</DialogTitle>
      <DialogContent>
        <div className="p-grid" style={{ margin: 0 }}>
          <div className="p-col-12">
            <Typography variant="body1">Search for a specific area.</Typography>
            <Typography variant="body1">
              Click anywhere on the map to create a point.
            </Typography>
            <Typography variant="body1">
              Click the draw button when {"you've"} added at least 3 points.
            </Typography>
            <Typography variant="body1">
              Click the save button to save your service area.
            </Typography>
          </div>
          <div className="p-col-12">
            <FormExpansionPanel
              defaultExpanded
              label="Search location"
              content={
                <PlacesAutocompleteComponent
                  onInputChange={handleChange}
                  name="mapCenter"
                  target="currentTarget"
                />
              }
            />
          </div>
          <div className="p-col-12">
            <GoogleMapsComponent
              markerType="multiple"
              coordinates={props.coordinates}
              handleMapClick={props.handleMapClick}
              drawPolygon={props.drawPolygon}
              ref={props.handleGoogleMapsComponentRef}
              mapElement={<div style={{ height: '100%' }} />}
              containerElement={<div style={{ height: 300 }} />}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleGoBack} disabled={activity}>
          Go Back
        </Button>
        <Button onClick={props.handleClearCoordinates} disabled={activity}>
          Clear
        </Button>
        <Button
          color="primary"
          disabled={props.coordinates.length < 3 || activity}
          name="drawPolygon"
          onClick={props.handleChange}
          style={{ marginLeft: '1rem' }}
        >
          DRAW
        </Button>
        <Button
          color="primary"
          variant="contained"
          disabled={props.coordinates.length < 3 || activity}
          onClick={props.handleSaveServiceArea}
          style={{ marginLeft: '1rem' }}
        >
          SAVE
        </Button>
      </DialogActions>
    </Page>
  );
};

ServiceAreasDrawComponent.propTypes = {
  activity: PropTypes.bool,
  drawPolygon: PropTypes.bool,
  handleGoBack: PropTypes.func,
  handleChange: PropTypes.func,
  handleMapClick: PropTypes.func,
  handleSaveServiceArea: PropTypes.func,
  handleClearCoordinates: PropTypes.func,
  handleGoogleMapsComponentRef: PropTypes.func,
  coordinates: PropTypes.arrayOf(PropTypes.array)
};

export default ServiceAreasDrawComponent;
