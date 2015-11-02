/* global Meteor, ReactMeteorData */
import React, { Component } from "react";
import reactMixin from 'react-mixin';

import { Events } from "../../collections/Events";

import "../../methods/createEvent";

import EventList from "./EventList";
import EventSearch from "./EventSearch";
// import CreateEvent from "./CreateEvent";
import CreateEvent from "./CreateEventFormsy";

import CircularProgress from "material-ui/lib/circular-progress";
import RaisedButton from "material-ui/lib/raised-button";
import Dialog from "material-ui/lib/dialog";

@reactMixin.decorate(ReactMeteorData)
export default class EventContainer extends Component {

	state = {
		searchString: "",
		showCreateEventForm: false,
		showFeedback: false,
		createEventErrorMsg: "",
		dialog: {
			title: "",
			actions: [],
			content: "",
		},
	}

	getMeteorData() {
		let currentEventId;
		let joinedEventAt;

		const eventHandle = Meteor.subscribe("todaysEvents");
		const userHandle = Meteor.subscribe("userData", () => {
			// If a function is passed instead of an object, it is interpreted as an onReady callback.
			currentEventId = Meteor.user().currentEvent.eventId;
			joinedEventAt = Meteor.user().currentEvent.signedInAt;
		});

		const searchRegExp = new RegExp(this.state.searchString, "gi");
		const queryObj = {
			"$or": [
				{ "name": { $regex: searchRegExp } },
				{ "location": { $regex: searchRegExp } },
			],
		};

		return {
			isReady: eventHandle.ready() && userHandle.ready(),
			todaysEvents: Events.find(queryObj/*{startsAt: }*/).fetch(),
			// todaysEvents: fakeEvents,
			currentEventId,
			joinedEventAt,
		}
	}

	searchInputHandler = (searchString) => {
		console.log("searchString: ", searchString);
		this.setState({
			searchString,
		})
	}

	joinNewEvent = () => {
		console.log("join new event");
	}

	createEventHandler = (eventData) => {
		console.log("eventData: ", eventData);
		Meteor.call("createEvent", eventData, (err, result) => {
			console.log("create event CB!");
			let message;
			let dialog;
			if (err) {
				console.log("error: ", err);
				message = "Something strange happened. We didn't create the event. message: " + err.message;
				this.setState({
					dialog: {
						title: "Oops!",
						actions: [{ text: "OK" }],
						content: "Something strange happened. We didn't create the event.",
					}
				});
			} else if (result && result.message === "OK") {
				message = "";
				// TODO: get the event id out of the result and save it in state to be able to retrieve it from the joinEventHandler in the dialog later on?
				this.setState({
					dialog: {
						title: "Event successfully created",
						actions: [{ text: "OK" }, { text: "Join event now", onTouchTap: this.joinNewEvent, ref: "joinNewEvent" }],
						content: "All went well",
					}
				});
			} else {
				message = result.message || "";
				this.setState({
					dialog: {
						title: "Event already exists",
						actions: [{ text: "OK" }],
						content: "Please use the search function to check if the event you tried to create is not already there.",
					}
				});
			}
			// TODO: refactor to call setState only once!
			this.setState({
				createEventErrorMsg: message,
				showFeedback: true,
			})
			this.refs["dialog"].show();
		})
	}

	handleCreateEventButton = (e) => {
		e.preventDefault();
		this.setState({
			showCreateEventForm: !this.state.showCreateEventForm,
		})
	}

	render() {
		if (this.data.isReady) {
			return (
				<div>
					<Dialog
						title={this.state.dialog.title}
						ref="dialog"
						actions={this.state.dialog.actions}
					>{this.state.dialog.content}</Dialog>
					<EventSearch
						searchString={this.state.searchString}
						inputHandler={this.searchInputHandler}
					/>
					<br/>
					<RaisedButton
						label={this.state.showCreateEventForm ? "Cancel" : "Create Event" }
						onClick={this.handleCreateEventButton} 
					/>
					{this.state.showCreateEventForm ? 
						<CreateEvent
							name="bla"
							inputHandler={this.createEventHandler}
							errorMessage={this.state.createEventErrorMsg}
						/> : ""
					}
					<h2>Today's events:</h2>
					<EventList
						events={this.data.todaysEvents}
					/>
				</div>
			)
		} else {
			return (
				<CircularProgress mode="indeterminate" size={2} />
			)
		}
	}
}