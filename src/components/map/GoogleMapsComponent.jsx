import React from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";

import {
  GoogleMap,
  Marker,
  withGoogleMap,
  Polygon,
  Circle
  // InfoWindow
} from 'react-google-maps';

class GoogleMapsComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      isInfoOpen: false
    };

    this.mapRef = null;
    this.fitToBounds = false;
    this.handleMapRef = ref => (this.mapRef = ref);
    this.map = withGoogleMap(props => {
      const { coordinates, transporterLocation, mapViewLocations } = props;
      const mapLocations = mapViewLocations ? mapViewLocations : []
      return (
        <GoogleMap
          defaultZoom={10}
          defaultCenter={{ lat: 0.0, lng: 0.0 }}
          onClick={props.handleMapClick}
          ref={this.handleMapRef}
        >
          {props.markerType === 'single' && coordinates.length ? (
            <Marker
              position={{ lat: coordinates[1], lng: coordinates[0] }}
              onClick={props.handleMarkerClick}
            />
          ) : null}

          {props.markerType !== 'single' && props.showMarkers
            ? // eslint-disable-next-line
            coordinates.map((item, index) => {
              if (item.length) {
                return (
                  <Marker
                    key={`marker-${index + 1}`}
                    position={{ lat: item[1], lng: item[0] }}
                  // onClick={this.handleOpenInfoWindow}
                  />
                );
              }
            })
            : null}

          {props.markerType !== "single" && props.showMarkers ?
            mapLocations.map((item, index) => {
              const { location } = item.pickup
              return (
                <Marker
                  key={item._id}
                  position={{ lat: location[1], lng: location[0] }}
                  onClick={() => { props.handleDialogVisibility({ visibility: true, item }) }}
                >
                </Marker>
              );
            }
            )
            : null
          }

          {transporterLocation.length ? (
            <Marker
              position={{
                lat: transporterLocation[1],
                lng: transporterLocation[0]
              }}
            />
          ) : null}

          {props.drawPolygon ? (
            <Polygon
              paths={props.coordinates.map(item => ({
                lat: item[1],
                lng: item[0]
              }))}
            />
          ) : null}

          {props.drawCircle && coordinates.length ? (
            <Circle
              radius={5000}
              center={{ lat: coordinates[1], lng: coordinates[0] }}
              options={{
                strokeColor: '#ff0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#ff0000',
                fillOpacity: 0.4
              }}
            />
          ) : null}
        </GoogleMap>
      );
    });
  }

  componentDidMount() {
    setTimeout(async () => {
      if (this.props.mapType === 'static' && this.mapRef) {
        await this.setCenterAndZoom(this.props.coordinates);
        this.fitToBounds = true;
      }
    }, 0);
  }

  async componentDidUpdate() {
    if (this.fitToBounds && this.props.mapType === 'static' && this.mapRef) {
      if (this.props.mapViewLocations && this.props.mapViewLocations.length > 0) {
        const spacesArray = _.map(this.props.mapViewLocations, (item, index) => {
          return (
            [
              item.pickup.location[1],
              item.pickup.location[0]
            ]
          )
        })
        console.log("This is all location spaces array", spacesArray)
        await this.setCenterAndZoom(spacesArray);
        this.fitToBounds = true;
      }
      else {
        await this.setCenterAndZoom(this.props.coordinates);
        this.fitToBounds = true;
      }
    }
  }

  setCenter(data) {
    try {
      if (data instanceof Array) {
        const bounds = new window.google.maps.LatLngBounds();
        data.forEach(item => {
          bounds.extend({ lat: item[1], lng: item[0] });
        });
        this.mapRef.panToBounds(bounds);
      } else {
        this.mapRef.panTo(data);
      }
    } catch (error) {
      //
    }
  }

  setZoom(data) {
    try {
      const bounds = new window.google.maps.LatLngBounds();
      data.forEach(item => {
        bounds.extend({ lat: item[1], lng: item[0] });
      });
      this.mapRef.fitBounds(bounds);
    } catch (error) {
      //
    }
  }

  async setCenterAndZoom(data = []) {
    try {
      const bounds = new window.google.maps.LatLngBounds();
      data.forEach(item => {
        bounds.extend({
          lat: item[0],
          lng: item[1]
        });
      });

      this.mapRef.panToBounds(bounds);
      this.mapRef.fitBounds(bounds);
    } catch (error) {
      //
    }
  }

  render() {
    const Map = this.map;
    return <Map {...this.props} />;
  }
}

GoogleMapsComponent.defaultProps = {
  loadingElement: <span />,
  handleMapClick: () => null,
  transporterLocation: []
};

GoogleMapsComponent.propTypes = {
  mapType: PropTypes.string,
  drawCircle: PropTypes.bool,
  drawPolygon: PropTypes.bool,
  showMarkers: PropTypes.bool,
  markerType: PropTypes.string,
  handleMapClick: PropTypes.func,
  handleMarkerClick: PropTypes.func,
  coordinates: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.array)
  ]),
  transporterLocation: PropTypes.arrayOf(PropTypes.number)
};

export default GoogleMapsComponent;
