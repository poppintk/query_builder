import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Icon, Switch, Button } from "antd";
import BvModal from "./components/bv-modal";
import DropPanel from "./dropPanel";
import DragPanel from "./dragPanel";
import BvForm from "./components/bv-form";

let offset_top = 100;
let offset_left = 0;

export default class SubFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSub: false,
      showPanel: false,
    };
    this.onCancel = this.onCancel.bind(this);
    this.showSubFilterEditor = this.showSubFilterEditor.bind(this);
    this.onChange = this.onChange.bind(this);
    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.deleteSubfilter = this.deleteSubfilter.bind(this);
  }
  componentDidMount() {
    // offset = offset + 100;
    offset_top = offset_top + 30;
    offset_left += 20;
  }
  componentWillUnmount() {
    offset_top = offset_top - 30;
    offset_left -= 20;
  }

  onCancel(e) {
    e.stopPropagation();
    this.setState({ showSub: false });
  }

  onChange(checked) {
    this.setState({ showPanel: checked });
  }

  showSubFilterEditor(e) {
    e.stopPropagation();
    this.setState({ showSub: true });
  }

  dragStartHandler(e) {
    e.stopPropagation();
    e.dataTransfer.setData("item", JSON.stringify({ ...this.props.root }));
  }

  deleteSubfilter(e) {
    console.log("delete subFilter");
    this.props.removeSubfilter();
  }

  render() {
    const h = 500;
    const editableHeader = (
      <div style={{ display: "flex", height: 20 }} id="undropable">
        <Button title="Test filter" icon="filter" style={{ height: 19 }} />
        <Button
          title="Build SQL"
          style={{
            height: 19,
            paddingLeft: 5,
            paddingRight: 5,
            marginLeft: 10,
          }}
          onClick={(e) => console.log(e)}
        >
          SQL
        </Button>
        <Button
          title="create AND relation"
          style={{
            height: 19,
            paddingLeft: 5,
            paddingRight: 5,
            marginLeft: 10,
          }}
          onClick={(e) => this.ref.createAnd()}
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
    const editableBody = (
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
          editable={true}
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
    // RETURN
    return (
      <div
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}
        role="presentation"
      >
        {/* non -editable */}
        <BvForm
          title={
            <NonEditableTitle
              onChange={this.onChange}
              showSubFilterEditor={this.showSubFilterEditor}
              deleteSubfilter={this.deleteSubfilter}
              editable={this.props.editable}
              dragStartHandler={this.dragStartHandler}
            />
          }
          titlestyle={{ textAlign: "left", paddingLeft: 5 }}
          body={
            <NonEditableBody
              root={this.props.root}
              showPanel={this.state.showPanel}
              editable={this.props.editable}
            />
          }
        />
        {/* editable */}
        <BvModal
          header={editableHeader}
          title="Sub Filter Editor"
          style={{
            width: 800,
            position: "relative",
            left: offset_left,
            top: offset_top,
          }}
          visible={this.state.showSub}
          onCancel={this.onCancel}
        >
          {editableBody}
        </BvModal>
      </div>
    );
  }
}

const NonEditableTitle = (props) => {
  return (
    <div
      draggable={props.editable ? "true" : "false"}
      onDragStart={props.dragStartHandler}
    >
      {"  Has (Sub-Filter Object Name)  "}
      {props.editable && (
        <span style={{ float: "right" }}>
          <Switch
            onChange={(e) => props.onChange(e)}
            size="small"
            title="show/hiden collasp"
          />
          <Icon
            type="edit"
            title="edit"
            style={{ cursor: "pointer", marginLeft: 5 }}
            onClick={(e) => props.showSubFilterEditor(e)}
          />
          <Icon
            type="delete"
            title="delete"
            style={{ cursor: "pointer", marginLeft: 5 }}
            onClick={(e) => props.deleteSubfilter(e)}
          />
        </span>
      )}
    </div>
  );
};

const NonEditableBody = (props) => {
  return (
    <div>
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        transitionAppearTimeout={300}
      >
        {props.showPanel && (
          <DropPanel
            editable={false}
            root={props.root}
            style={{
              height: "auto",
              maxHeight: 300,
              overflow: "auto",
            }}
          />
        )}
      </ReactCSSTransitionGroup>
    </div>
  );
};
