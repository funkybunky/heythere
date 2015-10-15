/* global Meteor */
import { Users } from "../collections/index";

Meteor.methods({
	updateNote(otherId, text) {
		check(otherId, String);
		check(text, String);

		const that = this;

		if (!that.userId) {
			throw new Meteor.Error("logged-out", "You need to be logged in to perform this action.");
		}

		let oldFriendInfo = Users.findOne(that.userId).friendInfos;
		console.log("oldFriendInfo: ", oldFriendInfo);

		if (!oldFriendInfo[otherId]) {
			throw new Error("that entry should already exist. should've been set by acceptÍnvite method.");
		}

		oldFriendInfo[otherId].notes = text;
		console.log("updated oldFriendInfo: ", oldFriendInfo);

		// http://stackoverflow.com/questions/30969382/mongodb-object-key-with-es6-template-string

		Users.update(that.userId, { 
			$set: { friendInfos: oldFriendInfo }
		});

		// console.log("updateNote called. new user doc: ", Users.findOne(that.userId).friendInfos);

		return true;
	}
})