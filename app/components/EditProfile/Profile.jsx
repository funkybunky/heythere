/* global Meteor */
import React, { Component } from "react";
import EditProfile from "./EditProfile.jsx";
import reactMixin from 'react-mixin';

import "../../methods/changePublicData";

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.throttledMethod = _.throttle(function (publicData) {
				Meteor.call("changePublicData", publicData, function(err, res) {
					if (err) console.log("err occured during changePublicData: ", err);
				});
		}, 5000, { leading: false, trailing: true, } );
		// see: http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
	}
	state = {
		publicData: {
			firstName: this.props.firstName,
			profession: this.props.profession,
			passion: this.props.passion,
			avatar: this.props.avatar,
		}
		// friendData: this.data.friendData,
	}
	inputHandler = (publicData) => {
		console.log("handler called");
		this.setState({
			publicData: publicData,
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

				firstName={publicData.firstName}
				profession={publicData.profession}
				passion={publicData.passion}
				avatar={publicData.avatar}

			/>
		)
	}
}