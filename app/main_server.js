import {Posts, Users} from '../app/collections';

import "./publications/events";

// we don't call this so we're just importing to initialize file
import "./methods/updatePosition";
import "./methods/sendInvite";
import "./methods/acceptInvite";
import "./methods/updateNote";
import "./methods/starUser";
import "./methods/changePublicData";
import "./methods/createEvent";

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

