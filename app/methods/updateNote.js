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

		const friendInfo = {
			friendInfos: {
				[otherId]: {
					notes: text,
				}				
			}
		};
		// http://stackoverflow.com/questions/30969382/mongodb-object-key-with-es6-template-string

		Users.update(that.userId, { 
			$set: friendInfo
		});

		console.log("updateNote called. new user doc: ", Users.findOne(that.userId).friendInfos);

		return true;
	}
})