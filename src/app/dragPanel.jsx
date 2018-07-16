import React, { Component } from "react";
import CommonPanel from "./components/CommonPanel";
import dragableData from "./sample_data/dragableData";
import { Collapse } from "antd";
const { Panel } = Collapse;

export default class DragPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
  }

  dragStartHandler(e, subelement) {
    let object;
    if (subelement.column_id === "1") {
      object = { ...subelement, type: "integer" };
    } else if (subelement.column_id === "2") {
      object = { ...subelement, type: "string" };
    } else if (subelement.column_id === "3") {
      object = { ...subelement, type: "lookup" };
    } else if (subelement.column_id === "4") {
      object = { ...subelement, type: "duration" };
    } else if (subelement.column_id === "5") {
      object = { ...subelement, type: "boolean" };
    } else if (subelement.column_id === "6") {
      object = { ...subelement, type: "datetime" };
    }

    e.dataTransfer.setData("dragpanel", JSON.stringify(object));
  }

  mouseEnterHandler(e) {
    e.target.style.backgroundColor = "#e8efff";
  }

  mouseLeaveHandler(e) {
    e.target.style.backgroundColor = "#fff0f6";
  }

  render() {
    return (
      <CommonPanel {...this.props}>
        <Collapse defaultActiveKey={["2"]}>
          {dragableData.map((subTitle, k) => {
            const keyString = Object.keys(subTitle)[0];
            return (
              <Panel header={keyString} key={k}>
                {subTitle[keyString].map((subelement, k) => {
                  return (
                    <div
                      key={k}
                      style={{
                        border: "1px solid",
                        cursor: "move",
                        margin: 5,
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "#eb2f96",
                        background: "#fff0f6",
                        borderColor: "#ffadd2",
                      }}
                      draggable="true"
                      onDragStart={(e) => this.dragStartHandler(e, subelement)}
                      onMouseEnter={this.mouseEnterHandler}
                      onMouseLeave={this.mouseLeaveHandler}
                    >
                      {subelement.column_desc}
                    </div>
                  );
                })}
              </Panel>
            );
          })}
        </Collapse>
      </CommonPanel>
    );
  }
}
