import React, { Component } from "react";
import BvModal from ".";
import { message } from "antd";

const IntegerModal = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        criteria_name: null,
        criteria_expr: "=",
        criteria_value: null,
      };
      this.onOk = this.onOk.bind(this);
    }

    onOk(e) {
      const { criteria_name, criteria_value, criteria_expr } = this.state;
      if (criteria_name && criteria_value) {
        this.props.create_criteria({
          criteria_name,
          criteria_expr,
          criteria_value,
        });
        this.props.onCancel();
        // reset state to null
        this.setState({ criteria_name: null, criteria_value: null });
      } else {
        message.warn("Action forbidden: There is property missing");
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          style={{ width: 400 }}
          title="Integer Value"
          onOk={this.onOk}
        >
          <div style={{ margin: 10 }}>
            <label>Criteria name:</label>
            <br />
            <input
              style={{ width: "100%" }}
              disabled={this.props.criteria_name ? "true" : ""}
              defaultValue={this.props.criteria_name}
              onChange={(e) => {
                this.setState({ criteria_name: e.target.value });
              }}
            />
          </div>
          <div style={{ margin: 10 }}>
            <label>Expression:</label>
            <br />
            <select
              style={{ width: "100%", height: 27 }}
              onChange={(e) => {
                this.setState({ criteria_expr: e.target.value });
              }}
            >
              <option value="=">equal</option>
              <option value=">">greater</option>
              <option value="<">less</option>
              <option value="has">has</option>
            </select>
          </div>
          <div style={{ margin: 10 }}>
            <label>Criteria value:</label>
            <br />
            <input
              style={{ width: "100%" }}
              defaultValue={this.props.criteria_value}
              onChange={(e) => {
                this.setState({ criteria_value: e.target.value });
              }}
            />
          </div>
        </WrappedComponent>
      );
    }
  };
};

export default IntegerModal(BvModal);
