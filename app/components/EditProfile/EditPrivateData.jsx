
import React, { Component } from "react";
import ReactDOM from "react-dom";

// TODO: add component for share contact details, later

export default class EditPrivateData extends Component {

	static propTypes = {
		lastName: React.PropTypes.string.isRequired,
		skypeId: React.PropTypes.string,
		email: React.PropTypes.string,
		phone: React.PropTypes.number,

		inputHandler: React.PropTypes.func.isRequired,
	}

	handleChange = (e) => {
		e.preventDefault();
		console.log("changed form!");
		this.props.inputHandler({
			lastName: ReactDOM.findDOMNode(this.refs["lastName"]).value,
			mail: ReactDOM.findDOMNode(this.refs["mail"]).value,
			skypeId: ReactDOM.findDOMNode(this.refs["skypeId"]).value,
		});
	}

	render() {
		return (
		<section>
			<h3>Contact data</h3>
			<p>This data is visible only to your confirmed contacts</p>
			<p>Your input is saved as you type</p>
			<form>
				<label>Last Name: 
					<input 
						type="text" 
						placeholder="Jackson" 
						value={this.props.lastName} 
						onChange={this.handleChange}
						ref="lastName"
					/>
				</label>
				<br />
				<label>Mail: 
					<input 
						type="text" 
						placeholder="jack@jackson.com" 
						value={this.props.mail} 
						onChange={this.handleChange}
						ref="mail"
					/>
				</label>
				<br />
				<label>Skype Id:
					<input 
						type="text" 
						value={this.props.skypeId} 
						onChange={this.handleChange} 
						ref="skypeId"
					/>
				</label>
				<br />
			</form>
		</section>
		)
	}
}