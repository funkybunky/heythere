/* global Meteor, ReactMeteorData */
import React, { Component } from "react";
import EditProfile from "./EditProfile.jsx";
import reactMixin from 'react-mixin';

import "../../methods/changePublicData";

@reactMixin.decorate(ReactMeteorData)
export default class Profile extends Component {
	getMeteorData() {
		const publicData = Meteor.user().publicData;
		const friendData = Meteor.user().friendData;
		return {
			publicData: publicData,
			friendData: friendData,
		}
	}
	state = {
		publicData: this.data.publicData,
		friendData: this.data.friendData,
	}
	inputHandler = (publicData) => {
		console.log("handler called");
		this.setState({
			publicData: publicData,
		})
		Meteor.call("changePublicData", publicData, (err, res) => {
			if (err) console.log(err);
		});
	}
	render() {
		let publicData = this.data.publicData;
		return (
			<EditProfile 
				inputHandler={this.inputHandler}

				firstName={publicData.firstName}
				profession={publicData.profession}
				passion={publicData.passion}
				avatar={publicData.avatar}

			/>
		)
	}
}