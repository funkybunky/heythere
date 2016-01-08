
import React, { Component } from "react";
import ReactDOM from "react-dom";

// import EditAvatar from "./EditAvatar";
// import EditAvatar from "./AvatarExample";
import EditAvatar from "./CropperExample";

export default class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imgSrc: props.avatar,
		};
	}
	static propTypes = {
		firstName: React.PropTypes.string.isRequired,
		profession: React.PropTypes.string.isRequired,
		passion: React.PropTypes.string.isRequired,
		avatar: React.PropTypes.string.isRequired,
		searchesFor: React.PropTypes.string.isRequired,

		inputHandler: React.PropTypes.func.isRequired,
		// avatarHandler: React.PropTypes.func.isRequired,
	}
	// state = {
	// 	imgSrc: this.props.avatar,
	// }
	handleSubmit = (e) => {
		e.preventDefault();
	}
	handleChange = (e) => {
		if (e) e.preventDefault();
		// this.setState({
		// 	imgSrc: avatarData,
		// });
		console.log("changed form!");
		this.props.inputHandler({
			firstName: ReactDOM.findDOMNode(this.refs["firstName"]).value,
			profession: ReactDOM.findDOMNode(this.refs["profession"]).value,
			passion: ReactDOM.findDOMNode(this.refs["passion"]).value,
			searchesFor: ReactDOM.findDOMNode(this.refs["searchesFor"]).value,
			avatar: this.state.imgSrc,
		},
		{
			lastName: ReactDOM.findDOMNode(this.refs["lastName"]).value,
			mail: ReactDOM.findDOMNode(this.refs["mail"]).value,
			skypeId: ReactDOM.findDOMNode(this.refs["skypeId"]).value,
		});
	}
	avatarHandler = (dataUrl) => {
		this.setState({
			imgSrc: dataUrl,
		},
		() => this.handleChange()
		);
	}
	render() {
		return (
		<section>
			<h3>Public data</h3>
			<p>This data is visible to all users</p>
			<p>Your input is saved as you type</p>
			<form>
				<label>First Name:
					<br />
					<input
						type="text"
						placeholder="Jack"
						value={this.props.firstName}
						onChange={this.handleChange}
						ref="firstName"
					/>
				</label>
				<br />
				<br />
				<label>Profession:
					<br />
					<input
						type="text"
						placeholder="Full-stack Developer"
						value={this.props.profession}
						onChange={this.handleChange}
						ref="profession"
					/>
				</label>
				<br />
				<br />
				<label>Hobby/Passion:
					<br />
					<input
						type="text"
						value={this.props.passion}
						onChange={this.handleChange}
						ref="passion"
					/>
				</label>
				<br />
				<br />
				<label>What kind of people do you search for?
					<br />
					<input
						type="text"
						value={this.props.searchesFor}
						onChange={this.handleChange}
						ref="searchesFor"
					/>
				</label>
				<br />
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

			<h3>Contact data</h3>
			<p>This data is visible only to your confirmed contacts</p>
			<p>Your input is saved as you type</p>
			<form>
				<label>Last Name:
					<input
						type="text"
						placeholder="Jackson"
						value={this.props.privateData.lastName}
						onChange={this.handleChange}
						ref="lastName"
					/>
				</label>
				<br />
				<label>Mail:
					<input
						type="text"
						placeholder="jack@jackson.com"
						value={this.props.privateData.mail}
						onChange={this.handleChange}
						ref="mail"
					/>
				</label>
				<br />
				<label>Skype Id:
					<input
						type="text"
						value={this.props.privateData.skypeId}
						onChange={this.handleChange}
						ref="skypeId"
					/>
				</label>
			</form>

		</section>
		)
	}
}
