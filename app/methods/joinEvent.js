import { Events, EventSchema } from "../collections/Events";
import { Users } from "../collections/index";

import { throwLoggedOutError } from "../helpers";

Meteor.methods({
	joinEvent(eventId) {
		check(eventId, String);
		const that = this;
		if (!that.userId) throwLoggedOutError();

		// check if eventId corresponds to an event
		try {
			const event = Events.findOne(eventId);	
		} catch (err) {
			console.log(err);
		}
		
		// check if user is not already signed into this event
		// event.participants.includes(that.userId)

		Users.update(that.userId, { $set: { 
			currentEvent: { 
				eventId: eventId, 
				joinedEventAt: new Date(),
			}
		} });

		return true;
	}
});