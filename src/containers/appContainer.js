import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BvQueryBuilder from "../app";
import { changeTest } from "../actions/treeActions";

const mapStateToProps = (state) => {
  return {
    root: state.treeReducer.get("tree"),
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeTest,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BvQueryBuilder);
