/* global Mongo, Meteor */
export const Users = Meteor.users;
export const Posts = new Mongo.Collection('posts');
export const NearbyUsers = new Mongo.Collection("nearbyUsers");

// fixes
if (Meteor.isServer && false) {
  Users.find({}).fetch().forEach((user)=> {
    Users.update(user._id, { $set: { 
      friendData: {
        lastName: user.profile.name || "Grant",
        email: user.email || "hugh@grant.com",
        skype: "my secret skype name",
      },
      publicData: {
        firstName: user.username || "Hugh",
        profession: user.profile.role || "Rocket Scientist",
        passion: "cats, chess, bunjee-jumping",
        avatar: user.profile.avatar || "http://vignette3.wikia.nocookie.net/tooninfo/images/f/f4/Goofy-2.gif/revision/latest?cb=20121111003318",
      }
    }});    
  });
  // Users.update({}, { $set: { 
  //   friendData: {
  //     lastName: "Grant",
  //     email: "hugh@grant.com",
  //     skype: "my secret skype name",
  //   },
  //   publicData: {
  //     firstName: 
  //   }
  // }},
  // { multi: true });
  console.log("users updated!");
}

if (Meteor.isServer) {
Accounts.onCreateUser(function(options, user) {
  user.nearbyUsers = [];
  user.receivedInvites = [];
  user.sentInvites = [];
  user.connectedWith = [];
  user.starredUsers = [];
  user.skypeId = "my skype id :)";
  user.profile = options.profile || {
    name: user.username + ' Richie',
    role: 'Programmer',
    avatar: "http://vignette3.wikia.nocookie.net/tooninfo/images/f/f4/Goofy-2.gif/revision/latest?cb=20121111003318",
  };
  // user.publicFields;
  user.friendFields = [ "username", "skypId", ];
  user.lastPosition = { 
    coords: { 
      latitude: 52.459244, 
      longitude: 13.527281, 
    }, 
    timestamp: Date.now(),
  };
  user.friendData = {
    lastName: user.profile.name || "Grant",
    email: user.email || "hugh@grant.com",
    skype: "my secret skype name",
  };
  user.publicData = {
    firstName: user.username || "Hugh",
    profession: user.profile.role || "Rocket Scientist",
    passion: "cats, chess, bunjee-jumping",
    avatar: user.profile.avatar || "http://vignette3.wikia.nocookie.net/tooninfo/images/f/f4/Goofy-2.gif/revision/latest?cb=20121111003318",
  }; 
  return user;
});  
}
