import React, { Component } from 'react';
import PropTypes from "prop-types";

class Header extends Component {

	static propTypes = {
		menuToggle: PropTypes.func.isRequired,
		hamburgerClass: PropTypes.string.isRequired
	}

	render(){
		return (
			<div>
				<header>
					<button type="button" aria-label="Open or close the menu"
						className={this.props.hamburgerClass}
					   	tabIndex="2"
					   	onClick = {this.props.menuToggle}>
					   	<span></span>
					</button>
					<h1 tabIndex="1">Helsinki Center Cafés <span>made with Foursquare</span></h1>
				</header>
			</div>
		)
	}
}

export default Header;