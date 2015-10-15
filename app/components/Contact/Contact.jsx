import React, { Component } from 'react';
import reactMixin from 'react-mixin';

import {Users} from "../../collections/index";
import ContactInfo from "./ContactInfo.jsx";

@reactMixin.decorate(ReactMeteorData)
export default class Contact extends Component {
	getMeteorData() {
		const contactId = this.props.params.id;
		console.log("id from param: ", contactId);
		console.log("id from props: ", this.props.contactId);
		let friendHandle = Meteor.subscribe("friendsData", contactId, function() {
			console.log("friendsData ready. otherUser: ", Users.findOne(contactId));
		});
		let userHandle = Meteor.subscribe("userData");
		return {
			isReady: friendHandle.ready() && userHandle.ready(),
			otherUser: Users.findOne(contactId),
			contactId: contactId,
			userData: Meteor.user(),
		}
	}
	render() {
		console.log("this props: ", this.props);
		console.log("this props.params.id: ", this.props.params.id);
		console.log("userData: ", this.data.userData);
		return (
			<div>
			{!this.data.isReady ? (
				<div>Loading..</div>	
			) : (
				<ContactInfo 
					id={this.data.contactId} 
					username={this.data.otherUser.username} 
					notes={this.data.userData.friendInfos[this.props.params.id].notes} />
			)}
			</div>
		)
	}
}