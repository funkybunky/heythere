import React, { Component } from 'react';
import reactMixin from 'react-mixin';

import {Users} from "../../collections/index";
import ContactInfo from "./ContactInfo.jsx";

@reactMixin.decorate(ReactMeteorData)
export default class Contact extends Component {
	getMeteorData() {
		const contactId = this.props.params.id;
		// console.log("id from param: ", contactId);
		let friendHandle = Meteor.subscribe("friendsData", contactId, function() {
			// console.log("friendsData ready. otherUser: ", Users.findOne(contactId));
		});
		let userHandle = Meteor.subscribe("userData");
		let user = Meteor.user();
		let notes = user.friendData && user.friendData[contactId] && user.friendData[contactId].notes;
		if (!user.connectedWith.includes(contactId)) throw new Error("You must be friends with that person");
		if (!notes) throw new Error("notes undefined!");
		return {
			isReady: friendHandle.ready() && userHandle.ready(),
			otherUser: Users.findOne(contactId),
			contactId: contactId,
			// userData: Meteor.user(),
			notes: notes,
		}
	}
	render() {
		// console.log("this props: ", this.props);
		// console.log("this props.params.id: ", this.props.params.id);
		// console.log("userData: ", this.data.userData);
		return (
			<div>
			{!this.data.isReady ? (
				<div>Loading..</div>	
			) : (
				<ContactInfo 
					id={this.data.contactId} 
					username={this.data.otherUser.username} 
					notes={this.data.notes} />
			)}
			</div>
		)
	}
}