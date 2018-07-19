import Immutable from "immutable";
import {
  message
} from "antd";
import {
  data2
} from "../app/sample_data/dropData";

import {
  CHANGE_TEST,
  SAVE_CRITERIA,
  EMPTY_CRITERIA,
  REMOVE_ITEM_CRITERIA,
  UPDATE_TREE
} from "../actions/treeActions";
import {
  constructTree,
  findNodeByCriteria,
  removeCriteria
} from "./util";

const uuidv1 = require("uuid/v1");

const initState = {
  tree: constructTree(data2),
  select_criteria: []
};

const treeReducer = (state = Immutable.fromJS(initState), action) => {
  let arr;
  let new_arr;
  switch (action.type) {
    case CHANGE_TEST:
      return state.setIn(["tree", "id"], 5);

    case SAVE_CRITERIA:
      arr = state.get('select_criteria');
      new_arr = arr.push(action.payload);
      return state.set('select_criteria', Immutable.List(new_arr));

    case EMPTY_CRITERIA:
      return state.set('select_criteria', Immutable.List([]));

    case REMOVE_ITEM_CRITERIA:
      // filter out the element
      arr = state.get('select_criteria').toJS();
      new_arr = arr.filter(
        (e) => e.criteria_id !== action.payload.criteria_id
      );
      console.log(new_arr)
      return state.set('select_criteria', Immutable.List(new_arr));

    case UPDATE_TREE:
      // get a clone of root tree
      let copy_root = JSON.parse(JSON.stringify(state.get('tree')));
      let target = findSubTree(action.payload, copy_root);
      console.log(target);
      console.log(action.payload)
      target.values = action.payload.values;
      target.children = action.payload.children;
      target.subFilter = action.payload.subFilter;
      console.log(copy_root)
      return state.set('tree', Immutable.fromJS(copy_root));

    default:
      return state;
  }
};


/**
 * recursively loop over node and return the reference to root with id same as target_tree
 */
const findSubTree = (target_tree, root) => {
  if (target_tree.id === root.id) {
    return root;
  }
  // find node with subfilter
  let node = findNodeWithSubFilter(root);
  if (node) {
    let arr = node.subFilter.map((sub_tree) => {
      return findSubTree(target_tree, sub_tree)
    });
    let ret = arr.reduce((acc, curr) => {
      return acc || curr;
    });
    return ret;
  }
  return;
}

/**
 * recursively loop over node and return the node with subfilter in it
 */
const findNodeWithSubFilter = (node) => {
  if (node.subFilter.length) {
    return node;
  } else {
    if (node.children.length) {
      let arr = node.children.map((n) => {
        return findNodeWithSubFilter(n);
      });
      let ret = arr.reduce((acc, curr) => {
        return acc || curr;
      });
      return ret;
    }
    return;
  }
}

// modifiy on root and return it
const createAnd = (currentTree, select_criteria, root) => {
  let target;
  if (root.id === currentTree.id) {
    target = root;
  } else {
    // find currentTree in root and return reference to it,
    // we going to modify on reference
    target = findSubTree(currentTree, root);
  }
  if (select_criteria.length > 1) {
    const found_node = findNodeByCriteria(
      target,
      select_criteria[0]
    );
    if (
      (found_node.children.length && found_node.values.length > 2) ||
      select_criteria.length !== found_node.values.length ||
      (select_criteria.length === found_node.values.length &&
        found_node.children.length) ||
      (select_criteria.length === found_node.values.length &&
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
      select_criteria.forEach((criteria) => {
        new_node.values.push(criteria);
        removeCriteria(criteria, found_node, false);
      });
      found_node.children.push(new_node);
      new_node.parent_id = found_node.id;
      return root;
    } else {
      message.warn("Action forbidden: illegal operation");
    }
  } else {
    message.warn(
      "Action forbidden: You need at least two criterias on the operation"
    );
  }
}

export default treeReducer;