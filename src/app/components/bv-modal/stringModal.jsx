import React, { Component } from "react";
import BvModal from ".";

const StringModal = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          style={{ width: 400 }}
          title="String Value"
        >
          <div style={{ margin: 10 }}>
            <label>Criteria name:</label>
            <br />
            <input
              style={{ width: "100%" }}
              disabled={this.props.criteria_name ? "true" : ""}
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
            <input style={{ width: "100%" }} />
          </div>
        </WrappedComponent>
      );
    }
  };
};

export default StringModal(BvModal);
