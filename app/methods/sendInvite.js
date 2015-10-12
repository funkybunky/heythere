import { Users } from "../collections/index";

Meteor.methods({
	sendInvite(otherId) {
		check(otherId, String);
		let that = this;

		if (!this.userId) {
			throw new Meteor.Error("logged-out", "You need to be logged in to perform this action."); // it's best practice to use an error code like "logged-out" in this case
		}
		let user = Users.findOne(this.userId);

		if (!user.sentInvites.includes(otherId)) {
			if (!user.receivedInvites.includes(otherId)) {
				// Users.update(this.userId, { $set: { sentInvites: user.sentInvites.concat(otherId) } } );
				Users.update(this.userId, { $push: { sentInvites: otherId } } );
				Users.update(otherId, { $push: { receivedInvites: this.userId } } );
			} else {
				// TODO: must be a glitch, other user sent an invite in the meantime! prolly just connect the two? or sent an error, but don' do nothing ;)
				Meteor.call("acceptInvite", otherId);
			}
		} else {
			throw new Meteor.Error("already-invited", "You already sent an invitation to this user.");
		}
		return true;
	}
})