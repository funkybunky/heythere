import React, {Component} from "react";

export default class PeopleFilter extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	static propTypes = {
		showStarredOnly: React.PropTypes.bool.isRequired,
		handleUserInput: React.PropTypes.func.isRequired,
	}
	handleChange() {
		// console.log("refs: ", this.refs);
		// this.props.handleUserInput(this.refs['inputShowStarredOnly'].getDOMNode().checked);
		this.props.handleUserInput(React.findDOMNode(this.refs["inputShowStarredOnly"]).checked); // the dot notation doesn't work with string values. see: https://facebook.github.io/react/docs/more-about-refs.html ' you must access using this.refs['myRefString'] if your ref was defined as ref="myRefString"'
	}
	render() {
		return (
			<form>
				<p>
					<input 
						type="checkbox" 
						checked={this.props.showStarredOnly}
						ref="inputShowStarredOnly"
						onChange={this.handleChange}
					/>
					{" "}
					Only show starred people
				</p>
				{/*
				<p>
					<input type="checkbox" />
					{" "}
					Only show people new in range
				</p>
				*/}		
			</form>
		)
	}
}