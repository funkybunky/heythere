import React, {Component} from "react";
import PeopleRow from "./PeopleRow/PeopleRow";

export default class PeopleTable extends Component {
	static propTypes = {
		people: React.PropTypes.array.isRequired,
		showStarredOnly: React.PropTypes.bool.isRequired,
		starredPeopleIds: React.PropTypes.array.isRequired, // is Immutable List and therefore object, not array // not immutable anymore atm
		handleStarring: React.PropTypes.func.isRequired,
	}
	render() {
		// console.log("people: ", this.props.people);
		let rows = this.props.people.reduce( (rows, user) =>
			 (this.props.showStarredOnly && !this.props.starredPeopleIds.includes(user._id)) 
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