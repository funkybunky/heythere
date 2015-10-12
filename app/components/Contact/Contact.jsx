import React, { Component } from 'react';
import reactMixin from 'react-mixin';

import {Users} from "../../collections/index";
import ContactInfo from "./ContactInfo.jsx";

@reactMixin.decorate(ReactMeteorData)
export default class Contact extends Component {
	getMeteorData() {
		const contactId = this.props.params.id;
		console.log("id from param: ", contactId);
		let friendHandle = Meteor.subscribe("friendsData");
		return {
			isLoading: ! friendHandle.ready(),
			otherUser: Users.findOne(contactId),
		}
	}
	render() {
		return (
			<div>
			{this.data.isLoading ? (
				<div>Loading..</div>	
			) : (
				<ContactInfo username={this.data.otherUser.username} />
			)}
			</div>
		)
	}
}