import { Users } from "../collections/index";

Meteor.methods({
	changePublicData(publicData) {
		check(publicData, {
			firstName: String,
			profession: String,
			// avatar: String,
			passion: String,
		});
		let that = this;

		if (!this.userId) {
			throw new Meteor.Error("logged-out", "You need to be logged in to perform this action.");
		}

		if (that.isSimulation) {
			console.log("changePublicData on client run");
		}

		Users.update(that.userId, { $set: { publicData: publicData } });

		return true;
	}
})