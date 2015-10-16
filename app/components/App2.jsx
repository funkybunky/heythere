/* global Meteor, ReactMeteorData */
import React, {Component} from 'react';
import { Link } from 'react-router';
import reactMixin from 'react-mixin';
import BlazeTemplate from './BlazeTemplate';
import BlazeTemplProps from "./BlazeTemplProps.jsx";
import {Users, Posts} from '../collections/index.js';
import NearbyPeopleFeed from "./NearbyPeopleFeed/NearbyPeopleFeed";

import ProfileWrapper from "./EditProfile/ProfileWrapper";

import "normalize.css";
import "./App.css";
import AppBar from 'material-ui/lib/app-bar';
import IconMenu from "material-ui/lib/menus/icon-menu";
import IconButton from "material-ui/lib/icon-button";
import MenuItem from "material-ui/lib/menus/menu-item";
import FlatButton from "material-ui/lib/flat-button";

import LeftNav from "material-ui/lib/left-nav";

const menuItems = [
  { route: 'get-started', text: 'Get Started' },
  { route: 'contact/:id', text: 'Customization' },
  { route: 'components', text: 'Components' },
];

@reactMixin.decorate(ReactMeteorData)
export default class App extends Component {
  getMeteorData() {
    let handle = Meteor.subscribe("userData");
    // let friendHandle = Meteor.subscribe("friendsData");    
    return {
      isReady: handle.ready(),
      currentUser: Meteor.user(),
    };
  }
  handleMenuClick = (e) => {
    e.preventDefault();
    this.refs.leftNav.toggle();
  }

  render() {
    return (
      <div className="App">
        
        <AppBar title="HeyThere!"
          iconElementRight={<BlazeTemplProps template={Template.loginButtons} btp-align="right" />} iconStyleRight={{color: "white"}} onLeftIconButtonTouchTap={this.handleMenuClick}
        />

        <LeftNav ref="leftNav" docked={false} menuItems={menuItems} />

        <ProfileWrapper />
        
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
            <h1>Hello, you are logged in as {this.data.currentUser.username}!</h1>
            {/*<Link to="/feed"><button>Go to Feed</button></Link>*/}
            {this.props.children}
          </section>
        ) : (
          <div>Please Login to see the feed</div>
        )
        }

      </div>
    );
  }
}
