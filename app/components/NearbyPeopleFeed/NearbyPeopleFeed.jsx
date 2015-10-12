/* global ReactMeteorData */
import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import PeopleTable from "./PeopleTable/PeopleTable";
import PeopleFilter from "./PeopleFilter/PeopleFilter";
import {Users} from "../../collections/index";
import {List} from "immutable";
// import "../App.scss";
// import "../../lib/ionic/release/css/ionic.css";
// @import url(https://fonts.googleapis.com/css?family=Roboto:400,300,500); -> needs to be in CSS
import BlazeTemplate from '../BlazeTemplate';
import sendPosition from "./sendPosition";

// let injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
// injectTapEventPlugin();


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
		let handle = Meteor.subscribe("userData");
		let friendHandle = Meteor.subscribe("friendsData");

		let people = [];
		let sentInvites = [];
		let receivedInvites = [];
		let userQuery = Users.findOne(Meteor.userId());
		console.log("userQuery: ", userQuery);
		
		return {
			isLoading: ! handle.ready(),
			isLoadingOthers: ! friendHandle.ready(),
			userData: userQuery,
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
		let index = this.state.iStarredPeopleIds.indexOf(userId);
		if (index === -1) {
			this.setState({
				iStarredPeopleIds: this.state.iStarredPeopleIds.push(userId),
			});			
		} else {
			this.setState({
				iStarredPeopleIds: this.state.iStarredPeopleIds.remove(index),
			});
		}

	}
	render() {
		if (this.data.isLoading || this.data.isLoadingOthers || !this.data.userData.nearbyUsers) {
			return (
				<div>App is loading</div>
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
					starredPeopleIds={this.state.iStarredPeopleIds}
					sentInvites={this.data.userData.sentInvites}
					receivedInvites={this.data.userData.receivedInvites}
					handleStarring={this.handleStarring}
					connectedWith={this.data.userData.connectedWith}
				/>
			</div>
		)
	}
}