/* global Meteor, ReactMeteorData */
import React, {Component} from 'react';
import { Link, PropTypes } from 'react-router';
import reactMixin from 'react-mixin';

import {Users, Posts} from '../collections/index.js';

// import BlazeTemplate from './BlazeTemplate';
import BlazeTemplProps from "./BlazeTemplProps.jsx";
import NearbyPeopleFeed from "./NearbyPeopleFeed/NearbyPeopleFeed";
import ProfileWrapper from "./EditProfile/ProfileWrapper";

import "normalize.css";
import "./App.css";

import AppBar from 'material-ui/lib/app-bar';
import IconMenu from "material-ui/lib/menus/icon-menu";
import IconButton from "material-ui/lib/icon-button";
import MenuItem from "material-ui/lib/menus/menu-item";
import FlatButton from "material-ui/lib/flat-button";
import CircularProgress from "material-ui/lib/circular-progress";
import LeftNav from "material-ui/lib/left-nav";

const menuItems = [
  // { route: 'get-started', text: 'Get Started' },
  { route: '/', text: 'Home' },
  { route: '/profile', text: 'Profile' },
  { route: '/feed', text: 'Feed' },
  { route: '/events', text: 'Events' },
];

// console.log("History: ", History);

@reactMixin.decorate(ReactMeteorData)
@reactMixin.decorate(History)
class App extends Component {
  getMeteorData() {
    const handle = Meteor.subscribe("userData", () => {
      const user = Meteor.user();
      // route the user here
      // if user is currently in an event that is still ongoing, redirect to feed
      // if event has ended, redirect to event page
      // if user is not logged into event, redirect to event page
      if (user.currentEvent.eventId.length > 0) {
        this.context.history.pushState(null, "/feed");
      } else {
        this.context.history.pushState(null, "/events");
      }
    });

    return {
      isReady: handle.ready(),
      currentUser: Meteor.user(),
    };
  }
  handleMenuClick = (e) => {
    e.preventDefault();
    this.refs.leftNav.toggle();
  }
  onLeftNavChange = (e, key, payload) => {
    // console.log("THIS: ", this);
    // console.log("this.history", this.history);
    // console.log("this.context: ", this.context);
    // console.log("this.props.routes: ", this.props.routes);
    // this.context.router.transitionTo(payload.route);
    this.context.history.pushState(null, payload.route);
  }

  render() {
    return (
      <div className="App">
        
        <AppBar title="HeyThere!"
          iconElementRight={<BlazeTemplProps template={Template.loginButtons} btp-align="right" />} iconStyleRight={{color: "white"}} onLeftIconButtonTouchTap={this.handleMenuClick}
        />

        <LeftNav 
          ref="leftNav" 
          docked={false} 
          menuItems={menuItems}
          onChange={this.onLeftNavChange}
        />

        {/*<FlatButton label="Testbutton" primary={true} /> */}
        
      {/*
        <AppBar 
          title="HeyThere!"
          iconElementRight={ 
            <IconMenu iconButtonElement={<IconButton iconClassName="muidocs-icon-custom-github" />}>
              <MenuItem primaryText="Refresh" ><BlazeTemplate template={Template.atNavButton} /></MenuItem>
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
          }
        />
      */}
       

        { this.data.isReady ? (
          <section>
            {/*<h1>Hello, you are logged in as {this.data.currentUser.username}!</h1>*/}
            {/*<Link to="/feed"><button>Go to Feed</button></Link>*/}
            {this.props.children}
          </section>
        ) : (
          <CircularProgress mode="indeterminate" size={2} />
        )
        }

      </div>
    );
  }
}

App.contextTypes = { history: PropTypes.history };
export default App;
// https://github.com/rackt/react-router/blob/master/docs/API.md#but-im-using-classes


// {/*<div>Please Login to see the feed</div>*/}
// <div>Loading..</div>