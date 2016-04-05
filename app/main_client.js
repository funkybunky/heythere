import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App';
import FeedContainer from "./components/NearbyPeopleFeed/FeedContainer";
import ContactContainer from './components/Contact/ContactContainer';
import NewContact from './components/Contact/NewContact';
import Login from "./components/Login/Login";
import ProfileContainer from "./components/EditProfile/ProfileContainer";
import EventContainer from "./components/Events/EventContainer";

import "./methods/sendInvite";
import "./methods/leaveEvent";

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
	  ReactDOM.render(
	  	<Router>
	  		<Route path="/" component={App} >
	  			<Route path="login" component={Login} loginCb={handleLogin} />
	  			<Route path="feed" component={FeedContainer} onEnter={requireAuth} />
	  			<Route path="contact/:id" component={ContactContainer} onEnter={requireAuth} />
	  			<Route path="profile" component={ProfileContainer} onEnter={requireAuth} />
	  			<Route path="events" component={EventContainer} onEnter={requireAuth} />
	  		</Route>
	  	</Router>
	  , document.getElementById('root')
	  );
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

// ------------------------------------------------



