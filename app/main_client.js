import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
// import createBrowserHistory from 'react-router/history/lib/createBrowserHistory';

import App from './components/App2.jsx';
import NearbyPeopleFeed from './components/NearbyPeopleFeed/NearbyPeopleFeed.jsx';
import Contact from './components/Contact/Contact.jsx';
import NewContact from './components/Contact/NewContact.jsx';
import Login from "./components/Login/Login.jsx";
import ProfileWrapper from "./components/EditProfile/ProfileWrapper";

import './method_example';
import "./methods/sendInvite";


const injectTapEventPlugin = require("react-tap-event-plugin");

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
});

console.log('Running on client only');

function requireAuth(nextState, replaceState) {
  if (!Meteor.userId())
    replaceState({ nextPathname: nextState.location.pathname }, '/')
}

function handleLogin() {
			console.log("logged in! redirect now");
      // var { location } = this.props

      // if (location.state && location.state.nextPathname) {
      //   this.history.replaceState(null, location.state.nextPathname)
      // } else {
      //   this.history.replaceState(null, '/about')
      // }	
}

Meteor.startup(() => {
	// Meteor.subscribe("users", function() { // don' sub here, do it in the getMeteorData method
	  ReactDOM.render(
	  	<Router>
	  		<Route path="/" component={App} >
	  			
	  			<Route path="login" component={Login} loginCb={handleLogin} />
	  			<Route path="feed" component={NearbyPeopleFeed} onEnter={requireAuth} />
	  			<Route path="contact/:id" component={Contact} onEnter={requireAuth} />
	  			<Route path="contact/new/:id" component={NewContact} onEnter={requireAuth} />
	  			<Route path="profile" component={ProfileWrapper} />
	  		</Route>
	  	</Router>
	  , document.getElementById('root')
	  );
	// });
});
// <IndexRoute component={NearbyPeopleFeed} />

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



