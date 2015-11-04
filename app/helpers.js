export const throwLoggedOutError = function() {
	throw new Meteor.Error("logged-out", "You need to be logged in to perform this action.");
}

export const isEventJoinable = function(eventStartTime) {
	const slackMs = Meteor.settings.public.events.joinMinutesBeforeEventStart * 60 * 1000;
	const now = new Date();
	const msToEventStart = eventStartTime - now;
	return slackMs > msToEventStart ? true : false;
}