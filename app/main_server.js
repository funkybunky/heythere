import {Posts, Users} from '../app/collections';

// we don't call this so we're just importing to initialize file
import "./methods/updatePosition";
import "./methods/sendInvite";
import "./methods/acceptInvite";

// these will only run on the sever since we only 'import' them in main_server.js


Meteor.publish("userData", function() {
  let id = this.userId;
  if (!id) throw new Meteor.Error("logged-out", "Please login to use this function.");
	return Users.find(this.userId);
});

Meteor.publish("friendsData", function() {
	let id = this.userId;
	if (!id) throw new Meteor.Error("logged-out", "Please login to use this function.");
	// find and select private information from other users
	let friendIds = Users.findOne(id).connectedWith;
	console.log("publish fn friendsData for user ", Users.findOne(id).username, " - friendIds: ", friendIds);
	return Users.find({ _id: { $in: friendIds } }); // TODO: select the info
});

console.log('\n\nRunning on server only');
console.log('There are # posts:', Posts.find().fetch().length);
console.log("number of users: ", Users.find().count());


