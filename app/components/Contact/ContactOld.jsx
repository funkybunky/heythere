import React, { Component } from 'react';
import { Link } from 'react-router';
import reactMixin from 'react-mixin';

import {Users} from "../../collections/index";
// import "../../methods/acceptInvite";

@reactMixin.decorate(ReactMeteorData)
export default class Contact extends Component {
	state = {
		username: "",
	}
	getMeteorData() {
		if (!this.props.createUser) {
			const contactId = this.props.params.id;
			console.log("id from param: ", contactId);
			return {
				otherUser: Users.findOne(contactId),
			}	
		} else {
			return {
				otherUser: {},
			}
		}
	}
	componentDidMount() {
		// from the path `/contact/:id`
		const contactId = this.props.params.id;
		// console.log("this: ", this);
		if (this.props.createUser) {
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
		} else {
			this.setState({
				username: this.data.otherUser.username,
			});
		}
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