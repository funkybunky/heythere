import React, { Component } from 'react';
import { Link } from 'react-router';
import "../../methods/updateNote";

export default class ContactInfo extends Component {
	static propTypes = {
		id: React.PropTypes.string.isRequired,
		username: React.PropTypes.string.isRequired,
		notes: React.PropTypes.string.isRequired,
	}
	handleNotesChange = (e) => {
		console.log("event from notes change: ", e.target.value);
		Meteor.call("updateNote", this.props.id, e.target.value);
	}	
	render() {
		return (
			<div>
				<div>You just made friends with {this.props.username}!</div>
				<Link to="/feed"><button>Back to Feed</button></Link>
				<section>
					<div>Notes about {this.props.username}:</div>
					<textarea autofocus="true" ref="notes" onChange={this.handleNotesChange} placeholder="What were you talking about?" >{this.props.notes}</textarea>
				</section>
				<section>
					<h3>Contact Info now available for that user:</h3>
				</section>
			</div>
		)	
	}
}