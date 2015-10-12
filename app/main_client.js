import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import { Router, Route, IndexRoute } from 'react-router';
import NearbyPeopleFeed from './components/NearbyPeopleFeed/NearbyPeopleFeed.jsx';
import Contact from './components/Contact/Contact.jsx';

import './method_example';
import "./methods/sendInvite";


Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

console.log('Running on client only');

function requireAuth(nextState, replaceState) {
  if (!Meteor.userId())
    replaceState({ nextPathname: nextState.location.pathname }, '/')
}

Meteor.startup(() => {
	// Meteor.subscribe("users", function() { // don' sub here, do it in the getMeteorData method
	  ReactDOM.render(
	  	<Router>
	  		<Route path="/" component={App} >
	  			<IndexRoute component={NearbyPeopleFeed} />
	  			<Route path="feed" component={NearbyPeopleFeed} onEnter={requireAuth} />
	  			<Route path="contact/:id" component={Contact} onEnter={requireAuth} />
	  		</Route>
	  	</Router>
	  , document.getElementById('root')
	  );
	// });
});

// GEOLOCATION
// ------------------------------------------------

// see: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation#The_geolocation_object
if ("geolocation" in navigator) {
  /* geolocation is available */
  console.log("yay! geolocation is available");
} else {
  /* geolocation IS NOT available */
  console.log("oh noes! geolocation is not available, app will explode soon!");
}

// testing mdg:geolocation:
// console.log("current location: ", Geolocation.currentLocation());

// Tracker.autorun(function() {
// 	Session.set("loc", Geolocation.currentLocation);
// 	console.log(Session.get("loc"));
// });



// ------------------------------------------------



