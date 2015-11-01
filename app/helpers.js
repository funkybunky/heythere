export const throwLoggedOutError = function() {
	throw new Meteor.Error("logged-out", "You need to be logged in to perform this action.");
}