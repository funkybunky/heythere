/* global Meteor */
import React, { Component } from "react";

import TableRow from "material-ui/lib/table/table-row";
import TableRowColumn from "material-ui/lib/table/table-row-column";
import RaisedButton from "material-ui/lib/raised-button";

export default class Event extends Component {
	static propTypes = {
		name: React.PropTypes.string.isRequired,
		startsAt: React.PropTypes.object.isRequired,
		endsAt: React.PropTypes.object.isRequired,
		location: React.PropTypes.string.isRequired,
		id: React.PropTypes.string.isRequired,

		handleJoinEvent: React.PropTypes.func.isRequired,
	}

	handleJoin = () => {
		this.props.handleJoinEvent(this.props.id);
	}

	render() {
		const startsAt = this.props.startsAt;
		const endsAt = this.props.endsAt;
		let startsAtMinutes = startsAt.getMinutes();
		if (startsAtMinutes === 0) startsAtMinutes = "00";
		let endsAtMinutes = endsAt.getMinutes();
		if (endsAtMinutes === 0) endsAtMinutes = "00";
		const slackMs = Meteor.settings.public.events.joinMinutesBeforeEventStart * 60 * 1000;
		const now = new Date();
		const msToEventStart = startsAt - now;
		// console.log("current event: ", this.props.name);
		// console.log("startsAt ", startsAt);
		// console.log("time to event start in moinutes: ", msToEventStart / 60000);
		// console.log("slack minutes: ", slackMs / 60000);
		const userCanJoin = slackMs > msToEventStart ? true : false;

		return (
      <TableRow>
          <TableRowColumn>{this.props.name}</TableRowColumn>
          <TableRowColumn style={styles.columnTime}>{startsAt.getHours()}:{startsAtMinutes}</TableRowColumn>
          <TableRowColumn style={styles.columnTime}>{endsAt.getHours()}:{endsAtMinutes}</TableRowColumn>
          <TableRowColumn>{this.props.location}</TableRowColumn>
          <TableRowColumn>{userCanJoin ? <RaisedButton label="Join" onClick={this.handleJoin} /> : <span>Hasn't started yet</span>}</TableRowColumn>
      </TableRow>			
		)
	}
}

const styles = {
	columnTime: {
		width: "3em",
	},
};

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
