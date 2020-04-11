import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import './styles.css';

import LoadingIndicator from '../common/LoadingIndicator';

export class MapContainer extends Component {
  render() {
    const { latitude, longitude } = this.props;

    return (
      <div style={{ height: '50vh', width: '50vh' }}>
        <Map
          containerStyle={{
            position: 'static',
            width: '100%',
            height: '100%',
          }}
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: latitude,
            lng: longitude,
          }}
        >
          <Marker name={'Current location'} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  LoadingContainer: LoadingIndicator,
  apiKey: 'AIzaSyDOdAILlldFqsxbM0YEwgoc-855gvo4RAI',
})(MapContainer);
