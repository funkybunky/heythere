import React, { Component } from 'react';
import reactMixin from 'react-mixin';

import {Users} from "../../collections/index";
import ContactInfo from "./ContactInfo.jsx";

@reactMixin.decorate(ReactMeteorData)
export default class Contact extends Component {
	getMeteorData() {
		const contactId = this.props.params.id;
		console.log("id from param: ", contactId);
		
		let friendHandle = Meteor.subscribe("getPrivateUserData", contactId, function() {
			// console.log("friendsData ready. otherUser: ", Users.findOne(contactId));
		});
		
		let userHandle = Meteor.subscribe("userData", () => {
			let user = Meteor.user();
			let notes = user.friendNotes && user.friendNotes[contactId] && user.friendNotes[contactId].notes;
			if (!user.connectedWith.includes(contactId)) throw new Error("You must be friends with that person");
			if (typeof notes === "undefined") {
				console.log("user: ", user);
				console.log("contactId: ", contactId);
				console.log("TEST: ", user.friendNotes);
				throw new Error("notes undefined!");
			}
		});
		
		return {
			isReady: friendHandle.ready() && userHandle.ready(),
			otherUser: Users.findOne(contactId),
			contactId: contactId,
			
			userData: Meteor.user(),
			// notes: notes,
		}
	}
	render() {
		const contactId = this.props.params.id;
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
					notes={this.data.userData.friendNotes[contactId].notes}
					friendData={this.data.otherUser.privateData}
				/>
			)}
			</div>
		)
	}
}