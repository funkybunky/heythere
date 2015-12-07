import React, {Component} from 'react';
import { Link } from 'react-router';
import reactMixin from 'react-mixin';
// import BlazeTemplate from '../BlazeTemplate';
import BlazeTemplProps from '../BlazeTemplProps';


export default class Login extends Component {
	constructor(props) {
		super(props);
		
	}
	state = {
		isLoggedIn: false,
	}
	submitHandler = (err, state) => {
		if (!err) {
			if (state === "signin") {
				console.log("success login");
			}
		} else {
			console.log("err while loggin in: ", err);
		}
	}
	componentWillUpdate() {
		// if (Meteor.userId()) {
		// 	// this.props.loginCb();
		// 	this.setState({
		// 		isLoggedIn: true,
		// 	});
		// } else {
		// 	this.setState({
		// 		isLoggedIn: false,
		// 	});
		// }
	}
	render() {
		return (
			<div>
				Hello to the Login Component

				<BlazeTemplProps template={Template.atForm} />
				<button onClick={AccountsTemplates.logout()}>logout</button>
			</div>
		)
	}
}