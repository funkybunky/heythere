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
			
			let oldFriendInfos = Users.findOne(userId).friendData;
			oldFriendInfos[otherId] = {
				notes: "",
				created: Date.now(),
			};
			Users.update(userId, { 
				$push: { 
					connectedWith: otherId 
				}, 
				$set: { 
					friendData: oldFriendInfos,
				},
			});

			oldFriendInfos = Users.findOne(otherId).friendData;
			oldFriendInfos[userId] = {
				notes: "",
				created: Date.now(),
			};			
			Users.update(otherId, { 
				$push: { 
					connectedWith: userId 
				},
				$set: { 
					friendData: oldFriendInfos,
				},				
			});
			// console.log("Current User doc after update: ", Users.findOne(userId));
			// TODO: remove the id out of sentInvites
		} else {
			throw new Meteor.Error("not-invited", "You haven't been invited by this user.");
		}
		return otherUser.username;
	}
})