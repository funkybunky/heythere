/* global ReactMeteorData */
import React, {Component} from 'react';
import { Link } from 'react-router';
import reactMixin from 'react-mixin';
import BlazeTemplate from './BlazeTemplate';
import {Users, Posts} from '../collections/index.js';
import '../method_example';
import NearbyPeopleFeed from "./NearbyPeopleFeed/NearbyPeopleFeed";

Meteor.call('sayHello', function(err, res) {
  console.log(res);
});


@reactMixin.decorate(ReactMeteorData)
export default class App extends Component {
  getMeteorData() {
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
