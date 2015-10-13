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
			[otherId]: {
				notes: text,
			}
		};

		Users.update(that.userId, { 
			$set: friendInfo
		});

		return true;
	}
})