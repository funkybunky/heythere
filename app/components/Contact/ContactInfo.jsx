import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ContactInfo extends Component {
	static propTypes = {
		username: React.PropTypes.string.isRequired,
	}
	handleNotesChange = (e) => {
		console.log("event from notes change: ", e.target.value);

	}	
	render() {
		return (
			<div>
				<div>You just made friends with {this.props.username}!</div>
				<Link to="/feed"><button>Back to Feed</button></Link>
				<section>
					<div>Notes about {this.props.username}:</div>
					<textarea autofocus="true" ref="notes" onChange={this.handleNotesChange} />
				</section>
				<section>
					<h3>Contact Info now available for that user:</h3>
				</section>
			</div>
		)	
	}
}