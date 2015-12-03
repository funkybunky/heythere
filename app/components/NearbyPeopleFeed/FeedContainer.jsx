/* global ReactMeteorData */
import React, {Component} from 'react';
import { PropTypes } from 'react-router';
import reactMixin from 'react-mixin';

import { Users } from "../../collections/index";
import { Events } from "../../collections/Events";

// import {List} from "immutable";

import PeopleFeed from "./PeopleFeed";

import CircularProgress from "material-ui/lib/circular-progress";

import _ from "lodash";

@reactMixin.decorate(History)
@reactMixin.decorate(ReactMeteorData)
class FeedContainer extends Component {

	getMeteorData() {
		if (!Meteor.userId()) throw new Meteor.Error("logged-out", "Please login to see this page");

		let participants = [];
		let userMessage = "";
		
		// console.log("currentEventId: ", currentEventId);

		const userHandle = Meteor.subscribe("userData");
		const eventHandle = Meteor.subscribe("currentEvent", {
			onStop: (error) => {
				if (error) console.log("error: ", error);
				console.log("onStop currentEvent");
				// don't call setState from inside getMeteorData(): https://github.com/meteor/react-packages/issues/71
				userMessage = "You haven't joined an event. You will be redirected to the events section where you can select an event to join."; // TODO: move all of these callbacks into the handle.ready() if clause! that's reactive. in the publication, mark the pub as ready, don't throw an error, in order to trigger the ready() method
				Meteor.setTimeout(() => this.context.history.pushState(null, "/events"), 1500); // TODO:use settings var here
			},
			onReady: () => {
				console.log("onReady callback");
				const currentEventId = Meteor.user().currentEvent.eventId;
				const currentEvent = Events.findOne(currentEventId);
				// check event: is it still ongoing or has it ended already? if so, call leaveEvent method
				const eventEndTime = Events.findOne(currentEventId).endsAt;
				if (eventEndTime - Date.now() < 0) {
					// event has already ended
					Meteor.call("leaveEvent", currentEventId, (err, res) => {
						if (err) console.log("Error while calling leaveEvent: ", err);
						if (res) {
							userMessage = "Your event is already over. You will be redirected to the events section where you can select another event to join.";
							console.log("Event is already over. Redirecting to events..");
							Meteor.setTimeout( () => this.context.history.pushState(null, "/events"), 1500);
						}
					})
				}
			}
		});

		console.log("eventHandle: ", eventHandle);
		if (eventHandle.ready()) { // use this pattern instead of a subscription callback, it's reactive
			console.log("eventHandle is ready");
			const currentEventId = Meteor.user().currentEvent.eventId;
			const currentEvent = Events.findOne(currentEventId);
			if (currentEvent) {
				participants = currentEvent.participants;
				_.pull(participants, Meteor.userId()); // remove the current user from participants so that he doesn't see himself in the feed ;)				
			}
		}

		return {
			isReady: userHandle.ready() && eventHandle.ready(),
			currentEvent: Events.findOne(Meteor.user().currentEvent.eventId),
			userData: Meteor.user(),
			participants: Users.find({ _id: { $in: participants }}).fetch(),
			userMessage: userMessage,
		}
	}

	render() {
		console.log("this.data: ", this.data);
		if (this.data && this.data.userMessage !== "") {
			return (
					<div>{this.data.userMessage} //TODO: render dialog here</div>
			)
		}
		if (this.data && this.data.isReady) {
			// TODO: easy: if (this.data.currentEvent is undefined, just render a dialog and route)
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

FeedContainer.contextTypes = { history: PropTypes.history };
export default FeedContainer;