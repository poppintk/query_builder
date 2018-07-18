import {
  connect
} from "react-redux";
import {
  bindActionCreators
} from "redux";
import BvQueryBuilder from "../app";
import {
  changeTest,
  createAndRelation
} from "../actions/treeActions";

const mapStateToProps = (state) => {
  return {
    root: state.treeReducer.get("tree").toJS(),
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      changeTest,
      createAndRelation
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BvQueryBuilder);