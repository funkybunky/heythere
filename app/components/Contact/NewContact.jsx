import React, { Component } from 'react';

import ContactInfo from "./ContactInfo.jsx";

export default class NewContact extends Component {
	state = {
		username: "",
	}
	componentDidMount() {
		// from the path `/contact/:id`
		const contactId = this.props.params.id;
		// console.log("this: ", this);

		Meteor.call("acceptInvite", contactId, (err, res) => {
			if (err) console.log("error while calling acceptInvite: ", err);
			if (res) {
				console.log('call to acceptInvite successful!', res);
				console.log("setState: ", this.setState);
				this.setState({
					username: res,
				});
			}
		});
	}
	render() {
		return (
			<ContactInfo userName={this.state.username} />
		)
	}
}	