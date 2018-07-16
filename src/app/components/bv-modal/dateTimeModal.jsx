import React, { Component } from "react";
import { Radio, DatePicker } from "antd";
import BvModal from ".";

const DateTimeModal = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          style={{ width: 400 }}
          title="Date/Time Value"
        >
          <div style={{ margin: 10 }}>
            <label>Criteria name:</label>
            <br />
            <input
              style={{ width: "100%" }}
              disabled={this.props.criteria_name ? "true" : ""}
              placeholder="Create Date Time"
            />
          </div>
          <div style={{ margin: 10 }}>
            <label>Expression:</label>
            <br />
            <select style={{ width: "100%", height: 27 }}>
              <option value="volvo">Equal</option>
              <option value="Not Equal">Not Equal</option>
              <option value="Less">Less</option>
              <option value="Greater">Greater</option>
              <option value="Greater">Less Or Equal</option>
              <option value="Greater">Greater Or Equal</option>
              <option value="Greater">between</option>
              <option value="Greater">is Empty</option>
              <option value="Greater">is Not Empty</option>
            </select>
          </div>
          <div style={{ margin: 10 }}>
            <label>Criteria value:</label>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  border: "1px solid",
                  borderColor: "rgb(255, 173, 210)",
                  flex: 1,
                  margin: 5,
                }}
              >
                <Radio
                  defaultChecked={false}
                  style={{ marginLeft: 5, marginTop: 10 }}
                >
                  Exact
                </Radio>
                <Radio
                  defaultChecked={false}
                  style={{ marginLeft: 5, marginBottom: 10 }}
                >
                  Relative to Today
                </Radio>
              </div>
              <div
                style={{
                  border: "1px solid",
                  borderColor: "rgb(255, 173, 210)",
                  flex: 1,
                  margin: 5,
                }}
              >
                <Radio
                  defaultChecked={false}
                  style={{ marginLeft: 5, marginTop: 10 }}
                >
                  Date
                </Radio>
                <Radio
                  defaultChecked={false}
                  style={{ marginLeft: 5, marginBottom: 10 }}
                >
                  Date and Time
                </Radio>
              </div>
            </div>
            <DatePicker />
          </div>
        </WrappedComponent>
      );
    }
  };
};

export default DateTimeModal(BvModal);
