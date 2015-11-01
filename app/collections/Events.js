export const Events = new Mongo.Collection("events");

export const EventSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name of the event",
		max: 300,
	},
	location: {
		type: String,
		label: "either name of the venue or the street address of the event",
	},
	startsAt: {
		label: "datetime when the event starts",
		type: Date,
	}, 
	endsAt: {
		label: "datetime when the event ends",
		type: Date,
	},
	city: {
		type: String,
		label: "the city where this event takes place",
		optional: true,
		autoValue: function() {
			if (!this.isSet) {
				return "Berlin";
			}
		},
	},
	participants: {
		type: [String],
		label: "UserIds of participants, array",
		optional: true,
		autoValue: function() {
			if (!this.isSet) {
				return [];
			}
		},
	},
});
// For consistency, you should generally validate and store Dates set to the UTC time zone. If you care only about the date, then use a Date object set to the desired date at midnight UTC. If you need the time, too, then use a Date object set to the desired date and time UTC.

Events.attachSchema(EventSchema);

if (Meteor.isServer) {


	// Events.remove({});

	if (Events.find().count() === 0) {
			const fakeEvents = [
				{
					name: "Meteor meetup",
					location: "co.up",
					startsAt: new Date(2015, 11, 28, 19),
					endsAt: new Date(2015, 11, 28, 21),
					// _id: "adcewc",
				},
				{
					name: "4HWW meetup",
					location: "betahaus",
					startsAt: new Date(2015, 11, 25, 18),
					endsAt: new Date(2015, 11, 25, 20),
					_id: "blabla",
				},
			];
			fakeEvents.forEach((event) => {
				Events.insert(event);
			});
	}

}