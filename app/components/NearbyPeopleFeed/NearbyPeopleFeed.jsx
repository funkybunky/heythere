/* global ReactMeteorData */
import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import PeopleTable from "./PeopleTable/PeopleTable";
import PeopleFilter from "./PeopleFilter/PeopleFilter";
import {Users} from "../../collections/index";
import {List} from "immutable";

import BlazeTemplate from '../BlazeTemplate';
import sendPosition from "./sendPosition";

import "../../methods/starUser";

Meteor.setInterval( function() {
	sendPosition();
}, 10000);

@reactMixin.decorate(ReactMeteorData)
export default class NearbyPeopleFeed extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	showStarredOnly: false,
		// 	starredPeopleIds: [],	
		// };
		// this.handleUserInput = this.handleUserInput.bind(this);
		sendPosition();
	}
	state = {
		showStarredOnly: false,
		iStarredPeopleIds: List(),	
	}
	/* ES6 class syntax doesnt allow for getInitialState: https://facebook.github.io/react/docs/reusable-components.html
	getInitialState() {
		return {
			showStarredOnly: false,
			starredPeopleIds: [],	
		}
	}*/	
	getMeteorData() {
		if (!Meteor.userId()) throw new Meteor.Error("logged-out", "Please login to see this page");
		let handle = Meteor.subscribe("userData", () => {
			// this.setState({
			// 	showStarredOnly: Meteor.user(). // prop doesnt exist yet
			// })
		});
		// let friendHandle = Meteor.subscribe("friendsData");

		let people = [];
		let sentInvites = [];
		let receivedInvites = [];
		// let userQuery = Users.findOne(Meteor.userId());
		// console.log("userQuery: ", userQuery);
		
		return {
			isLoading: ! handle.ready(),
			// isLoadingOthers: ! friendHandle.ready(),
			// userData: userQuery,
			userData: Meteor.user(),
			// nearbyUsers: Meteor.user().nearbyUsers,
			// people: people,
			// sentInvites: sentInvites,
			// receivedInvites: receivedInvites,
		}
	}
	handleUserInput = (showStarredOnly) => {
		this.setState({
			showStarredOnly
		});
	}
	handleStarring = (userId, isStarred) => {
		// console.log("handleStarring. userId: ", userId, "isStarred: ", isStarred);
		Meteor.call("starUser", userId, isStarred, function(err, res) {
			if (err) console.log("error occured while calling starring method. err: ", err);
		});
		// let index = this.state.iStarredPeopleIds.indexOf(userId);
		// if (index === -1) {
		// 	this.setState({
		// 		iStarredPeopleIds: this.state.iStarredPeopleIds.push(userId),
		// 	});			
		// } else {
		// 	this.setState({
		// 		iStarredPeopleIds: this.state.iStarredPeopleIds.remove(index),
		// 	});
		// }

	}
	render() {
		if (this.data.isLoading) {
			return (
				<div>Loading..</div>
			)
		}
		return (
			<div>
				<div className="htHeader bar bar-header bar-light">
					<h1 className="title">Nearby People</h1>
				</div>
				<PeopleFilter 
					showStarredOnly={this.state.showStarredOnly}
					handleUserInput={this.handleUserInput}
				/>
				<PeopleTable 
					people={this.data.userData.nearbyUsers} 
					showStarredOnly={this.state.showStarredOnly} 
					starredPeopleIds={this.data.userData.starredUsers}
					sentInvites={this.data.userData.sentInvites}
					receivedInvites={this.data.userData.receivedInvites}
					handleStarring={this.handleStarring}
					connectedWith={this.data.userData.connectedWith}
				/>
			</div>
		)
	}
}