import React, { Component } from "react";
import shallowCompare from "react-addons-shallow-compare";
import DragPanel from "./dragPanel";
import DropPanel from "../containers/dropPanelContainer";
import BvModal from "./components/bv-modal";
import { Button } from "antd";

export default class BvQueryBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = { show_form: true };
    this.onCancel = this.onCancel.bind(this);
  }

  onCancel() {
    this.setState({ show_form: false });
  }

  render() {
    const header = (
      <div style={{ display: "flex", height: 20 }}>
        <Button title="Test filter" icon="filter" style={{ height: 19 }} />
        <Button
          title="Build SQL"
          style={{
            height: 19,
            paddingLeft: 5,
            paddingRight: 5,
            marginLeft: 10,
          }}
        >
          SQL
        </Button>
        <Button
          title="Build SQL"
          style={{
            height: 19,
            paddingLeft: 5,
            paddingRight: 5,
            marginLeft: 10,
          }}
          onClick={(e) => {
            this.props.createAndRelation(this.props.root);
          }}
        >
          AND
        </Button>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          Condition
          <select style={{ height: 20 }}>
            <option value="volvo">Has</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      </div>
    );
    const h = 500;
    const body = (
      <div style={{ display: "flex", backgroundColor: "white" }}>
        <DragPanel
          style={{
            marginRight: "1px",
            width: 200,
            height: h,
            maxHeight: h,
            overflow: "auto",
          }}
        />
        <DropPanel
          root={this.props.root}
          ref={(ref) => (this.ref = ref)}
          style={{
            height: h,
            width: 600,
            maxHeight: h,
            overflow: "auto",
          }}
        />
      </div>
    );
    return (
      <BvModal
        header={header}
        title={"Filter Editor"}
        style={{ width: 800 }}
        visible={this.state.show_form}
        onCancel={this.onCancel}
      >
        {body}
      </BvModal>
    );
  }
}
