import React, { Component } from 'react';
import reactMixin from 'react-mixin';

import {Users} from "../../collections/index";
import ContactInfo from "./ContactInfo.jsx";

@reactMixin.decorate(ReactMeteorData)
export default class Contact extends Component {
	getMeteorData() {
		const contactId = this.props.params.id;
		console.log("id from param: ", contactId);
		let friendHandle = Meteor.subscribe("friendsData", function() {
			console.log("friendsData ready. otherUser: ", Users.findOne(contactId));
		});
		let userHandle = Meteor.subscribe("userData");
		return {
			isLoading: ! friendHandle.ready(),
			otherUser: Users.findOne(contactId),
			contactId: contactId,
			notes: Meteor.user().friendInfos[contactId].notes,
		}
	}
	render() {
		return (
			<div>
			{!this.data.otherUser ? (
				<div>Loading..</div>	
			) : (
				<ContactInfo id={this.data.contactId} username={this.data.otherUser.username} notes={this.data.notes} />
			)}
			</div>
		)
	}
}