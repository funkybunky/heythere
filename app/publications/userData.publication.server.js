import { Users } from '../collections';

Meteor.publish("userData", function() {
  let id = this.userId;
  if (!id) throw new Meteor.Error("logged-out", "Please login to use this function.");
  return Users.find(id);
});
