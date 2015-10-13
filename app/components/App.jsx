/* global Meteor, ReactMeteorData */
import React, {Component} from 'react';
import { Link } from 'react-router';
import reactMixin from 'react-mixin';
import BlazeTemplate from './BlazeTemplate';
import {Users, Posts} from '../collections/index.js';
import NearbyPeopleFeed from "./NearbyPeopleFeed/NearbyPeopleFeed";


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
        <header>app header <BlazeTemplate template={Template.loginButtons} /></header>
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
