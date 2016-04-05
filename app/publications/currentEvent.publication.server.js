import { Users } from '../collections';
import { Events } from '../collections/Events';

Meteor.publish("currentEvent", function() {
  const that = this;

  const id = that.userId;
  if (!id) that.error( new Meteor.Error("logged-out", "Please login to use this function.") );

  const currentUser = Users.findOne(id);

  const eventId = currentUser.currentEvent.eventId;

  if (eventId === "") that.error( new Meteor.Error("no-user-event", "Current user is not logged into any event.") ); //this.ready(); // if the user is not logged into any event, just mark the pub as ready

  const currentEvent = Events.findOne(eventId);

  if (typeof currentEvent === "undefined") {
    that.error( Meteor.Error("unknown-error", "Something strange happened. We don't have a clue. Please reload and give us a shout about it. Sorry.") );
  }

  console.log("currentEvent pub. participants: ", currentEvent.participants);

  return Events.find(eventId);
  // return [
  //  Events.find(eventId),
  //  Users.find({ _id: { $in: currentEvent.participants } }),
  // ];
});
