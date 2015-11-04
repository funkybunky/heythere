import { Events } from "../collections/Events";
import { Users } from "../collections/index";

import _ from "lodash";

import { throwLoggedOutError } from "../helpers";

Meteor.methods({
	leaveEvent(eventId) {
		check(eventId, String);
		const that = this;
		if (!that.userId) throwLoggedOutError();
		console.log("eventId: ", eventId);

		// check if eventId corresponds to an event
		// does fineOne throw or return undefined? - it's undefined :)
		const event = Events.findOne(eventId);	
		if (typeof event === "undefined") {
			console.log("event is undefined!");
			return false;
		}
		
		console.log("leaveEvent method. event: ", event);
		// check if user is actually signed into this event
		if (!event.participants.includes(that.userId)) {
			console.log("user is not logged into this event.");
			return true;
		}
		// don't throw an error if already signed in, just return true. client will just redirect to the event

		// remove user's entry from that event
		const user = Users.findOne(that.userId);
		if (user.currentEvent.eventId !== "") {
			const oldEventId = user.currentEvent.eventId;
			const oldEvent = Events.findOne(oldEventId);
			if (typeof oldEvent === "undefined") {
				throw new Error("DB data corrupted. entry of user.currentEvent.eventId doesn't point to an existing event.");
			}
			Events.update(oldEventId, { $set: {
				participants: _.without(oldEvent.participants, that.userId)
			}});
		}

		Users.update(that.userId, { $set: { 
			currentEvent: { 
				eventId: "", 
				joinedEventAt: user.currentEvent.joinedEventAt,
			}
		} });

		return true;
	}
});