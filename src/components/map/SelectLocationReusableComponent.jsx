import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  GoogleMap,
  Marker,
  withGoogleMap,
  Circle,
  Polygon
} from 'react-google-maps';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import ApiCalls from '../../service/RequestHandler';
import PlacesAutocompleteComponent from '../../features/orders/components/PlacesAutocompleteComponent';

class SelectLocationReusableComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      activity: false
    };

    this.mapRef = null;
    this.mapHeight = 0;

    /**
     * Map
     */
    this.map = withGoogleMap(props => {
      let { location, coordinates } = props;

      return (
        <GoogleMap
          defaultZoom={10}
          ref={this.handleMapRef}
          onClick={props.handleMapClick}
          defaultCenter={{ lat: 0.0, lng: 0.0 }}
          defaultOptions={{
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false
          }}
        >
          {/**
           * Map Type Single
           */}
          {location.length ? (
            <Marker position={{ lat: location[1], lng: location[0] }} />
          ) : null}
          {props.showRadius && location.length ? (
            <Circle
              radius={5000}
              center={{ lat: location[1], lng: location[0] }}
              options={{
                strokeColor: '#ff0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#ff0000',
                fillOpacity: 0.4
              }}
            />
          ) : null}
          {/*********************************************************/}

          {/**
           * Map Type Multiple
           */}
          {coordinates.map((item, index) => {
            return (
              <Marker
                key={`marker-${index + 1}`}
                position={{ lat: item[1], lng: item[0] }}
              />
            );
          })}

          {props.drawPolygon ? (
            <Polygon
              paths={coordinates.map(item => ({
                lat: item[1],
                lng: item[0]
              }))}
            />
          ) : null}
          {/*********************************************************/}
        </GoogleMap>
      );
    });
  }

  componentDidMount = () => {
    if (this.props.editable) {
      this.mapHeight = this.divRef.parentElement.offsetHeight - 50;
    } else {
      this.mapHeight = this.divRef.parentElement.offsetHeight;
    }

    this.setState({});
    this.getCurrentPosition();
  };

  handleMapClick = e => {
    if (this.props.editable) {
      this.setState({ activity: true });
      this.reverseGeoCode(e.latLng.toJSON());
    }
  };

  reverseGeoCode = async latLng => {
    const response = await ApiCalls.reverseGeoCode([latLng.lat, latLng.lng]);
    if (response.data.status === 'OK') {
      response.data.results[0].latLng = latLng;
      this.handleAddress(response.data.results[0], 'map');
    }
  };

  handleSelectPlace = address => {
    this.setState({ activity: true });
    let result = null;
    geocodeByAddress(address)
      .then(results => {
        result = results[0];
        return result;
      })
      .then(this.handleAddress)
      .catch(error => {
        this.setState({ activity: false });
        return error;
      });
  };

  handleAddress = async (result, type) => {
    let latLng = {};
    if (type === 'map') {
      latLng = result.latLng;
      let country = '', city = '';
      result.address_components.forEach(item => {
        if (item.types.indexOf('country') !== -1) {
          country = item.short_name;
        }
        if (item.types.indexOf('locality') !== -1) {
          city = item.short_name;
        }
      });

      this.props.handleMapClick({
        country,
        city,
        [this.props.addressKey]: result.formatted_address,
        location: [latLng.lng, latLng.lat]
      });
    } else {
      latLng = await getLatLng(result);
      this.mapRef.panTo(latLng);

      let country = '', city = '';
      result.address_components.forEach(item => {
        if (item.types.indexOf('country') !== -1) {
          country = item.short_name;
        }
        if (item.types.indexOf('locality') !== -1) {
          city = item.short_name;
        }
      });

      this.props.handleSelectPlace({
        country,
        city,
        [this.props.addressKey]: result.formatted_address,
        location: [latLng.lng, latLng.lat]
      });
    }

    this.setState({ activity: false });
  };

  getCurrentPosition() {
    const location = this.props.location;
    const coordinates = this.props.coordinates;

    // get current position if map type is single (only one marker)
    if (location.length) {
      setTimeout(() => {
        if (this.mapRef) {
          this.setZoomForSingleMarker(location);
        }
      }, 0);
      return;
    }

    // get current position if map type is multiple (more than one markers)
    if (coordinates.length) {
      setTimeout(() => {
        if (this.mapRef) {
          const bounds = new window.google.maps.LatLngBounds();
          coordinates.forEach(item => {
            bounds.extend({
              lat: item[1],
              lng: item[0]
            });
          });
          this.mapRef.fitBounds(bounds);
        }
      }, 0);
      return;
    }

    this.getCurrentLocation();
  }

  getCurrentLocation = async () => {
    window.navigator.geolocation.getCurrentPosition(pos => {
      setTimeout(async () => {
        if (this.mapRef) {
          await this.mapRef.panTo({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
          await this.reverseGeoCode({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        }
      }, 0);
    });
  };

  setZoomForSingleMarker(location) {
    const bounds = new window.google.maps.LatLngBounds();
    // here you extend your bound as you like
    bounds.extend({ lat: location[1], lng: location[0] });
    if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
      const extendPoint1 = new window.google.maps.LatLng(
        bounds.getNorthEast().lat() + 0.045,
        bounds.getNorthEast().lng() + 0.045
      );
      const extendPoint2 = new window.google.maps.LatLng(
        bounds.getNorthEast().lat() - 0.045,
        bounds.getNorthEast().lng() - 0.045
      );
      bounds.extend(extendPoint1);
      bounds.extend(extendPoint2);
    }
    this.mapRef.panToBounds(bounds);
    this.mapRef.fitBounds(bounds);
  }

  setZoomForMultipleMarkers(coordinates) {
    const bounds = new window.google.maps.LatLngBounds();
    coordinates.forEach(item => {
      bounds.extend({
        lat: item[1],
        lng: item[0]
      });
    });
    this.mapRef.fitBounds(bounds);
  }

  handleMapRef = ref => (this.mapRef = ref);
  handleDivRef = ref => (this.divRef = ref);

  render() {
    const { heading, editable } = this.props;
    const Map = this.map;
    return (
      <div
        ref={this.handleDivRef}
        style={{ border: '5px solid #fff' }}
        className="select-location-component"
      >
        <div
          className="page-title no-bg"
          style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
        >
          <span style={{ lineHeight: '1rem' }}>{heading}</span>
          {editable ? (
            <div>
              <PlacesAutocompleteComponent
                handleSelect={this.handleSelectPlace}
              />
            </div>
          ) : null}
          {this.props.showInfo ? this.props.info : null}
        </div>
        <button
          onClick={this.getCurrentLocation}
          style={{ bottom: editable ? 175 : 110 }}
        >
          <img
            style={{ width: 45, height: 'auto' }}
            src={require('../../static/icons/current-location.png')}
          />
        </button>
        <Map
          {...this.state}
          location={this.props.location}
          showRadius={this.props.showRadius}
          drawPolygon={this.props.drawPolygon}
          handleMapClick={this.handleMapClick}
          coordinates={this.props.coordinates}
          mapElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: this.mapHeight }} />}
        />
        {editable ? (
          <div style={{ pointerEvents: this.state.activity ? 'none' : 'auto' }}>
            {this.props.actions}
          </div>
        ) : null}
      </div>
    );
  }
}

SelectLocationReusableComponent.defaultProps = {
  editable: true,
  location: [],
  coordinates: [],
  addressKey: 'address',
  handleMapClick: () => null,
  handleSelectPlace: () => null
};

SelectLocationReusableComponent.propTypes = {
  info: PropTypes.element,
  showInfo: PropTypes.bool,
  editable: PropTypes.bool,
  heading: PropTypes.string,
  showRadius: PropTypes.bool,
  actions: PropTypes.element,
  drawPolygon: PropTypes.bool,
  addressKey: PropTypes.string,
  handleMapClick: PropTypes.func,
  handleSelectPlace: PropTypes.func,
  location: PropTypes.arrayOf(PropTypes.number),
  coordinates: PropTypes.arrayOf(PropTypes.array)
};

export default SelectLocationReusableComponent;
