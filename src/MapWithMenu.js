import React, { Component } from 'react';
import Header from './Header';
import MapContainer from './MapContainer';

class MapWithMenu extends Component {

	state = {
		allLocations: [],
		activeMarkers: [],
		menuClass: 'menu',
		hamburgerClass: 'hamburger',
		menuItem: ''
	}

	componentDidMount() {

    // Get locations list from Foursquare API
	    fetch(`https://api.foursquare.com/v2/venues/explore?client_id=UCV4W5PPUB3QPR05UCDKD54AI2IYUUQZYOGLBYNWUQASE251&client_secret=KJFQA3F0VCHGBJSUU4MZJGBSFFCBOPKOQRDGNKYK1QWBUVX4&v=20180323&ll=60.172409,24.939465&query=coffee&limit=10`)
	    .then(response => response.json())
	      .then(data => {
	        const places = data.response.groups[0].items.map(item => {
	          return {
	            position: { lat: item.venue.location.lat, lng: item.venue.location.lng },
	            title: item.venue.name,
	            address: item.venue.location.address
	          }
	        })
	      this.setState({ allLocations: places })
	      /*console.log(this.state.allLocations)*/
	      this.setState({ activeMarkers: places })
		  /*console.log(this.state.activeMarkers)*/
	    })
	    //If Foursquare can't load 
	    .catch(error => {
	      alert('Sorry, failed to fetch foursquare data', error)
	    })
 	}

	/*Opens the menu when hamburger is clicked*/
	menuToggle = () => {

		if(this.state.menuClass === 'menu' && this.state.hamburgerClass === 'hamburger')
			this.setState({
				menuClass: 'menu active',
				hamburgerClass: 'hamburger close'
			})
		else
			this.setState({
				menuClass: 'menu',
				hamburgerClass: 'hamburger'
			})
	}

	/*Search location*/
	search = (thisQuery) => {
		if(thisQuery.length === 0)
			this.setState({allLocations: this.state.activeMarkers});
		else
			this.setState({allLocations:
				this.state.activeMarkers.filter(l => l.title.toLowerCase().includes(thisQuery.trim().toLowerCase()))
			})
		/*console.log(this.state.allLocations);*/
	}

	/*Update search input*/
	updateQuery = ( query ) => {
		this.setState({query: query, menuItem: ''})
		this.search(query)
	}

	render(){
		return (
			<div>
				<Header
					menuToggle = {this.menuToggle}
					hamburgerClass = {this.state.hamburgerClass}
				/>
				<div className={this.state.menuClass}>
					<div id="searchbar" className="form" role="form">
						<input type="text"
							aria-labelledby="searchbar"
							placeholder="Would you like to have a coffee?"
							tabIndex="3"
							className="search-input"
							value={this.state.value}
							onChange={event => this.updateQuery(event.target.value)}
						/>
					</div>
					<ul className="places-list">
					{this.state.allLocations.map((marker, index) =>
						<li key = {index}
							onClick = {() => this.setState({menuItem: marker.title})} >
							<button tabIndex="3" > 
								{marker.title} 
							</button>
						</li>
					)}
					</ul>
				</div>
				<MapContainer
					allLocations = {this.state.allLocations}
					menuItem={this.state.menuItem}
					selectLocation={(marker) => {this.setState({menuItem: marker})}}
				/>
			</div>
		)
	}
}

export default MapWithMenu;