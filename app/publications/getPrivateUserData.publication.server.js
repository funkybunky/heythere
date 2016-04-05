Meteor.publish("getPrivateUserData", function(otherId) {
  check(otherId, String);

  const id = this.userId;
  if (!id) throw new Meteor.Error("logged-out", "Please login to use this function.");
  // find and select private information from other users
  const friendIds = Users.findOne(id).connectedWith;
  if (!friendIds.includes(otherId)) {
    throw new Meteor.Error("not-friends", "You have to be friends in order to view contact info for that user.");
  }
  console.log("publish fn getPrivateUserData for user ", Users.findOne(id).username, " - friendIds: ", friendIds);

  // return Users.find({ _id: { $in: friendIds } });  // TODO: select the info
  const cursor = Users.find(otherId);
  if (!cursor || cursor.count()===0) {
    throw new Error("cursor is undefined, sth went really wrong!");
  } else {
    console.log("fetched user: ", cursor.fetch());
  }
  return cursor;
});
