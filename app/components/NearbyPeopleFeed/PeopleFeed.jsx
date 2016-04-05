/* global ReactMeteorData */
import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import PeopleTable from "./PeopleTable/PeopleTable";
import PeopleFilter from "./PeopleFilter/PeopleFilter";
import {Users} from "../../collections/index";
import {List} from "immutable";

import BlazeTemplate from '../BlazeTemplProps';

import "../../methods/starUser";


export default class PeopleFeed extends Component {

	static propTypes = {
		currentEvent: React.PropTypes.object.isRequired,
		userData: React.PropTypes.object.isRequired,
		participants: React.PropTypes.array.isRequired,
	}

	state = {
		showStarredOnly: false,
		iStarredPeopleIds: List(),
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
		// console.log("participants in feed: ", this.props.participants);
		return (
			<div>
				<h1>{this.props.currentEvent.name}</h1>
				<PeopleFilter
					showStarredOnly={this.state.showStarredOnly}
					handleUserInput={this.handleUserInput}
				/>
				<PeopleTable
					people={this.props.participants}
					showStarredOnly={this.state.showStarredOnly}
					starredPeopleIds={this.props.userData.starredUsers}
					sentInvites={this.props.userData.sentInvites}
					receivedInvites={this.props.userData.receivedInvites}
					handleStarring={this.handleStarring}
					connectedWith={this.props.userData.connectedWith}
				/>
			</div>
		)
	}
}
