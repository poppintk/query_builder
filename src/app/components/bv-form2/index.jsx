import React, { Component } from "react";
import "./index.css";

export default class BvForm2 extends Component {
  render() {
    return (
      <div
        className="container1"
        {...this.props}
        footer={undefined}
        visible={undefined}
        onClick={undefined}
        role="presentation"
      >
        <div className="titleStyle">{this.props.title || "Sample Title"}</div>
        <div className="bodyStyle">{this.props.chilren}</div>
      </div>
    );
  }
}
