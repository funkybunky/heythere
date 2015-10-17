/* global Meteor */
import React, { Component } from "react";
import EditProfile from "./EditProfile.jsx";
import reactMixin from 'react-mixin';

import "../../methods/changePublicData";

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.throttledMethod = _.throttle((publicData) => {
				Meteor.call("changePublicData", publicData, function(err, res) {
					if (err) console.log("err occured during changePublicData: ", err);
					if (res) {
						// if (publicData === this.state.publicData) {
						// 	// need immutable data to do this :)
						// 	this.setState({
						// 		isSaved: true,
						// 	})
						// }
					}
				});
		}, 3000, { leading: false, trailing: true, } );
		// see: http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
	}
	state = {
		publicData: {
			firstName: this.props.firstName,
			profession: this.props.profession,
			passion: this.props.passion,
			avatar: this.props.avatar,
		},
		isSaved: true,		
		// friendData: this.data.friendData,
	}
	inputHandler = (publicData) => {
		console.log("handler called");
		this.setState({
			publicData: publicData,
			isSaved: false,
		})
		this.throttledMethod(publicData);
		// Meteor.call("changePublicData", publicData, (err, res) => {
		// 	if (err) console.log(err);
		// });
	}
	render() {
		let publicData = this.state.publicData;
		return (

			<EditProfile 
				inputHandler={this.inputHandler}
				avatarHandler={this.avatarHandler}

				firstName={publicData.firstName}
				profession={publicData.profession}
				passion={publicData.passion}
				avatar={publicData.avatar}

			/>
		)
	}
}