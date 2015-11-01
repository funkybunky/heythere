/* global Meteor */
import React, { Component } from "react";

import TableRow from "material-ui/lib/table/table-row";
import TableRowColumn from "material-ui/lib/table/table-row-column";

export default class Event extends Component {
	static propTypes = {
		name: React.PropTypes.string.isRequired,
		startsAt: React.PropTypes.object.isRequired,
		endsAt: React.PropTypes.object.isRequired,
		location: React.PropTypes.string.isRequired,
	}
	render() {
		const startsAt = this.props.startsAt;
		const endsAt = this.props.endsAt;
		let startsAtMinutes = startsAt.getMinutes();
		if (startsAtMinutes === 0) startsAtMinutes = "00";
		let endsAtMinutes = endsAt.getMinutes();
		if (endsAtMinutes === 0) endsAtMinutes = "00";
		return (
      <TableRow>
          <TableRowColumn>{this.props.name}</TableRowColumn>
          <TableRowColumn>{startsAt.getHours()}:{startsAtMinutes}</TableRowColumn>
          <TableRowColumn>{endsAt.getHours()}:{endsAtMinutes}</TableRowColumn>
          <TableRowColumn>{this.props.location}</TableRowColumn>

      </TableRow>			
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

//           <TableRowColumn>join event</TableRowColumn>