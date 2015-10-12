import { Users } from "../collections/index";

Meteor.methods({
	acceptInvite(otherId) {
		check(otherId, String);
		const that = this;
		const userId = that.userId;
		if (!this.userId) {
			throw new Meteor.Error("logged-out", "You need to be logged in to perform this action.");
		}
		let user = Users.findOne(this.userId);
		let otherUser = Users.findOne(otherId);
		if (otherUser.sentInvites.includes(userId)) {
			Users.update(userId, { $push: { connectedWith: otherId } });
			Users.update(otherId, { $push: { connectedWith: userId } });
		} else {
			throw new Meteor.Error("not-invited", "You haven't been invited by this user.");
		}
		return otherUser.username;
	}
})