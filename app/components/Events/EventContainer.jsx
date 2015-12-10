/* global Meteor, ReactMeteorData */
import React, { Component } from "react";
import { PropTypes } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from "radium";

import { Events } from "../../collections/Events";

import "../../methods/createEvent";
// import "../../methods/joinEvent";

import EventList from "./EventList";
import EventSearch from "./EventSearch";
// import CreateEvent from "./CreateEvent";
import CreateEvent from "./CreateEventFormsy";

import CircularProgress from "material-ui/lib/circular-progress";
import RaisedButton from "material-ui/lib/raised-button";
import Dialog from "material-ui/lib/dialog";

@reactMixin.decorate(ReactMeteorData)
@reactMixin.decorate(History)
@Radium
class EventContainer extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			searchString: "",
			showCreateEventForm: false,
			showFeedback: false,
			createEventErrorMsg: "",
			dialog: {
				title: "",
				actions: [],
				content: "",
			},
			newEventId: "",
			context: context,
		}
	}
	// this doesn't work, you must define it on top of this class (see below)
	// static contextTypes = {
 //    spacingLeft: React.PropTypes.object,
 //  }



	getMeteorData() {
		let currentEventId = Meteor.user().currentEvent.eventId;
		let joinedEventAt;

		const eventHandle = Meteor.subscribe("todaysEvents");
		const userHandle = Meteor.subscribe("userData", () => {
			// If a function is passed instead of an object, it is interpreted as an onReady callback.
			console.log("Meteor.user: ", Meteor.user());
			currentEventId = Meteor.user().currentEvent.eventId;
			joinedEventAt = Meteor.user().currentEvent.signedInAt;
		});

		const searchRegExp = new RegExp(this.state.searchString, "gi");
		let thisMorning = new Date();
		thisMorning.setUTCHours(0,0,0,0);
		let tonight = new Date();
		tonight.setUTCHours(23,59,59,999);
		const queryObj = {
			"startsAt": { $gte: thisMorning, $lte: tonight },
			"$or": [
				{ "name": { $regex: searchRegExp } },
				{ "location": { $regex: searchRegExp } },
			],
		};

		return {
			isReady: eventHandle.ready() && userHandle.ready(),
			todaysEvents: Events.find(queryObj, { sort: { startsAt: 1 }}).fetch(),
			currentEventId,
			joinedEventAt,
			currentEvent: Events.findOne(currentEventId),
		}
	}

	searchInputHandler = (searchString) => {
		console.log("searchString: ", searchString);
		this.setState({
			searchString,
		})
	}

	joinExistingEvent = (eventId) => {
		console.log("before joinEvent called");
		Meteor.call("joinEvent", eventId, (error, result) => {
			console.log("joinEvent called");
			if (error) console.log("oh noes! ", error.message);
			if (result) {
				console.log("all went well. ", result);
				this.context.history.pushState(null, "/feed");
			}
		});
	}

	joinNewEvent = () => {
		console.log("join new event");
		// console.log("this.refs: ", this.refs);
		// const eventId = this.refs["joinNewEvent"].newEventId; // doesn't work, at this moment, refs is not updated yet; use state instead
		const eventId = this.state.newEventId;
		Meteor.call("joinEvent", eventId, (error, result) => {
			console.log("joinEvent called");
			if (error) console.log("oh noes! ", error.message);
			if (result) {
				console.log("all went well. ", result);
				this.context.history.pushState(null, "/feed");
			}
		});
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
					},
					newEventId: result.event._id,
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
				<div style={this.context.spacingLeft}>
					{this.data.currentEvent ? <p>You are logged in to this event: {this.data.currentEvent.name}</p> : ""}
					<EventSearch
						searchString={this.state.searchString}
						inputHandler={this.searchInputHandler}
					/>
					<br/>
					<RaisedButton
						label={this.state.showCreateEventForm ? "Cancel" : "Create Event" }
						onClick={this.handleCreateEventButton} 
					/>
				</div>
				<div style={styles.column}>
					{this.state.showCreateEventForm ? 
						<CreateEvent
							inputHandler={this.createEventHandler}
							errorMessage={this.state.createEventErrorMsg}
						/> : ""
					}
				</div>
				<h2 style={this.context.spacingLeft}>Today's events:</h2>
				<EventList
					events={this.data.todaysEvents}
					handleJoinEvent={this.joinExistingEvent}
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

EventContainer.contextTypes = { 
	history: PropTypes.history,
	tag: React.PropTypes.string,
	spacingLeft: React.PropTypes.object,
};
export default EventContainer;


const styles = {
	column: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		alignItems: "center",
		justifyContent: "space-between",
		// justifyContent: "center",
	},		
};