/* global Mongo, Meteor */
export const Users = Meteor.users;
export const Posts = new Mongo.Collection('posts');
export const NearbyUsers = new Mongo.Collection("nearbyUsers");