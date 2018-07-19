import {
    connect
} from "react-redux";
import {
    bindActionCreators
} from "redux";
import SubFilter from "../app/SubFilter";
import {
    updateTree
} from "../actions/treeActions";

// const mapStateToProps = (state) => {
//     return {
//         root: state.treeReducer.get("tree"),
//     };
// };
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            updateTree
        },
        dispatch
    );
};

export default connect(
    undefined,
    mapDispatchToProps
)(SubFilter);