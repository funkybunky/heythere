
import React, { Component } from "react";
import ReactDOM from "react-dom";

// TODO: add component for share contact details, later

export default class EditProfile extends Component {

	static propTypes = {
		firstName: React.PropTypes.string.isRequired,
		profession: React.PropTypes.string.isRequired,
		passion: React.PropTypes.string.isRequired,
		avatar: React.PropTypes.string.isRequired,

		inputHandler: React.PropTypes.func.isRequired,
	}

	handleChange = (e) => {
		if (e) e.preventDefault();
		console.log("changed form!");
		this.props.inputHandler({
			firstName: ReactDOM.findDOMNode(this.refs["firstName"]).value,
			profession: ReactDOM.findDOMNode(this.refs["profession"]).value,
			passion: ReactDOM.findDOMNode(this.refs["passion"]).value,
		});
	}

	render() {
		return (
		<section>
			<h3>Contact data</h3>
			<p>This data is visible only to your confirmed contacts</p>
			<p>Your input is saved as you type</p>
			<form>
				<label>First Name: 
					<input 
						type="text" 
						placeholder="Jack" 
						value={this.props.firstName} 
						onChange={this.handleChange}
						ref="firstName"
					/>
				</label>
				<br />
				<label>Profession: 
					<input 
						type="text" 
						placeholder="Full-stack Developer" 
						value={this.props.profession} 
						onChange={this.handleChange}
						ref="profession"
					/>
				</label>
				<br />
				<label>Hobby/Passion: 
					<input 
						type="text" 
						value={this.props.passion} 
						onChange={this.handleChange} 
						ref="passion"
					/>
				</label>
				<br />
				{/*<input type="submit" value="Post" />*/}
				<label>Avatar:
				{/*
					<p>Existing profile picture:</p>
					<img src={this.state.imgSrc} />
				*/}
					<EditAvatar getImage={this.avatarHandler} image={this.state.imgSrc} imgWidth="200" imgHeight="200" />
				</label>
			</form>
		</section>
		)
	}
}