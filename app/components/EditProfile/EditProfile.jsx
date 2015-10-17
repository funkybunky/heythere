
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
			avatar: this.state.imgSrc,
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
				<img src={this.state.imgSrc} />
				<EditAvatar getImage={this.avatarHandler} />
			</form>
		</section>
		)
	}
}