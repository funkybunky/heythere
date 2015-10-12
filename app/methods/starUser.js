import { Users } from "../collections/index";

Meteor.methods({
	starUser(otherId) {
		check(otherId, String);
		const that = this;
		const userId = that.userId;
		if (!this.userId) {
			throw new Meteor.Error("logged-out", "You need to be logged in to perform this action.");
		}
		let user = Users.findOne(this.userId);
		if (!user.starredUsers.contains(otherId)) {
			Users.update(userId, { $push: { starredUsers: otherId } });
		} else {
			// throw here?
		}
		return true;
	}
})