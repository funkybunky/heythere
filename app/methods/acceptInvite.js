import { Users } from "../collections/index";

Meteor.methods({
	acceptInvite(otherId) {
		check(otherId, String);
		const that = this;
		const userId = that.userId;
		if (!userId) {
			throw new Meteor.Error("logged-out", "You need to be logged in to perform this action.");
		}
		const user = Users.findOne(userId);
		const otherUser = Users.findOne(otherId);
		if (otherUser.sentInvites.includes(userId)) {
			const friendInfos = (id) => {return {
				friendInfos: {
					[id]: {
						notes: "",
						created: Date.now()
					},
				}
				// [id]: {
				// 	notes: "",
				// 	created: Date.now()
				// },
			} };
			Users.update(userId, { 
				$push: { 
					connectedWith: otherId 
				}, 
				$set: friendInfos(otherId),
			});
			Users.update(otherId, { 
				$push: { 
					connectedWith: userId 
				},
				$set: friendInfos(userId),				
			});
			console.log("Current User doc after update: ", Users.findOne(userId));
			// TODO: remove the id out of sentInvites
		} else {
			throw new Meteor.Error("not-invited", "You haven't been invited by this user.");
		}
		return otherUser.username;
	}
})