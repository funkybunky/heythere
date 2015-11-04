/* global ReactMeteorData */
import React, {Component} from 'react';
import reactMixin from 'react-mixin';

import { Users } from "../../collections/index";
import { Events } from "../../collections/Events";

// import {List} from "immutable";

import PeopleFeed from "./PeopleFeed";

import CircularProgress from "material-ui/lib/circular-progress";

import _ from "lodash";

@reactMixin.decorate(ReactMeteorData)
export default class FeedContainer extends Component {

	getMeteorData() {
		if (!Meteor.userId()) throw new Meteor.Error("logged-out", "Please login to see this page");

		let participants = [];
		const currentEventId = Meteor.user().currentEvent.eventId;
		// console.log("currentEventId: ", currentEventId);

		const userHandle = Meteor.subscribe("userData");
		const eventHandle = Meteor.subscribe("currentEvent", () => {
			// participants = Events.findOne(currentEventId).participants;
			// console.log("participants in cb: ", participants);
		});

		if (eventHandle.ready()) { // use this pattern instead of a subscription callback
			participants = Events.findOne(currentEventId).participants;
			_.pull(participants, Meteor.userId()); // remove the current user from participants so that he doesn't see himself in the feed ;)
		}

		return {
			isReady: userHandle.ready() && eventHandle.ready(),
			currentEvent: Events.findOne(currentEventId),
			userData: Meteor.user(),
			participants: Users.find({ _id: { $in: participants }}).fetch(),
		}
	}

	render() {
		// console.log("this.data: ", this.data);
		if (this.data && this.data.isReady) {
			return (
				<div>
					<PeopleFeed
						currentEvent={this.data.currentEvent}
						userData={this.data.userData}
						participants={this.data.participants}
					/>
				</div>
			)
		}
		return (
			<CircularProgress mode="indeterminate" size={2} />
		)
	}
}

