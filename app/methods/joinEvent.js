import { Events, EventSchema } from "../collections/Events";
import { Users } from "../collections/index";

import { throwLoggedOutError, isEventJoinable } from "../helpers";

Meteor.methods({
	joinEvent(eventId) {
		check(eventId, String);
		const that = this;
		if (!that.userId) throwLoggedOutError();
		console.log("eventId: ", eventId);

		// check if eventId corresponds to an event
		// does fineOne throw or return undefined? - it's undefined then :)
		const event = Events.findOne(eventId);	
		if (typeof event === "undefined") {
			console.log("event is undefined!");
			return false;
		}
		
		console.log("joinEvent method. event: ", event);
		// check if user is not already signed into this event
		if (event.participants.includes(that.userId)) {
			return true;
		}
		// don't throw an error if already signed in, just return true. client will just redirect to the event

		// check if the event started or if it's 60minutes before the event start
		// only then one can join it
		if (!isEventJoinable(event.startsAt)) {
			throw new Meteor.Error("event-not-open", "The event is not yet open to join. Please wait until it has started (or shortly before).");
		}

		// Events.update(eventId, { $push: { participants: userId } }); // for some strange reason, this throws an error "Exception while invoking method 'joinEvent' MongoError: Cannot update 'participants' and 'participants' at the same time"
		Events.update(eventId, { $set: { participants: event.participants.concat(that.userId) } });

		Users.update(that.userId, { $set: { 
			currentEvent: { 
				eventId: eventId, 
				joinedEventAt: new Date(),
			}
		} });

		return true;
	}
});