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
  // We don't want to re-render this component if parent changes. Why?
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
    let data = {};
    _.each(this.props, function (val, key) {
        if (key.lastIndexOf('btp-', 0) === 0)
            data[key.slice(4)] = val;
    });
    // console.log("data from BlazeTemplProps: ", data);
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
