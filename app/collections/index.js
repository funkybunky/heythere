/* global Mongo, Meteor */
export const Users = Meteor.users;
export const Posts = new Mongo.Collection('posts');
export const NearbyUsers = new Mongo.Collection("nearbyUsers");

// needed for clinical dead people
// Users.remove({});

// fix to give the dead people some location nearby
let randomUser = Users.findOne({});
if (randomUser && !randomUser.lastPosition) {
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

if (Meteor.isServer) {
Accounts.onCreateUser(function(options, user) {
  user.nearbyUsers = [];
  user.receivedInvites = [];
  user.sentInvites = [];
  user.connectedWith = [];
  user.starredUsers = [];
  user.skypId = "my skype id :)";
  user.profile = options.profile || {
    name: user.username + ' Richie',
    role: 'Programmer',
    avatar: "http://vignette3.wikia.nocookie.net/tooninfo/images/f/f4/Goofy-2.gif/revision/latest?cb=20121111003318",
  };
  // user.publicFields;
  user.friendFields = [ "username", "skypId", ];
  return user;
});  
}
