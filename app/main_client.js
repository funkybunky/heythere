import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import { Router, Route, IndexRoute } from 'react-router';
import NearbyPeopleFeed from './components/NearbyPeopleFeed/NearbyPeopleFeed.jsx';
import Contact from './components/Contact/Contact.jsx';

import './method_example';


Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

console.log('Running on client only');

Meteor.startup(() => {
	Meteor.subscribe("users", function() {
	  ReactDOM.render(
	  	<Router>
	  		<Route path="/" component={App} >
	  			<IndexRoute component={NearbyPeopleFeed} />
	  			<Route path="feed" component={NearbyPeopleFeed}/>
	  			<Route path="contact" component={Contact}/>
	  		</Route>
	  	</Router>
	  , document.getElementById('root')
	  );
	});
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

// Meteor.setInterval( function() {

	navigator.geolocation.getCurrentPosition(function(position) {
		let lat = position.coords.latitude;
		let long = position.coords.longitude;
	  console.log("lat and long", position.coords.latitude, " ", position.coords.longitude);

	  Meteor.call("updatePosition", lat, long, function(err, res) {
	  	console.log("updatePosition called");
	  	if (res) console.log("result: ", res);
	  });
	});

// }, 5000);

// ------------------------------------------------

// AUTH

function requireAuth(nextState, replaceState) {
  // if (!auth.loggedIn())
  //   replaceState({ nextPathname: nextState.location.pathname }, '/login')
}


