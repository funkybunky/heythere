import { Users } from "../collections/index";

Meteor.methods({
	starUser(otherId, isStarred) {
		check(otherId, String);
		check(isStarred, Boolean);

		const that = this;
		const userId = that.userId;
		if (!that.userId) {
			throw new Meteor.Error("logged-out", "You need to be logged in to perform this action.");
		}
		let user = Users.findOne(that.userId);
		if (!user.starredUsers.includes(otherId) && isStarred) {
			Users.update(userId, { $push: { starredUsers: otherId } });
		} else if (user.starredUsers.includes(otherId) && !isStarred) {
			Users.update(userId, { $pull: { starredUsers: otherId } });
		}
		return true;
	}
})