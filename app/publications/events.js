/* global Meteor */

import { Events } from "../collections/Events";

Meteor.publish("todaysEvents", function(city) {
	return Events.find();
});