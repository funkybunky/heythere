
import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class EditProfile extends Component {
	static propTypes = {
		firstName: React.PropTypes.string.isRequired,
		profession: React.PropTypes.string.isRequired,
		passion: React.PropTypes.string.isRequired,

		inputHandler: React.PropTypes.func.isRequired,
	}
	handleSubmit = (e) => {
		e.preventDefault();
	}
	handleChange = (e) => {
		e.preventDefault();
		console.log("changed form!");
		this.props.inputHandler({
			firstName: ReactDOM.findDOMNode(this.refs["firstName"]).value,
			profession: ReactDOM.findDOMNode(this.refs["profession"]).value,
			passion: ReactDOM.findDOMNode(this.refs["passion"]).value,
		});
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>First Name: 
					<input 
						type="text" 
						placeholder="Jack" 
						value={this.props.firstName} 
						onChange={this.handleChange}
						ref="firstName"
					/>
				</label>
				<label>Profession: 
					<input 
						type="text" 
						placeholder="Full-stack Developer" 
						value={this.props.profession} 
						onChange={this.handleChange}
						ref="profession"
					/>
				</label>
				<label>Hobby/Passion: 
					<input 
						type="text" 
						value={this.props.passion} 
						onChange={this.handleChange} 
						ref="passion"
					/>
				</label>
				<input type="submit" value="Post" />
				<p>Your input is saved as you type</p>
			</form>
		)
	}
}