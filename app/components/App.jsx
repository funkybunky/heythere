/* global Meteor, ReactMeteorData */
import React, {Component} from 'react';
import { Link } from 'react-router';
import reactMixin from 'react-mixin';
import BlazeTemplate from './BlazeTemplate';
import {Users, Posts} from '../collections/index.js';
import NearbyPeopleFeed from "./NearbyPeopleFeed/NearbyPeopleFeed";

import "normalize.css";
import "./App.css";
import AppBar from 'material-ui/lib/app-bar';
import IconMenu from "material-ui/lib/menus/icon-menu";
import IconButton from "material-ui/lib/icon-button";
import MenuItem from "material-ui/lib/menu/menu-item";


@reactMixin.decorate(ReactMeteorData)
export default class App extends Component {
  getMeteorData() {
    let handle = Meteor.subscribe("userData");
    let friendHandle = Meteor.subscribe("friendsData");    
    return {
      currentUser: Meteor.user(),
    };
  }

  render() {
    return (
      <div className="App">
        <AppBar title="HeyThere!"
          iconElementRight={<BlazeTemplate template={Template.atForm} />} iconStyleRight={{color: "white"}} 
        />

        { this.data.currentUser ? (
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
