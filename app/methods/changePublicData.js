import { Users } from "../collections/index";

Meteor.methods({
	changePublicData(publicData, privateData) {
		check(publicData, {
			firstName: String,
			profession: String,
			avatar: String,
			passion: String,
		});
		check(privateData, {
			lastName: String,
			mail: String,
			skypeId: String,
		});

		let that = this;

		if (!this.userId) {
			throw new Meteor.Error("logged-out", "You need to be logged in to perform this action.");
		}

		if (that.isSimulation) {
			console.log("changePublicData on client run");
		}

		Users.update(that.userId, { $set: { 
			publicData: publicData,
			privateData: privateData,
		} });

		return true;
	}
})