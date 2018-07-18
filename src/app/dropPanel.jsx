import React, { Component } from "react";
import { message } from "antd";
import CommonPanel from "./components/CommonPanel";
import Node from "./model/node";
import CriteriaComponent from "../containers/criteriaComponentCtn";
import ShowModal from "./component-selector/selectModal";

import SubFilter from "../containers/subFilterCtn";
const uuidv1 = require("uuid/v1");

export default class DropPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      sql: null,
      tree_copy: this.copyTree(this.props.root),
    };

    this.deleteHandler = this.deleteHandler.bind(this);
    this.isCheckable = this.isCheckable.bind(this);
    this.restoreTree = this.restoreTree.bind(this);
    this.updateTree = this.updateTree.bind(this);
    this.getCurrentTree = this.getCurrentTree.bind(this);

    this.dragOverHandler = this.dragOverHandler.bind(this);
    this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
    this.updateDropPanel = this.updateDropPanel.bind(this);
    this.createAnd = this.createAnd.bind(this);
  }

  componentWillUnmount() {
    this.props.emptySelectedCriteria();
  }
  componentWillMount() {
    this.props.emptySelectedCriteria();
  }

  copyTree(tree) {
    return JSON.parse(JSON.stringify(tree));
  }

  restoreTree() {
    this.setState({ tree_copy: this.copyTree(this.props.root) });
  }

  getCurrentTree() {
    return this.props.root;
  }

  updateTree(tree) {
    console.log(tree);
  }

  createAnd() {
    if (this.props.select_criteria.length > 1) {
      const found_node = this.findNodeByCriteria(
        this.props.root,
        this.props.select_criteria[0]
      );
      if (
        (found_node.children.length && found_node.values.length > 2) ||
        this.props.select_criteria.length !== found_node.values.length ||
        (this.props.select_criteria.length === found_node.values.length &&
          found_node.children.length) ||
        (this.props.select_criteria.length === found_node.values.length &&
          found_node.subFilter.length)
      ) {
        //new node
        const new_node = {};
        new_node.values = [];
        new_node.children = [];
        new_node.subFilter = [];
        new_node.relation_type = "and";
        new_node.id = uuidv1();
        // remove each criteria in select_criteria from found_node
        this.props.select_criteria.forEach((criteria) => {
          new_node.values.push(criteria);
          this.removeCriteria(criteria, found_node, false);
        });
        found_node.children.push(new_node);
        new_node.parent_id = found_node.id;
        console.log(found_node);
        this.forceUpdate();
      } else {
        message.warn("Action forbidden: illegal operation");
      }
    } else {
      message.warn(
        "Action forbidden: You need at least two criterias on the operation"
      );
    }
  }

  /**
   * Given node object, return true if selected node in same level of tree
   * => has same node_id
   * Note: Trigger in child component
   */
  isCheckable(node) {
    if (!this.props.select_criteria.length) {
      return true;
    } else {
      let res = this.findNodeByCriteria(
        this.props.root,
        this.props.select_criteria[0]
      );
      if (res.id === node.id) {
        return true;
      } else {
        message.warn("Action forbidden: You might need to deselect all");
        return false;
      }
    }
  }

  /**
   * Remove criteria(value) from given node.values in node object
   */
  deleteHandler(node, criteria) {
    console.log("delete");
    this.removeCriteria(criteria, node);
    // after move, if tree has no children and values, delete this
    if (
      !this.props.root.children.length &&
      !this.props.root.values.length &&
      !this.props.root.subFilter.length
    ) {
      this.setState({ tree_copy: null });
      console.log(this.state.tree_copy);
    }
    this.forceUpdate();
  }

  /**
   *  Generate SQL string base on current tree nodes
   * @param node Tree object
   */
  buildSQL(node, res = "SELECT (???) FROM (????) WHERE ") {
    let valueString = "";
    node.values.forEach((v, k) => {
      valueString += `${v.criteria_id}${v.expression}${v.value}`;
      if (k + 1 !== node.values.length) {
        valueString += ` ${node.relation_type} `;
      }
    });
    // has chidlren node
    if (node.children.length) {
      node.children.forEach((n, k) => {
        if (!valueString) {
          valueString += ` ( ${this.buildSQL(n, "")} )`;
        } else {
          valueString += ` ${node.relation_type} (${this.buildSQL(n, "")})`;
        }
      });
    }
    res += valueString;
    return res;
  }

  updateDropPanel() {
    this.forceUpdate();
  }

  dropHandler(e, destNode) {
    if (this.props.editable === false) {
      return;
    }
    e.stopPropagation();
    let dragItem;
    let data = e.dataTransfer.getData("item");
    // Drag from left DragPanel
    if (!data) {
      try {
        //show modal
        this.setState({ visible: true });
        this.dragpanel_data = JSON.parse(e.dataTransfer.getData("dragpanel"));
        this.destNode = destNode;

        //TODO: call backend api generate a id
      } catch (err) {
        console.log(err);
      }
    } else if (data && destNode) {
      // Drag from DropPanel

      dragItem = JSON.parse(data);
      let found_node;
      // if drag item has criteria id => drag from critera
      if (dragItem.criteria_id) {
        // console.log('---------------');
        // console.log(dragItem);
        // console.log(destNode);
        found_node = this.findNodeByCriteria(this.props.root, dragItem);
        if (found_node.id !== destNode.id) {
          // remove dragItem from tree
          this.removeCriteria(dragItem, found_node);
          // adding dragItem(src) to destination
          destNode.values.push(dragItem);
        }
      } else {
        // drag from subFilter
        found_node = this.findNodeBySubfilter(this.props.root, dragItem);
        if (found_node.id !== destNode.id) {
          // remove dragItem from tree
          this.removeSubfilter(dragItem, found_node);
          // adding dragItem(src) to destination
          destNode.subFilter.push(dragItem);
        }
      }
    }

    e.currentTarget.style.backgroundColor = "white";
    this.forceUpdate();
  }

  dragOverHandler(e) {
    if (
      e.target.className === "wrap-box" ||
      e.target.className === "ant-collapse-header" ||
      e.target.className ===
        "ant-collapse-content ant-collapse-content-active" ||
      e.target.className === "ant-collapse-content-box" ||
      e.target.className === "drag-element" ||
      this.props.editable === false
    ) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.style.backgroundColor = "rgb(217, 221, 226)";
  }

  dragLeaveHandler(e) {
    e.stopPropagation();
    e.currentTarget.style.backgroundColor = "white";
  }

  /**
   * @param node Tree object
   * @param criteria Criteria object
   * return node with given criteria
   */
  findNodeByCriteria(node, criteria) {
    let res = node.values.find((v) => v.criteria_id === criteria.criteria_id);
    if (res) {
      return node;
    } else {
      if (node.children.length) {
        let arr = node.children.map((n) => {
          return this.findNodeByCriteria(n, criteria);
        });
        return arr.reduce((acc, curr) => {
          return acc || curr;
        });
      }
      return res;
    }
  }

  /**
   * @param node Tree object
   * @param subFilter Criteria object
   * return node with given subfilter
   */
  findNodeBySubfilter(node, subFilter) {
    let res = node.subFilter.find((s) => s.id === subFilter.id);
    if (res) {
      return node;
    } else {
      if (node.children.length) {
        let arr = node.children.map((n) => {
          return this.findNodeBySubfilter(n, subFilter);
        });
        let ret = arr.reduce((acc, curr) => {
          return acc || curr;
        });
        return ret;
      }
      return res;
    }
  }

  /**
   * @param value Criteria object
   * @param found_node Node object
   * @param allow_merge boolean
   * Romove criteria(value) from given node.
   * it manages all cases after move reqiures merge
   */
  removeCriteria(value, found_node, allow_merge = true) {
    if (found_node) {
      let index = found_node.values.findIndex(
        (v) => v.criteria_id === value.criteria_id
      );
      found_node.values.splice(index, 1);

      if (allow_merge) {
        // find parent Node
        let parent_node = this.findParentNode(
          this.props.root,
          found_node.parent_id
        );

        // after moving if node.values has only one criteria and no nested children node and no subFilter
        // => merge to it's parent node's values
        if (
          found_node.values.length === 1 &&
          !found_node.children.length &&
          !found_node.subFilter.length
        ) {
          // pop out last element
          let value = found_node.values.pop();

          parent_node.values.push(value);

          // delete the empty node from parent
          parent_node.children = parent_node.children.filter((n) => {
            return n.id !== found_node.id;
          });
        }
        // continue check if after moving, a node does not have any criteria and no subFliter and
        // only one node in it's chidlren => merge to parent
        if (
          !found_node.values.length &&
          !found_node.subFilter.length &&
          found_node.children.length === 1
        ) {
          console.log("triggered");
          // delete the empty node from parent
          // Note: we just replace found_node's children node with
          // found_node (replace everything but not parent_id)
          let child_node = found_node.children[0];
          found_node.id = child_node.id;
          found_node.relation_type = child_node.relation_type;
          found_node.children = child_node.children;
          found_node.values = child_node.values;
          found_node.subFilter = child_node.subFilter;
        }
        // continue check if after moving, a node does not have any criteria and values has only one criteria
        // only one criteria in it's subFilter => merge to parent
        if (
          !found_node.values.length &&
          !found_node.children.length &&
          found_node.subFilter.length === 1
        ) {
          console.log("triggered 2");
          // pop out last element
          let subTree = found_node.subFilter.pop();

          parent_node.subFilter.push(subTree);

          // delete the empty node from parent
          parent_node.children = parent_node.children.filter((n) => {
            return n.id !== found_node.id;
          });
        }
      }
    }
  }

  /**
   * @param sub Tree object
   * @param found_node Node object
   * @param allow_merge boolean
   * Romove Sub Filter(Tree) from given node.
   * it manages all cases after move reqiures merge
   */
  removeSubfilter(sub, found_node, allow_merge = true) {
    if (found_node) {
      let index = found_node.subFilter.findIndex((s) => s.id === sub.id);
      found_node.subFilter.splice(index, 1);

      if (allow_merge) {
        // find parent Node
        let parent_node = this.findParentNode(
          this.props.root,
          found_node.parent_id
        );

        // after moving if node.values has only one criteria and no nested children node and no subFilter
        // => merge to it's parent node's values
        if (
          found_node.values.length === 1 &&
          !found_node.children.length &&
          !found_node.subFilter.length
        ) {
          // pop out last element
          let value = found_node.values.pop();

          parent_node.values.push(value);

          // delete the empty node from parent
          parent_node.children = parent_node.children.filter((n) => {
            return n.id !== found_node.id;
          });
        }
        // continue check if after moving, a node does not have any criteria and no subFliter and
        // only one node in it's chidlren => merge to parent
        if (
          !found_node.values.length &&
          !found_node.subFilter.length &&
          found_node.children.length === 1
        ) {
          console.log("triggered");
          // delete the empty node from parent
          // Note: we just replace found_node's children node with
          // found_node (replace everything but not parent_id)
          let child_node = found_node.children[0];
          found_node.id = child_node.id;
          found_node.relation_type = child_node.relation_type;
          found_node.children = child_node.children;
          found_node.values = child_node.values;

          found_node.subFilter = child_node.subFilter;
        }
        // continue check if after moving, a node does not have any criteria and values has only one criteria
        // only one criteria in it's subFilter => merge to parent
        if (
          !found_node.values.length &&
          !found_node.children.length &&
          found_node.subFilter.length === 1
        ) {
          console.log("triggered 2");
          // pop out last element
          let subTree = found_node.subFilter.pop();

          parent_node.subFilter.push(subTree);

          // delete the empty node from parent
          parent_node.children = parent_node.children.filter((n) => {
            return n.id !== found_node.id;
          });
        }
      }
    }
  }
  /**
   * @param node Tree object
   * @param parent_id integer
   *
   * Return parent node
   *
   */
  findParentNode(node, parent_id) {
    if (parent_id === 0) {
      return node;
    }
    let res = node.id === parent_id;
    if (res) {
      return node;
    } else {
      if (node.children.length) {
        let arr = node.children.map((n) => {
          return this.findParentNode(n, parent_id);
        });

        return arr.reduce((acc, curr) => {
          return acc || curr;
        });
      }
      return res;
    }
  }

  /**
   * @param node Tree object
   * Recursive function: render the tree
   */
  display(node) {
    const relationTypeStyle = {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      flexDirection: "column",
      padding: 5,
      fontWeight: "bold",
      cursor: this.props.editable ? "pointer" : "context-menu",
    };

    const bracketStyle = {
      border: "1px solid",
      borderRight: "none",
      width: 10,
      borderColor: "#ffadd2",
    };

    const getCriteriaComponent = (node) => {
      return node.values.map((v, k) => {
        return (
          <CriteriaComponent
            editable={this.props.editable}
            key={k}
            value={v}
            deleteHandler={() => this.deleteHandler(node, v)}
            isCheckable={() => this.isCheckable(node)}
            updateDropPanel={() => this.updateDropPanel()}
          >
            {v.criteria_id}
            {v.expression}
            {v.value}
          </CriteriaComponent>
        );
      });
    };

    const getSubFilter = (node) => {
      if (node.subFilter.length) {
        return node.subFilter.map((n, k) => {
          return (
            <SubFilter
              updateTree={() => this.updateTree(n)}
              root={n}
              key={k}
              editable={this.props.editable}
              removeSubfilter={() => {
                this.removeSubfilter(n, node);
                // after move, if tree has no children and values, delete this
                if (
                  !this.props.root.children.length &&
                  !this.props.root.values.length &&
                  !this.props.root.subFilter.length
                ) {
                  this.setState({ tree_copy: null });
                  console.log(this.state.tree_copy);
                }
                this.forceUpdate();
              }}
            />
          );
        });
      }
    };

    if (node.children.length && node.values) {
      return (
        <div
          style={{ display: "flex" }}
          onDragOver={(e) => this.dragOverHandler(e)}
          onDrop={(e) => {
            this.dropHandler(e, node);
          }}
          onDragLeave={(e) => this.dragLeaveHandler(e)}
        >
          <div
            style={relationTypeStyle}
            onDoubleClick={(e) => {
              if (this.props.editable) {
                node.relation_type =
                  node.relation_type === "and" ? "or" : "and";
                console.log(node.relation_type);
                this.forceUpdate();
              }
            }}
          >
            {node.relation_type && node.relation_type.toUpperCase()}
            <br />
            {node.id}
          </div>
          <div style={bracketStyle} />
          <div style={{ marginLeft: 10, width: "100%" }}>
            {node.children.map((n, k) => {
              return (
                <div style={{ margin: "5px 0px 5px 0px" }} key={k}>
                  {this.display(n)}
                </div>
              );
            })}
            {getCriteriaComponent(node)}
            {getSubFilter(node)}
          </div>
        </div>
      );
    }

    if (node.children.length) {
      return (
        <div style={{ display: "flex" }}>
          <div
            style={relationTypeStyle}
            onDoubleClick={(e) => {
              if (this.props.editable) {
                node.relation_type =
                  node.relation_type === "and" ? "or" : "and";
                console.log(node.relation_type);
                this.forceUpdate();
              }
            }}
          >
            {node.relation_type && node.relation_type.toUpperCase()}
            <br />
            {node.id}
          </div>
          <div style={bracketStyle} />
          <div style={{ marginLeft: 10, width: "100%" }}>
            {node.children.map((n, k) => {
              return (
                <div style={{ margin: "5px 0px 5px 0px" }} key={k}>
                  {this.display(n)}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    if (node.values) {
      // show node
      return (
        <div
          style={{ display: "flex" }}
          onDragOver={(e) => this.dragOverHandler(e)}
          onDrop={(e) => {
            this.dropHandler(e, node);
          }}
          onDragLeave={(e) => this.dragLeaveHandler(e)}
        >
          <div
            style={relationTypeStyle}
            onDoubleClick={(e) => {
              if (this.props.editable) {
                node.relation_type =
                  node.relation_type === "and" ? "or" : "and";
                console.log(node.relation_type);
                this.forceUpdate();
              }
            }}
          >
            {node.relation_type && node.relation_type.toUpperCase()}
            <br />
            {node.id}
          </div>
          <div style={bracketStyle} />
          <div style={{ width: "100%", marginLeft: 10 }}>
            {getCriteriaComponent(node)}
            {getSubFilter(node)}
          </div>
        </div>
      );
    }
  }

  /**
   * Render function
   */
  render() {
    console.log(this.props);
    return (
      <CommonPanel
        style={{ ...this.props.style }}
        editable={this.props.editable.toString()}
        onDragOver={(e) => this.dragOverHandler(e)}
        onDrop={(e) => this.dropHandler(e)}
        onDragLeave={(e) => this.dragLeaveHandler(e)}
      >
        <div style={{ margin: "5%", width: "90%" }}>
          {this.props.root && this.display(this.props.root)}
        </div>
        {this.props.editable && (
          <ShowModal
            title="Basic Modal"
            visible={this.state.visible}
            onCancel={(e) => this.setState({ visible: false })}
            criteria_type={this.dragpanel_data && this.dragpanel_data.type}
            create_criteria={(crieria) => {
              this.destNode.values.push({
                id: uuidv1(),
                criteria_id: uuidv1(),
                expression: crieria.criteria_expr,
                type: crieria.criteria_type,
                value: crieria.criteria_value,
              });
              this.forceUpdate();
            }}
            width={300}
          >
            <input />
          </ShowModal>
        )}
      </CommonPanel>
    );
  }
}

DropPanel.defaultProps = {
  editable: true,
};
