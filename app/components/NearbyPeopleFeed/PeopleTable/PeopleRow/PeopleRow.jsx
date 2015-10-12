/* global ReactMeteorData */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Radium from "radium";
import { Link } from 'react-router';

@Radium
export default class PeopleRow extends Component {
  static propTypes = {
    profile: React.PropTypes.object.isRequired,
    handleStarring: React.PropTypes.func.isRequired,
    id: React.PropTypes.string.isRequired,
  }
  localHandleStarring = (e) => {
  	this.props.handleStarring(
  		this.props.id,
  		ReactDOM.findDOMNode(this.refs["starCheck"]).checked,
  	);
  }
  handleConnect = (e) => {
  	Meteor.call("sendInvite", this.props.id);
  }
	render() {
		let connectAction;
		if (this.props.isConnected) {
			connectAction = (<div>You are connected to that user. You can <Link to={`/contact/${this.props.id}`}>visit the profile</Link></div>);
		} else if (this.props.sentInvite) {
			connectAction = <span>Pending invitation - you sent that user an invitation</span>;
		} else if (this.props.receivedInvite) {
			connectAction = <div>You received an invitation: <Link to={`/contact/new/${this.props.id}`}><button>Yes, let's connect!</button></Link></div>;
		} else {
			connectAction = (<button 
								className="button button-energized htConnectButton"
								onClick={this.handleConnect}
							>
								Send invitation!
							</button>);
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
				</section>
				<section style={[styles.itemCol]}>
					{connectAction}
				{/*
					{ this.props.sentInvite ? (
							<div>Pending invitation - you sent that user an invitation</div>
						) : (
							<button 
								className="button button-energized htConnectButton"
								onClick={this.handleConnect}
							>
								Connect!
							</button>
						)
					}				
						<Link to="/contact"><button>Create Contact!</button></Link>
				*/}
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
		// width: "100%",
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
		flexWrap: "wrap",
	},
	column: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		alignItems: "flex-end",
		justifyContent: "space-between",
	},
	item: {
		flexGrow: 1,
		flexBasis: "auto",
	},
	itemCol: {
		flexGrow: 1,
		flexBasis: "40px",
	},
	item2x: {
		flexGrow: 2,
	},
	item3x: {
		flexGrow: 3,
	},
	item4x: {
		flexGrow: 4,
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