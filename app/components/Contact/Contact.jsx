import React, { Component } from 'react';
import { Link } from 'react-router';

// import "../../methods/acceptInvite";

export default class Contact extends Component {
	state = {
		username: "",
	}
	componentDidMount() {
		// from the path `/contact/:id`
		const contactId = this.props.params.id;
		// console.log("this: ", this);
		Meteor.call("acceptInvite", contactId, (err, res) => {
			if (err) console.log("error while calling acceptInvite: ", err);
			if (res) {
				console.log('call to acceptInvite successful!', res);
				console.log("setState: ", this.setState);
				this.setState({
					username: res,
				});
			}

		});
	}
	handleNotesChange = (e) => {
		console.log("event from notes change: ", e.target.value);

	}
	render() {
		return (
			<div>
				You just made friends with {this.state.username}!
				<Link to="/feed"><button>Back to Feed</button></Link>
				<section>
					<textarea autofocus="true" ref="notes" onChange={this.handleNotesChange} />
				</section>
				<section>
					<h3>Contact Info now available for that user:</h3>
				</section>
			</div>
		)
	}
}