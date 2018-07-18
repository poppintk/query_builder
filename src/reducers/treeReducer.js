import Immutable from "immutable";
import {
  message
} from "antd";
import {
  data2
} from "../app/sample_data/dropData";

import {
  CHANGE_TEST,
  CREATE_AND_RELATION,
  SAVE_CRITERIA,
  EMPTY_CRITERIA,
  REMOVE_ITEM_CRITERIA,
} from "../actions/treeActions";
import {
  constructTree,
  findNodeByCriteria,
  removeCriteria,
  findSubTreePath
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
      console.log(new_arr.toJS())
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

    case CREATE_AND_RELATION:
      arr = state.get('select_criteria');
      let root = state.get('tree').toJS();
      // clone to root
      let newRoot = JSON.parse(JSON.stringify(root))

      let update_tree;
      update_tree = createAnd(action.payload.tree, arr.toJS(), newRoot);
      if (update_tree) {
        return state.set('select_criteria', Immutable.List([])).set('tree', Immutable.fromJS(update_tree));
      } else {
        return state;
      }

    default:
      return state;
  }
};


/**SubFilter
 * TODO bugs
 */

const findSubTree = (currentTree, root) => {
  if (root.id === currentTree.id) {
    return root;
  }
  let arr;
  if (root.children.length) {
    arr = root.children.map((c) => {
      return findSubTree(currentTree, c);
    });
    return arr.reduce((acc, curr) => {
      return acc || curr;
    });

  }

  if (root.subFilter.length) {
    arr = root.subFilter.map((c) => {
      return findSubTree(currentTree, c);
    });
    return arr.reduce((acc, curr) => {
      return acc || curr;
    });
  }

}

// modifiy on root and return it
const createAnd = (currentTree, select_criteria, root) => {
  let target;
  if (root.id === currentTree.id) {
    target = root;
  } else {
    // find currentTree in root and return it
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