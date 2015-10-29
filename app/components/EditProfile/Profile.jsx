/* global Meteor */
import React, { Component } from "react";
import reactMixin from 'react-mixin';

import _ from "lodash";

import EditProfile from "./EditProfile.jsx";
// import EditPrivateData from "./EditPrivateData";

import "../../methods/changePublicData";

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.throttledMethod = _.throttle((publicData, privateData) => {
				Meteor.call("changePublicData", publicData, privateData, (err, res) => {
					if (err) console.log("err occured during changePublicData: ", err);
					if (res) {
						if (_.isEqual(publicData, this.state.publicData) && 
								_.isEqual(privateData, this.state.privateData)) {
							// need immutable data to do this :)
							// well, to do it performantly, but lodash does the job for the prototype ;)
							this.setState({
								isSaved: true,
							});
						}
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
		privateData: this.props.privateData,
	}
	inputHandler = (publicData, privateData) => {
		console.log("handler called");
		this.setState({
			publicData: publicData,
			isSaved: false,
			privateData: privateData,
		})
		this.throttledMethod(publicData, privateData);
		// Meteor.call("changePublicData", publicData, (err, res) => {
		// 	if (err) console.log(err);
		// });
	}
	render() {
		let publicData = this.state.publicData;
		return (

			<div>
				{this.state.isSaved ? <p style={style.status.saved}>Changes saved.</p> : <p style={style.status.saving}>Saving changes..</p>}

			<EditProfile 
				inputHandler={this.inputHandler}

				firstName={publicData.firstName}
				profession={publicData.profession}
				passion={publicData.passion}
				avatar={publicData.avatar}

				privateData={this.state.privateData}
			/>

			</div>
		)
	}
}

const style = {
	status: {
		saved: {
			color: "green",
		},
		saving: {
			color: "red",
		},
	},
};