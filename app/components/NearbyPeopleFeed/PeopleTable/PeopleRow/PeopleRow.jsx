/* global ReactMeteorData */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Radium from "radium";
import { Link } from 'react-router';

import Checkbox from "material-ui/lib/checkbox";
import ToggleStar from "material-ui/lib/svg-icons/toggle/star";
import ToggleStarBorder from "material-ui/lib/svg-icons/toggle/star-border";

import RaisedButton from "material-ui/lib/raised-button";

@Radium
export default class PeopleRow extends Component {
  static propTypes = {
    profile: React.PropTypes.object.isRequired,
    handleStarring: React.PropTypes.func.isRequired,
    id: React.PropTypes.string.isRequired,
  }
  // localHandleStarring = (e) => {
  // 	this.props.handleStarring(
  // 		this.props.id,
  // 		ReactDOM.findDOMNode(this.refs["starCheck"]).checked,
  // 	);
  // }
  muiCheckboxHandler = (e, checked) => {
  	console.log("star clicked. checked: ", checked);
  	this.props.handleStarring(
  		this.props.id,
  		checked,
  	);
  }
  handleConnect = (e) => {
  	Meteor.call("sendInvite", this.props.id);
  }
	render() {
		let connectAction;
		if (this.props.isConnected) {
			connectAction = (
				<div><p>You are connected to that user</p>
				<RaisedButton containerElement={<Link to={`/contact/${this.props.id}`} />} label="visit profile" />
				</div>
			)
		} else if (this.props.sentInvite) {
			connectAction = <p>Pending invitation - you sent that user an invitation</p>;
		} else if (this.props.receivedInvite) {
			// http://stackoverflow.com/questions/30115324/pass-props-in-link-react-router
			// react-router docs: https://github.com/rackt/react-router/blob/master/docs/API.md#link (don't mention params)
			connectAction = (
				<div><p>You received an invitation</p>
					<RaisedButton containerElement={<Link to={`/contact/new/${this.props.id}`} />} label="Connect!" />
				</div>
			)
		} else {
			connectAction = (
				<RaisedButton label="Connect!" onClick={this.handleConnect} />
			)
		}

		return (
	<div style={[styles.row]}>

		<section style={[styles.item]}>
			<img style={[styles.avatar]} src={this.props.profile.avatar}/>
		</section>

		<section style={[styles.item4x]}>
			<h3>{this.props.profile.role}</h3>
	
			<p>{this.props.profile.name}</p>
		</section>

		<section style={[styles.item]}>
			<section style={[styles.column]}>
				<section style={[styles.itemCol]}>
					<Checkbox
						name="checkBoxName"
						value="checkBoxValue"
						ref="starCheck"
						label="Star person"
						onCheck={this.muiCheckboxHandler}
					  	checkedIcon={<ToggleStar />}
						unCheckedIcon={<ToggleStarBorder />}
						defaultChecked={this.props.starredPeopleIds.includes(this.props.id)}	
					/>
					{/*
					<label className="toggle toggle-assertive">
					 <input 
					 	type="checkbox" 
					 	ref="starCheck" 
					 	onChange={this.localHandleStarring} 
					 	checked={this.props.starredPeopleIds.indexOf(this.props.id) !== -1} 
					 />
					 {" "}Star this person
					 <div className="track">
					   <div className="handle"></div>
					 </div>
					</label>
					*/}
				</section>
				<section style={[styles.itemCol]}>
					{connectAction}
				</section>
			</section>
		</section>

	</div>
		)
	}
}

let styles = {
	avatar: {
		borderRadius: "100%",
		maxWidth: "100%",
		// height: "auto",
		// width: "100px",
		// height: "100px",
	},
	description: {
		width: "50%",
	},
	row: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "nowrap",
		// alignItems: "center",
		paddingBottom: "1em",
		// borderBottom: "solid 1px #444";
	},
	column: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		// alignItems: "flex-end",
		justifyContent: "space-between",
		// justifyContent: "center",
	},
	item: {
		flexGrow: 1,
		flexBasis: "4em",
		margin: "auto", // This relies on the fact a margin set to `auto` in a flex container absorb extra space. So setting a vertical margin of auto will make the item perfectly centered in both axis. // https://css-tricks.com/snippets/css/a-guide-to-flexbox/
		borderRight: "10px solid transparent",
	},
	itemCol: {
		flexGrow: 1,
		flexBasis: "50px",
	},
	item4x: {
		flexGrow: 2,
		flexBasis: "6em",
		margin: "auto",
		borderRight: "10px solid transparent",
	},
	itemAlignTop: {
		alignSelf: "flex-start",
	},
	itemAlignBottom: {
		alignSelf: "flex-end",
	},
	itemColRight: {
		alignSelf: "flex-end",
	},

}