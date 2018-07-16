import React, { Component } from "react";
import { Icon } from "antd";
import ShowModal from "../component-selector/selectModal";

export default class CriteriaComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    this.componentRef.addEventListener("dragstart", (e) => {
      e.stopPropagation();
      e.dataTransfer.setData("item", JSON.stringify(this.props.value));
    });

    this.componentRef.addEventListener("mouseenter", (e) => {
      e.stopPropagation();
      e.currentTarget.style.backgroundColor = "#e8efff";
    });

    this.componentRef.addEventListener("mouseleave", (e) => {
      e.stopPropagation();
      e.currentTarget.style.backgroundColor = "#ccdbff";
    });
  }
  componentWillUpdate() {
    if (this.checkbox) {
      this.checkbox.checked = false;
    }
  }

  onChangeHandler(e) {
    // if current is checked
    if (e.currentTarget.checked) {
      // check whehter is checkable
      if (this.props.isCheckable()) {
        this.props.addSelectedList();
      } else {
        // not checkable
        e.currentTarget.checked = false;
      }
    } else {
      // unchecked
      this.props.removeSelectedList();
    }
  }

  render() {
    const iconStyle = { float: "right", padding: 3, cursor: "pointer" };
    return (
      <div
        ref={(ref) => {
          this.componentRef = ref;
        }}
        style={{
          paddingLeft: 10,
          margin: "5px 0px 5px 0px",
          borderRadius: "5px",
          backgroundColor: "#ccdbff",
          boxShadow: "0px 0px 1px grey",
          textAlign: "center",
          fontWeight: "bold",
          cursor: this.props.editable ? "move" : "context-menu",
          minWidth: 100,
          overflow: "hidden",
        }}
        draggable={this.props.editable}
      >
        {this.props.editable && (
          <input
            type="checkbox"
            style={{ float: "left", margin: 5 }}
            ref={(ref) => {
              this.checkbox = ref;
            }}
            onChange={this.onChangeHandler}
          />
        )}
        <ShowModal
          visible={this.state.isEditing}
          onCancel={(e) => this.setState({ isEditing: false })}
          width={300}
          criteria_name={this.props.value.id}
          criteria_expr={this.props.value.expression}
          criteria_value={this.props.value.value}
          criteria_type={this.props.value.type}
        />
        {this.props.children}
        {this.props.editable && (
          <span>
            <Icon
              type="delete"
              style={iconStyle}
              onClick={(e) => {
                this.props.deleteHandler();
              }}
            />
            <Icon
              type="edit"
              style={iconStyle}
              onClick={(e) => {
                this.setState({ isEditing: true });
              }}
            />
          </span>
        )}
      </div>
    );
  }
}

CriteriaComponent.defaultProps = {
  editable: true,
};
