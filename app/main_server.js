import {Posts, Users} from './collections';
import { Events } from "collections/Events";
// Prolly used for SSR:
// import React from 'react';
// import App from './components/App.jsx';

// We don't need fixtures atm:
// import {createPosts, createUsers} from './fixtures';

// Initialize publications
import "./publications/events";
import "./publications/currentEventParticipants";
import "./publications/userData.publication.server";
import "./publications/getPrivateUserData.publication.server";
import "./publications/currentEvent.publication.server";

// Initialize methods
import "./methods/updatePosition";
import "./methods/sendInvite";
import "./methods/acceptInvite";
import "./methods/updateNote";
import "./methods/starUser";
import "./methods/changePublicData";
import "./methods/createEvent";
import "./methods/joinEvent";
import "./methods/leaveEvent";

console.log('\n\nRunning on server only');
console.log('There are # posts:', Posts.find().fetch().length);
console.log("number of users: ", Users.find().count());

// Uncomment for SSR:
// console.log('React SSR:', React.renderToString(<App/>));
