/* global Meteor, ReactMeteorData */
import React, { Component } from "react";
import reactMixin from 'react-mixin';

import Profile from "./Profile";

@reactMixin.decorate(ReactMeteorData)
export default class ProfileContainer extends Component {
	getMeteorData() {
		let userHandle = Meteor.subscribe("userData");

		const publicData = Meteor.user().publicData;
		const privateData = Meteor.user().privateData;

		return {
			isReady: userHandle.ready(),
			publicData: publicData,
			privateData: privateData,
		}
	}

	render() {
		let publicData = this.data.publicData;
		return (
			<Profile

				firstName={publicData.firstName}
				profession={publicData.profession}
				passion={publicData.passion}
				searchesFor={publicData.searchesFor}
				avatar={publicData.avatar}

				privateData={this.data.privateData}
			/>
		)
	}
}
