import Immutable from "immutable";

import { data2 } from "../app/sample_data/dropData";
import { constructTree } from "./util";
import { CHANGE_TEST } from "../actions/treeActions";

const initState = { tree: constructTree(data2) };

const treeReducer = (state = Immutable.fromJS(initState), action) => {
  switch (action.type) {
    case CHANGE_TEST:
      return state.setIn(["tree", "id"], 5);
    default:
      return state;
  }
};

export default treeReducer;
