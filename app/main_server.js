import {Posts, Users} from '../app/collections';

// we don't call this so we're just importing to initialize file
import "./methods/updatePosition";

// these will only run on the sever since we only 'import' them in main_server.js


// needed for clinical dead people
// Users.remove({});

// fix to give the dead people some location nearby
if (!Users.findOne({}).lastPosition) {
  Users.update({}, { $set: { 
    lastPosition: { 
      coords: { 
        latitude: 52.459244, 
        longitude: 13.527281 
      }, 
      timestamp: Date.now()
    }
  }
  }, { multi: true });
}

Meteor.publish("users", function() {
	return Users.find({});
});

console.log('\n\nRunning on server only');
console.log('There are # posts:', Posts.find().fetch().length);
console.log("number of users: ", Users.find().count());

Accounts.onCreateUser(function(options, user) {

  user.profile = {
    name: user.username + ' Richie',
    role: 'Programmer',
    avatar: "http://vignette3.wikia.nocookie.net/tooninfo/images/f/f4/Goofy-2.gif/revision/latest?cb=20121111003318",
  };
  return user;
})