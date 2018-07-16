import React, { Component } from "react";
import BvModal from ".";

const BooleanModal = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          style={{ width: 400 }}
          title="Boolean Value"
        >
          <div style={{ margin: 10 }}>
            <label>Criteria name:</label>
            <br />
            <input
              style={{ width: "100%" }}
              disabled={this.props.criteria_name ? "true" : ""}
              placeholder="Duration"
            />
          </div>
          <div style={{ margin: 10 }}>
            <label>Expression:</label>
            <br />
            <select style={{ width: "100%", height: 27 }}>
              <option value="volvo">Has</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div style={{ margin: 10 }}>
            <label>Criteria value:</label>
            <br />
            <input type="radio" /> Yes
            <input type="radio" style={{ marginLeft: 50 }} /> No
          </div>
        </WrappedComponent>
      );
    }
  };
};

export default BooleanModal(BvModal);
