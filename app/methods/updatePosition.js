import { Users } from "../collections/index";

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

Meteor.methods({
	updatePosition(lat, long) {
		let methodStartTime = Date.now();
		if (!this.userId) {
			throw new Meteor.Error("logged-out", "Please login to perform this action.");
		}
		// console.log("requesting user: ", this.userId);
		let userDoc = Users.findOne(this.userId);
		// console.log("name: ", userDoc.username);
		// console.log("given pos: ", lat, long);
		let otherUsers = Users.find({_id: { $ne: this.userId } }).fetch()
		let nearbyUsers = otherUsers.reduce( (nearbyUsers, user) => {
			if (user.lastPosition) {
				if (!user.username) {
					// console.log("NO USERNAMEZ!");
				} else {
					// console.log(user.username);
				}
				let otherLat = user.lastPosition.coords.latitude;
				let otherLong = user.lastPosition.coords.longitude;
				let dist = distance(lat, long, otherLat, otherLong);
				if (dist < 1000) { // within 1km
					let pubUser = {
						profile: {
							avatar: user.profile.avatar,
							role: user.profile.role,
							name: user.profile.name,
						},
						username: user.username,
						_id: user._id,
					};
					return nearbyUsers.concat(pubUser);
				} else {
					return nearbyUsers;
				}
			} else {
				console.log("user "+ user.username + " has no lastPosition prop!");
			}
			return nearbyUsers;
		}, []);
		Users.update(this.userId, { $set: { 
			nearbyUsers: nearbyUsers,
			lastPosition: {
				coords: {
					longitude: long,
					latitude: lat,
				},
				timestamp: methodStartTime,
			}
		} });
		// console.log("finished updatePosition");
		return lat;
	}
})