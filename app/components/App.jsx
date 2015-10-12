/* global ReactMeteorData */
import React, {Component} from 'react';
import { Link } from 'react-router';
import reactMixin from 'react-mixin';
import BlazeTemplate from './BlazeTemplate';
import {Users, Posts} from '../collections/index.js';
import '../method_example';
// import '../method'
import NearbyPeopleFeed from "./NearbyPeopleFeed/NearbyPeopleFeed";

Meteor.call('sayHello', function(err, res) {
  console.log(res);
});

// Meteor.setInterval( function() {

  navigator.geolocation.getCurrentPosition(
  function(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log("lat and long", position.coords.latitude, " ", position.coords.longitude);

    Meteor.call("updatePosition", lat, long, function(err, res) {
      console.log("updatePosition called");
      if (res) console.log("result: ", res);
    });
  }, 
  function(positionError) {
    console.log("Position could not be retrieved. code: ", positionError.code, " message: ", positionError.message);
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  );

// }, 5000);


// @reactMixin.decorate(ReactMeteorData)
export default class App extends Component {
  // getMeteorData() {
  //   return {
  //     users: Users.find().fetch()
  //   };
  // }
  // constructor(props) {
  //   super(props);
  // }

  render() {
    // let userCount = Users.find().fetch().length;
    // let postsCount = Posts.find().fetch().length;
    return (
      <div className="App">
        <header>app header</header>
        { Meteor.userId() ? (
          <section>
            <h1>Hello Webpack!</h1>
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
