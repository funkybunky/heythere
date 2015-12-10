/* global Meteor, ReactMeteorData */
import React, {Component} from 'react';
import { Link } from 'react-router';
import reactMixin from 'react-mixin';
import BlazeTemplate from './BlazeTemplate';
import BlazeTemplProps from "./BlazeTemplProps.jsx";
import {Users, Posts} from '../collections/index.js';
import NearbyPeopleFeed from "./NearbyPeopleFeed/NearbyPeopleFeed";

import "normalize.css";
import "./App.css";
import AppBar from 'material-ui/lib/app-bar';
import IconMenu from "material-ui/lib/menus/icon-menu";
import IconButton from "material-ui/lib/icon-button";
import MenuItem from "material-ui/lib/menus/menu-item";
import FlatButton from "material-ui/lib/flat-button";


if (Meteor.isServer) {
  // Template does not support server side
  var Template = {
    loginButtons: 'any'
  };
}

@reactMixin.decorate(ReactMeteorData)
export default class App extends Component {
  getMeteorData() {
    let handle = Meteor.subscribe("userData");
    // let friendHandle = Meteor.subscribe("friendsData");    
    return {
      currentUser: Meteor.user(),
    };
  }

  render() {
    return (
      <div className="App">
        
        <AppBar title="HeyThere!"
          iconElementRight={<FlatButton><BlazeTemplate template={Template.atNavButton} /></FlatButton>} iconStyleRight={{color: "white"}} 
        />
        
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
       

        { this.data.currentUser ? (
          <section>
            <h1>Hello, you are logged in as {this.data.currentUser.username}!</h1>
            <div><BlazeTemplProps template={Template.atForm} btp-state="signIn" /></div>
            <button><BlazeTemplate template={Template.atNavButton} />LOGOUT?</button>
            <div><BlazeTemplProps template={Template.atForm} btp-state="changePwd" /></div>
            {/*<Link to="/feed"><button>Go to Feed</button></Link>*/}
            {this.props.children}
          </section>
        ) : (
          <div>Please Login to see the feed<BlazeTemplate template={Template.atNavButton} /><BlazeTemplate template={Template.atForm} /></div>
        )
        }

      </div>
    );
  }
}
