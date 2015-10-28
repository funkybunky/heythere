/* global Meteor, ReactMeteorData */
import React, { Component } from "react";
import reactMixin from 'react-mixin';

import Profile from "./Profile";

@reactMixin.decorate(ReactMeteorData)
export default class ProfileWrapper extends Component {
	getMeteorData() {
		const publicData = Meteor.user().publicData;
		const privateData = Meteor.user().privateData;
		return {
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
				avatar={publicData.avatar}

			/>
		)
	}
}