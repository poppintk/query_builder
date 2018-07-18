import {
    connect
} from "react-redux";
import {
    bindActionCreators
} from "redux";
import SubFilter from "../app/SubFilter";
import {
    createAndRelation
} from "../actions/treeActions";

// const mapStateToProps = (state) => {
//     return {
//         root: state.treeReducer.get("tree"),
//     };
// };
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            createAndRelation
        },
        dispatch
    );
};

export default connect(
    undefined,
    mapDispatchToProps
)(SubFilter);