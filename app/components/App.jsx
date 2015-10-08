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
      users: Users.find().fetch()
    };
  }

  render() {
    let userCount = Users.find().fetch().length;
    let postsCount = Posts.find().fetch().length;
    return (
      <div className="App">
        <header>app header</header>
        { Meteor.userId() ? (
          <section>
            <h1>Hello Webpack!</h1>
            <p>There are {userCount} users in the Minimongo  (login to change)</p>
            <p>There are {postsCount} posts in the Minimongo  (autopublish removed)</p>
            <BlazeTemplate template={Template.loginButtons} />
            {/*<Link to="/feed"><button>Go to Feed</button></Link>*/}
            {this.props.children}
          </section>      
          ) : (
            <section>
              <p>Please Login</p>
              <BlazeTemplate template={Template.loginButtons} />
            </section>
          )
        }
      </div>
    );
  }
}
