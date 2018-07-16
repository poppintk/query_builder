import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.css";

export default class BvForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container" {...this.props} title={undefined}>
        {/* Header */}
        <div className="header" style={{ ...this.props.titlestyle }}>
          {this.props.title}
        </div>
        {/* Body */}
        <div className="body">{this.props.body}</div>
      </div>
    );
  }
}

BvForm.defaultProps = {
  title: "Sample Form",
  body: "Sample",
};

BvForm.propTypes = {
  title: PropTypes.any.isRequired,
  body: PropTypes.any.isRequired,
};
