import React, {Component} from "react";
import PeopleRow from "./PeopleRow/PeopleRow";

export default class PeopleTable extends Component {
	static propTypes = {
		people: React.PropTypes.array.isRequired,
		showStarredOnly: React.PropTypes.bool.isRequired,
		starredPeopleIds: React.PropTypes.object.isRequired, // is Immutable List and therefore object, not array
		handleStarring: React.PropTypes.func.isRequired,
	}
	render() {
		// console.log("people: ", this.props.people);
		let rows = this.props.people.reduce( (rows, user) =>
			 (this.props.showStarredOnly && this.props.starredPeopleIds.indexOf(user.username) === -1) 
			 ?
			 rows
			 :
			 rows.concat(
			 	<PeopleRow 
			 		profile={user.profile} 
			 		key={user._id}
			 		id={user._id}
			 		handleStarring={this.props.handleStarring}
			 		starredPeopleIds={this.props.starredPeopleIds}
			 		sentInvite={this.props.sentInvites.indexOf(user._id)!==-1}
			 		receivedInvite={this.props.receivedInvites.indexOf(user._id)!==-1}
			 		isConnected={this.props.connectedWith.includes(user._id)}
			 	/>)
		, []);
		return (
			/*
			<ul className="list">
				{rows}
			</ul>
			*/
			<div>
				{rows}
			</div>
		)
	}
}

// isConnected={this.props.connectedWith.indexOf(user._id)!==-1}