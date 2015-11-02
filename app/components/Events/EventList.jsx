/* global Meteor */
import React, { Component } from "react";
// import ReactDOM from "react-dom";

import Event from "./Event";

import Table from "material-ui/lib/table/table";
import TableHeader from "material-ui/lib/table/table-header";
import TableHeaderColumn from "material-ui/lib/table/table-header-column";
import TableRow from "material-ui/lib/table/table-row";
import TableBody from "material-ui/lib/table/table-body";

export default class EventList extends Component {
	static propTypes = {
		events: React.PropTypes.array.isRequired,
		handleJoinEvent: React.PropTypes.func.isRequired,
	}
	render() {
		const rows = this.props.events.map((event) => 
			<Event 
				name={event.name}
				location={event.location}
				startsAt={event.startsAt}
				endsAt={event.endsAt}
				key={event._id}
				id={event._id}
				handleJoinEvent={this.props.handleJoinEvent}
			/>
		);
		return (
      <Table
      	selectable={true}
      	>
          <TableHeader
          	displaySelectAll={false}
          	adjustForCheckbox={false}
          >
              <TableRow>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columnTime}>Starts</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columnTime}>Ends</TableHeaderColumn>
                  <TableHeaderColumn>Location</TableHeaderColumn>
                  <TableHeaderColumn>Join event</TableHeaderColumn>
              </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={true} selectable={true} stripedRows={true} >{rows}</TableBody>
      </Table>			
		)
	}
}

const styles = {
	columnTime: {
		width: "3em",
	},
};

          // <TableHeader
          // 	displaySelectAll={false}
          // 	adjustForCheckbox={false}
          // >

			// <div>eventlist
			// 	{rows}
			// </div>

			   // <table>
      //     <thead>
      //         <tr>
      //             <th>Name</th>
      //             <th>Starts</th>
      //             <th>Ends</th>
      //             <th>Location</th>
      //         </tr>
      //     </thead>
      //     <tbody>{rows}</tbody>
      // </table>	