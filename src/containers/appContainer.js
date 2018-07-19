import {
  connect
} from "react-redux";
import {
  bindActionCreators
} from "redux";
import BvQueryBuilder from "../app";
import {
  changeTest,
  updateTree
} from "../actions/treeActions";

const mapStateToProps = (state) => {
  return {
    root: state.treeReducer.get("tree").toJS(),
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      changeTest,
      updateTree
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BvQueryBuilder);