import { Events, EventSchema } from "../collections/Events";

import { throwLoggedOutError } from "../helpers";

Meteor.methods({
	createEvent(eventData) {
		check(eventData, EventSchema);
		const self = this;
		if (Meteor.isClient && !self.userId) throwLoggedOutError();

		if (eventData.name === "duplicate") return { message: "duplicate" }

		const id = Events.insert(eventData);

		return { message: "OK", event: { _id: id } };
	}
});
