// import React, { Component } from "react";
// import ReactDOM from "react-dom";

// export default class BlazeTemplProps extends Component {
//     componentDidMount: function() {
//         var componentRoot = ReactDOM.findDOMNode(this);
//         var parentNode = componentRoot.parentNode;
//         parentNode.removeChild(componentRoot);
//         var data = {};
//         _.each(this.props, function (val, key) {
//             if (key.lastIndexOf('btp-', 0) === 0)
//                 data[key.slice(4)] = val;
//         });
//         return Blaze.renderWithData(this.props.template, data, parentNode);
//     },
//     render: function(template) {
//         return (<div />)
//     }
// }

/* global Blaze */
import React, {component} from 'react';
import ReactDOM from 'react-dom';

export default class BlazeTemplProps extends React.Component {
  static propTypes = {
    template: React.PropTypes.any.isRequired,
    component: React.PropTypes.any,
  }
  static defaultProps = {
    component: 'div',
  }
  // we don't want to re-render this component if parent changes
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
        let data = {};
        _.each(this.props, function (val, key) {
            if (key.lastIndexOf('btp-', 0) === 0)
                data[key.slice(4)] = val;
        });
        console.log("data from BlazeTemplProps: ", data);
    this.view = Blaze.renderWithData(this.props.template, data, ReactDOM.findDOMNode(this.refs.root));
  }
  componentWillUnmount() {
    Blaze.remove(this.view);
  }
  render() {
    let {component, ...props} = this.props;
    props.ref = 'root';
    return React.createElement(component, props);
  }
}