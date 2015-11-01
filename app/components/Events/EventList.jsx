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
	}
	render() {
		const rows = this.props.events.map((event) => 
			<Event 
				name={event.name}
				location={event.location}
				startsAt={event.startsAt}
				endsAt={event.endsAt}
				key={event._id}
			/>
		);
		return (
      <Table>
          <TableHeader
          	displaySelectAll={false}
          	adjustForCheckbox={false}
          >
              <TableRow>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Starts</TableHeaderColumn>
                  <TableHeaderColumn>Ends</TableHeaderColumn>
                  <TableHeaderColumn>Location</TableHeaderColumn>
              </TableRow>
          </TableHeader>
          <TableBody>{rows}</TableBody>
      </Table>			
		)
	}
}
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