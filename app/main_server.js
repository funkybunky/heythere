
import {Posts, Users} from './collections';
import { Events } from "collections/Events";

import "./publications/events";
import "./publications/currentEventParticipants";

// Prolly used for SSR:
// import React from 'react';
// import App from './components/App.jsx';

// we don't need fixtures atm:
// import {createPosts, createUsers} from './fixtures';

// we don't call this so we're just importing to initialize file
import "./methods/updatePosition";
import "./methods/sendInvite";
import "./methods/acceptInvite";
import "./methods/updateNote";
import "./methods/starUser";
import "./methods/changePublicData";
import "./methods/createEvent";
import "./methods/joinEvent";
import "./methods/leaveEvent";

// these will only run on the sever since we only 'import' them in main_server.js


Meteor.publish("userData", function() {
  let id = this.userId;
  if (!id) throw new Meteor.Error("logged-out", "Please login to use this function.");
	return Users.find(id);
});

Meteor.publish("getPrivateUserData", function(otherId) {
	check(otherId, String);

	const id = this.userId;
	if (!id) throw new Meteor.Error("logged-out", "Please login to use this function.");
	// find and select private information from other users
	const friendIds = Users.findOne(id).connectedWith;
	if (!friendIds.includes(otherId)) {
		throw new Meteor.Error("not-friends", "You have to be friends in order to view contact info for that user.");
	}
	console.log("publish fn getPrivateUserData for user ", Users.findOne(id).username, " - friendIds: ", friendIds);
	
	// return Users.find({ _id: { $in: friendIds } });	// TODO: select the info
	const cursor = Users.find(otherId);
	if (!cursor || cursor.count()===0) {
		throw new Error("cursor is undefined, sth went really wrong!");
	} else {
		console.log("fetched user: ", cursor.fetch());
	}
	return cursor;
});

console.log('\n\nRunning on server only');
console.log('There are # posts:', Posts.find().fetch().length);

console.log("number of users: ", Users.find().count());

Meteor.publish("currentEvent", function() {
	const that = this;

	const id = that.userId;
	if (!id) that.error( new Meteor.Error("logged-out", "Please login to use this function.") );

	const currentUser = Users.findOne(id);

	const eventId = currentUser.currentEvent.eventId;

	if (eventId === "") that.error( new Meteor.Error("no-user-event", "Current user is not logged into any event.") ); //this.ready(); // if the user is not logged into any event, just mark the pub as ready

	const currentEvent = Events.findOne(eventId);

	if (typeof currentEvent === "undefined") {
		that.error( Meteor.Error("unknown-error", "Something strange happened. We don't have a clue. Please reload and give as a shout about it. Sorry.") );
	}

	console.log("currentEvent pub. participants: ", currentEvent.participants);

	return Events.find(eventId);
	// return [
	// 	Events.find(eventId), 
	// 	Users.find({ _id: { $in: currentEvent.participants } }),
	// ];
});

// Uncomment for SSR:
// console.log('React SSR:', React.renderToString(<App/>));