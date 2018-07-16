import React, { Component } from "react";
import BvModal from ".";

const LookupModal = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          style={{ width: 400 }}
          title="Lookup Value"
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
            <select style={{ width: "60%", height: 27 }}>
              <option value="volvo">Has</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <label style={{ marginLeft: 5 }}>Show Archived: </label>
            <input type="checkbox" />
          </div>
          <div style={{ margin: 10 }}>
            <label>Criteria value:</label>
            <div>
              <label>Select Items:</label>
              <textarea rows="2" cols="50" style={{ width: "100%" }} />
              <label>Search:</label>
              <input style={{ width: 290 }} />
              <textarea
                rows="2"
                cols="50"
                style={{ width: "100%", marginTop: 5 }}
              />
            </div>
          </div>
        </WrappedComponent>
      );
    }
  };
};

export default LookupModal(BvModal);
