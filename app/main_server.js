import { Posts, Users } from './collections';
import { Events } from "collections/Events";
// Prolly used for SSR:
// import React from 'react';
// import App from './components/App.jsx';

// We don't need fixtures atm:
// import {createPosts, createUsers} from './fixtures';

// Initialize publications
import "./publications/events";
import "./publications/currentEventParticipants";
import "./publications/userData.publication.server";
import "./publications/getPrivateUserData.publication.server";
import "./publications/currentEvent.publication.server";

// Initialize methods
import "./methods/updatePosition";
import "./methods/sendInvite";
import "./methods/acceptInvite";
import "./methods/updateNote";
import "./methods/starUser";
import "./methods/changePublicData";
import "./methods/createEvent";
import "./methods/joinEvent";
import "./methods/leaveEvent";

console.log('\n\nRunning on server only');
console.log('There are # posts:', Posts.find().fetch().length);
console.log("number of users: ", Users.find().count());

// Uncomment for SSR:
// console.log('React SSR:', React.renderToString(<App/>));

// Fixture: Create an event if there is none today
const today = new Date();
today.setHours(0);
today.setMinutes(0);
// today.setDate(today.getDate() - 1);
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0);
tomorrow.setMinutes(0);
console.log("today: ", today, " tomorrow: ", tomorrow);

// const testEventStart = Events.findOne().startsAt;
// // How can I access the current day of the Mongo Date instance?
// console.log("testEventStart ", testEventStart);
// console.log("typeof: ", typeof testEventStart);
// console.log("JSON: ", EJSON.stringify(testEventStart, null, 2));
// NO, I just search for events that are newer than this morning and older than this evening
if (Events.find({
	$and: [
		{ startsAt: { $gt: today } },
		{ startsAt: { $lt: tomorrow } },
	]
}).count() === 0) {
	console.log("no events for today :(");
	const result = Meteor.call("createEvent", {
		name: "Cat Lovers Meetup",
		location: "We-loathe-Dogs-Coworking",
		startsAt: today,
		endsAt: tomorrow,
		city: "Berlin",
		participants: [],
	});
	if (result.message !== "OK") throw new Error("NOOO!");
} else {
	console.log("We have an event");
}
// if (typeof Events.findOne({startsAt: new }) is "undefined") {
// 	Meteor.call("createEvent", {
// 		name: "Cat Lovers Meetup",
// 		location: "We-loathe-Dogs-Coworking",
// 		startsAt:
// 	})
// }
