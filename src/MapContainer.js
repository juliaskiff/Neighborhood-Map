import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

/*For this project I used Google-maps-react library https://github.com/fullstackreact/google-maps-react */

class MapContainer extends Component {
	static propTypes = {
		allLocations: PropTypes.array.isRequired,
    menuItem: PropTypes.string.isRequired,
    selectLocation: PropTypes.func.isRequired
	}

	state = {
		showingInfoWindow: false,
		activeMarker: {},
    selectedPlace: {},
    hasError: false
	}

  /*Opens Infowindow when marker is clicked*/
  onMarkerClick = (props, marker) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    })
  }

  /*When the location from the list is clicked, associated marker opens*/
  getSnapshotBeforeUpdate(){
    if(this.props.menuItem !== ''){
      this.setState({
        activeMarker: this.refs[this.props.menuItem].marker,
        showingInfoWindow: true 
      });
      this.props.selectLocation('')
    }
    return null
  }

  componentDidUpdate(){
    return null;
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true
    })
  }

	render(){

    const image = 'https://nagdca.org/portals/45/Images/MapMarker2.png';

     if(this.state.hasError) {
      return <h2 className="error">Sorry, Google Maps cannot be loaded</h2>
    } else {

  		return (
  			<Map
          google = {this.props.google}
          ref = {'map'}
          initialCenter = {{
            lat: 60.172063, 
            lng: 24.941449
          }}
          zoom = {14.5}
  				>
            		{this.props.allLocations.map((marker, index) => 
            			<Marker
            				position = {{lat: marker.position.lat, lng: marker.position.lng}}
            				ref={marker.title}
                    key = {index}
            				title = {marker.title}
                    address = {marker.address}
                    icon = {image}
                    animation = {this.state.activeMarker.title === marker.title ? this.props.google.maps.Animation.BOUNCE : null}
            				onClick = {this.onMarkerClick}
            			/>
            		)}
            			<InfoWindow
            				marker = {this.state.activeMarker}
            				onClose = {() => this.setState({activeMarker: {}, showingInfoWindow: false})}
            				visible = {this.state.showingInfoWindow}>

            			   <div className="info-window-content">
  							        <h2 tabIndex="0">{this.state.activeMarker.title}</h2>
                        <div tabIndex="0">{this.state.activeMarker.address}</div>
            				</div>
            			</InfoWindow>
          	</Map>
  		)
  	}
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDgpXQGwxc0pdRmH2DgVvWkULwcG0gAM8A')
})(MapContainer)