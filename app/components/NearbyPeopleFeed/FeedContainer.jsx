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

	state = {
		userMessage: "",
	}

	getMeteorData() {
		if (!Meteor.userId()) throw new Meteor.Error("logged-out", "Please login to see this page");

		let participants = [];
		const currentEventId = Meteor.user().currentEvent.eventId;
		// console.log("currentEventId: ", currentEventId);

		const userHandle = Meteor.subscribe("userData");
		const eventHandle = Meteor.subscribe("currentEvent", {
			onStop: (error) => {
				if (error) console.log("error: ", error);
				console.log("onStop currentEvent");
					this.setState({
						userMessage: "You haven't joined an event. You will be redirected to the events section where you can select an event to join.",
					});
					Meteor.setTimeout(() => this.context.history.pushState(null, "/events"), 3000); // TODO:use settings var here
			},
			onReady: () => {
				const currentEvent = Events.findOne(currentEventId);
				// check event: is it still ongoing or has it ended already? if so, call leaveEvent method
				const eventEndTime = Events.findOne(currentEventId).endsAt;
				if (eventEndTime - Date.now() < 0) {
					// event has already ended
					Meteor.call("leaveEvent", currentEventId, (err, res) => {
						if (err) console.log("Error while calling leaveEvent: ", err);
						if (res) {
							this.setState({
								userMessage: "Your event is already over. You will be redirected to the events section where you can select another event to join.",
							});		
							console.log("Event is already over. Redirecting to events..");
							this.context.history.pushState(null, "/events");
						}
					})
				}
			}
		});

		if (eventHandle.ready()) { // use this pattern instead of a subscription callback, it's reactive
			const currentEvent = Events.findOne(currentEventId);
			if (currentEvent) {
				participants = currentEvent.participants;
				_.pull(participants, Meteor.userId()); // remove the current user from participants so that he doesn't see himself in the feed ;)				
			}
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
		if (this.state.userMessage !== "") {
			return (
					<div>{this.state.userMessage} //TODO: render dialog here</div>
			)
		}
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

FeedContainer.contextTypes = { history: PropTypes.history };
export default FeedContainer;