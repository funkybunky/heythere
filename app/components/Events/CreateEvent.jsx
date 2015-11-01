/* global Meteor */
import React, { Component } from "react";
import ReactDOM from "react-dom";

import Formsy from "formsy-react";
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } from "formsy-material-ui";

import TextField from "material-ui/lib/text-field";
import DatePicker from "material-ui/lib/date-picker/date-picker";
import TimePicker from "material-ui/lib/time-picker";
import RaisedButton from "material-ui/lib/raised-button";

export default class CreateEvent extends Component {

	static propTypes = {
		// name: React.PropTypes.string.isRequired,
		// startsAt: React.PropTypes.object.isRequired,
		// endsAt: React.PropTypes.object.isRequired,
		// location: React.PropTypes.string.isRequired,

		errorMessage: React.PropTypes.string.isRequired,

		inputHandler: React.PropTypes.func.isRequired,
	}

	state = {
			name: "",
			// startsAt: new Date(),
			// endsAt: new Date(),
			date: new Date(),
			startTime: new Date(),
			endTime: new Date(),
			location: "",
			isSubmitting: false,
			canSubmit: false,
	}

  errorMessages = {
    wordsError: "Please only use letters",
    title: "Please provide a title",
  }

  enableButton = () => {
    this.setState({
      canSubmit: true
    });
  }

  disableButton = () => {
    this.setState({
      canSubmit: false
    });
  }

	onSubmitFormOld = () => {
		const name = this.refs["name"].getValue();
		const date = this.refs["date"].getDate();
		const startTime = this.refs["startTime"].getTime();
		const endTime = this.refs["endTime"].getTime();
		const location = this.refs["location"].getValue();

		const startsAt = new Date( date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDay(), startTime.getUTCHours(), startTime.getUTCMinutes() );
		const endsAt = new Date( date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDay(), endTime.getUTCHours(), endTime.getUTCMinutes() );

		this.props.inputHandler({
			name,
			startsAt,
			endsAt,
			location,
		});
	}

	submitForm = (data) => {
		console.log("Model: ", data);
		// call inputHandler
	}

	render() {
		return (
		<section>
			<Formsy.Form
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.submitForm}
      >

           <FormsyText
            name='title'
            validations='isExisty'
            validationError={this.errorMessages.title}
            required
            hintText="Cat Lover Meetup"
            floatingLabelText="Event Title" />

           <FormsyText
            name='location'
            validations='isAlphanumeric'
            validationError={this.errorMessages.title}
            required
            hintText="Mew Coworking"
            floatingLabelText="Location" />

          <FormsyDate
            name='date'
            required
            floatingLabelText="Date" />
{/*
          <FormsyTime
            name='startTime'
            required
            format="24hr"
            floatingLabelText="Start Time" />

          <FormsyTime
            name='endTime'
            required
            format="24hr"
            floatingLabelText="End Time" />
*/}

		  <RaisedButton
		  	type="submit"
		  	label="Submit"
		  	primary={true}
		  	disabled={!this.state.canSubmit}
		  /> {/* show loading indicator here after submit */}
		 </Formsy.Form>

		</section>
		)
	}
}


			// <label>Title: 
			// 	<TextField
			// 	  hintText="Cat Lover Meetup"
			// 	  ref="name"
			// 	/>
			// </label>
			// <br />

			// <label>Location: 
			// 	<TextField
			// 	  hintText="Mew Coworking"
			// 	  ref="location"
			// 	/>
			// </label>
			// <br />

			// <DatePicker 
			// 	hintText="Portrait Dialog" 
			// 	autoOk={false}
			// 	ref="date"
			// />

			// <TimePicker
			//   format="24hr"
			//   hintText="24hr Format"
			//   ref="startTime"
			//   />

		 //  <TimePicker
		 //  	format="24hr"
		 //  	hintText="24hr Format"
		 //  	ref="endTime"
		 //  />


		  // <RaisedButton
		  // 	type="submit"
		  // 	label="Submit"
		  // 	onClick={this.onSubmit}
		  // 	primary={true}
		  // 	disabled={!this.state.canSubmit}
		  // />

	// dateHandler = (nill, date) => {
	// 	// Callback function that is fired when the date value changes. Since there is no particular event associated with the change the first argument will always be null and the second argument will be the new Date instance.
	// 	this.inputHandler();
	// }


	// inputHandler = (e) => {
	// 	if (e) e.preventDefault();

	// 	const name = this.refs["name"].getValue();
	// 	const date = this.refs["date"].getDate();
	// 	const startTime = this.refs["startTime"].getTime();
	// 	const endTime = this.refs["endTime"].getTime();
	// 	const location = this.refs["location"].getValue();

	// 	const startsAt = new Date( date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDay(), startTime.getUTCHours(), startTime.getUTCMinutes() );
	// 	const endsAt = new Date( date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDay(), endTime.getUTCHours(), endTime.getUTCMinutes() );
		
	// 	this.setState({
	// 		name,
	// 		date,
	// 		startTime,
	// 		endTime,
	// 		location,
	// 	});

	// 	this.props.inputHandler({
	// 		name,
	// 		startsAt,
	// 		endsAt,
	// 		location,
	// 	});
	// }