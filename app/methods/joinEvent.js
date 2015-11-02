import { Events, EventSchema } from "../collections/Events";

import { throwLoggedOutError } from "../helpers";

Meteor.methods({
	joinEvent(eventId) {
		check(eventId, String);
		const that = this;
		if (!that.userId) throwLoggedOutError();

		return true;
	}
});