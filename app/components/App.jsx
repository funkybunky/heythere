/* global Meteor, ReactMeteorData */

import React, {Component} from 'react';
import { Link, PropTypes } from 'react-router';
import reactMixin from 'react-mixin';

import {Users, Posts} from '../collections/index.js';

import BlazeTemplProps from "./BlazeTemplProps";
import ProfileContainer from "./EditProfile/ProfileContainer";

import "./App.css";

import AppBar from 'material-ui/lib/app-bar';
import IconMenu from "material-ui/lib/menus/icon-menu";
import IconButton from "material-ui/lib/icon-button";
import MenuItem from "material-ui/lib/menus/menu-item";
import FlatButton from "material-ui/lib/flat-button";
import CircularProgress from "material-ui/lib/circular-progress";
import LeftNav from "material-ui/lib/left-nav";

const menuItems = [
  { route: '/', text: 'Home' },
  { route: '/profile', text: 'Profile' },
  { route: '/feed', text: 'Feed' },
  { route: '/events', text: 'Events' },
];

const mainStyles = {
  spacingLeft: {
    marginLeft: "5%",
    marginRight: "5%",
  },
  tag: "bla",
}

@reactMixin.decorate(ReactMeteorData)
@reactMixin.decorate(History)
class App extends Component {

  // see for reference on context: https://github.com/facebook/react/blob/b4962e
  // ff43dbf9dc6f85064ea6bbfb444b5557df/src/modern/class/__tests__
  // /ReactES6Class-test.js#L103-L104
  getChildContext() {
    return mainStyles;
  }

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
    this.context.history.pushState(null, payload.route);
  }

  render() {
    let content;

    if (!this.data.currentUser) {
      content = (
        <div style={mainStyles.spacingLeft}>
          <h1>Welcome to heythere!</h1>
          <p>In this section we will show how this app will help you how to find the next interesting person to talk to. If you are ready, click the login button on the top right to get started!</p>
        </div>
      )
    } else if (this.data.isReady) {
      content = (
          <section>
            {this.props.children}
          </section>
        )
    } else {
      content = <CircularProgress mode="indeterminate" size={2} />
    }

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

        { content }

      </div>
    );
  }
}

App.childContextTypes = {
  spacingLeft: React.PropTypes.object,
  tag: React.PropTypes.string,
};
App.contextTypes = { history: PropTypes.history };
export default App;
// https://github.com/rackt/react-router/blob/master/docs/API.md#but-im-using-classes

