/* global Meteor */
import React, { Component } from "react";

import TextField from "material-ui/lib/text-field";

export default class EventSearch extends Component {
	static propTypes = {
		searchString: React.PropTypes.string.isRequired,
		inputHandler: React.PropTypes.func.isRequired,
	}
	inputHandler = (e) => {
		e.preventDefault();
		const searchString = this.refs["searchInput"].getValue();
		this.props.inputHandler(searchString);
	}
	render() {
		return (
			<TextField
			  hintText="Search event"
			  value={this.props.searchString}
			  onChange={this.inputHandler}
			  ref="searchInput"
			/>
		)
	}
}

// 			  hintText="Search for event name or location"