import {Users} from '../collections';

Meteor.publish("currentEventParticipants", function(participants) {
  console.log("currentEventParticipants called, participants: ", participants);
  const self = this;

  check(participants, [String]);

  const id = self.userId;
  if (!id) throw new Meteor.Error("logged-out", "Please login to use this function.");

  // Check if given participants are actually in the current user's event
  // get current event of logged in user
  // get participants of that event
  // compare them with given list
  // is this reactive? is the server list current?

  return Users.find({ _id: { $in: participants } });
});