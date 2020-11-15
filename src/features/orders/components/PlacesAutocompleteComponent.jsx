import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PlacesAutocomplete from 'react-places-autocomplete';
import FormSearchInput from '../../../components/form/FormSearchInput';

export default class PlacesAutocompleteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      activity: false
    };
  }

  handleSelect = address => {
    this.props.handleSelect(address);
  };

  handleInputChange = input => {
    this.setState({ input });
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.input}
        onChange={this.handleInputChange}
        onSelect={this.handleSelect}
        debounce={1000}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div style={{ width: '100%', marginTop: '1em' }}>
            <FormSearchInput
              {...getInputProps({
                disabled: this.state.activity,
                placeholder: 'Search',
                style: { maxWidth: 'unset', lineHeight: '1.3em' }
              })}
              right={
                <img
                  alt=""
                  src={require('../../../static/icons/icon-search.png')}
                />
              }
            />
            <div
              className="autocomplete-dropdown-container"
              style={{
                backgroundColor: '#fff'
              }}
            >
              {suggestions.map(suggestion => {
                const style = { cursor: 'pointer', padding: '0.5rem' };
                return (
                  <div
                    key={suggestion.id}
                    {...getSuggestionItemProps(suggestion, {
                      style
                    })}
                  >
                    <span style={{ fontWeight: 'bold' }}>
                      {suggestion.formattedSuggestion.mainText}
                    </span>
                    <span>
                      , {suggestion.formattedSuggestion.secondaryText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

PlacesAutocompleteComponent.defaultProps = {};

PlacesAutocompleteComponent.propTypes = {
  handleSelect: PropTypes.func
};

// this.setState({ activity: true });
// let result = null;

// geocodeByAddress(address)
//   .then(results => {
//     result = results[0];
//     return getLatLng(results[0]);
//   })
//   .then(latLng => {
//     let country = '';

//     result.address_components.forEach(item => {
//       if (item.types.indexOf('country') !== -1) {
//         country = item.short_name;
//       }
//     });

//     this.props.onInputChange({
//       [this.props.target]: {
//         name: this.props.name,
//         value: {
//           country,
//           [this.props.addressKey]: result.formatted_address,
//           location: [latLng.lng, latLng.lat]
//         }
//       }
//     });

//     this.setState({
//       activity: false,
//       input: this.props.clearAfterSelect ? '' : address
//     });
//   })
//   .catch(error => {
//     this.setState({ activity: false });
//     return error;
//   });
