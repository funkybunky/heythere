import { Users } from "../collections/index";

Meteor.methods({
	sendInvite(otherId) {
		check(otherId, String);
		let that = this;

		if (!this.userId) {
			throw new Meteor.Error("logged-out", "You need to be logged in to perform this action."); // it's best practice to use an error code like "logged-out" in this case
		}
		let user = Users.findOne(this.userId);
		user.sentInvites = user.sentInvites || []; // TODO: remove this once schema is in place
		user.receivedInvites = user.receivedInvites || [];
		if (user.sentInvites.indexOf(otherId)===-1) {
			if (user.receivedInvites.indexOf(otherId)===-1) {
				// Users.update(this.userId, { $set: { sentInvites: user.sentInvites.concat(otherId) } } );
				Users.update(this.userId, { $push: { sentInvites: otherId } } );
				Users.update(otherId, { $push: { receivedInvites: this.userId } } );
			} else {
				// TODO: must be a glitch, other user sent an invite in the meantime! prolly just connect the two? or sent an error, but don' do nothing ;)
			}
		} else {
			throw new Meteor.Error("already-invited", "You already sent an invitation to this user.");
		}
		return true;
	}
})