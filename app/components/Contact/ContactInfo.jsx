import React, { Component } from 'react';
import { Link } from 'react-router';
import "../../methods/updateNote";

import _ from "lodash";

export default class ContactInfo extends Component {
	constructor(props) {
		super(props);
		this.delayedCb = _.throttle(function (id, text) {
				// console.log("inside throttle!");
				Meteor.call("updateNote", id, text, function(err, res) {
					if (err) console.log("err occured during updateNote: ", err);
				});
		}, 5000, { leading: false, trailing: true, } );
		// see: http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
	}
	static propTypes = {
		id: React.PropTypes.string.isRequired,
		username: React.PropTypes.string.isRequired,
		notes: React.PropTypes.string.isRequired,
		friendData: React.PropTypes.object.isRequired, // data that the other user wants to share with friends only (mostly contact info, mail, skype etc)
	}
	handleNotesChange = (e) => {
		// console.log("event from notes change: ", e.target.value);
		e.persist();
		this.delayedCb(this.props.id, e.target.value);
	}
	render() {
		const friendData = this.props.friendData;
		const friendJsx = Object.keys(friendData).map((contactProp) => {
			return (
				<div key={contactProp}>
					<h4>{contactProp}</h4>
					<p>{friendData[contactProp]}</p>
				</div>
			)
		});
		return (
			<div>
				<div>You just made friends with {this.props.username}!</div>
				<Link to="/feed"><button>Back to Feed</button></Link>
				<section>
					<div>Notes about {this.props.username}:</div>
					<textarea 
						autofocus="true" 
						ref="notes" 
						onChange={this.handleNotesChange} 
						placeholder="What were you talking about?"
						defaultValue={this.props.notes}
						style={[{minHeight: "6em"}]}
						cols="25"
					/>
				</section>
				<section>
					<h3>Contact Info now available for that user:</h3>
					{friendJsx}
				</section>
			</div>
		)	
	}
}