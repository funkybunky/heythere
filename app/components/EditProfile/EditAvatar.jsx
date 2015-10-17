
import React, { Component } from "react";
import AvatarEditor from "react-avatar-editor";
 
export default class EditAvatar extends Component {
	state = {

	}
  onClickSave = () => {
    var dataURL = this.refs.editor.getImage();
    // now save it to the state and set it as <img src="…" /> or send it somewhere else 
    this.props.getImage(dataURL);
  }
  render() {
    return (
        <AvatarEditor
          image="http://example.com/initialimage.jpg"
          width={250}
          height={250}
          border={50}
          scale={1.2} />
    );
  }
 
}