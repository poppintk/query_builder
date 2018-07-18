import {
    connect
} from "react-redux";
import {
    bindActionCreators
} from "redux";
import DropPanel from "../app/dropPanel";
import {
    saveSelectedCriteria,
    emptySelectedCriteria,
    removeSelectedCriteria
} from "../actions/treeActions";

const mapStateToProps = (state) => {
    return {
        select_criteria: state.treeReducer.get("select_criteria").toJS(),
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            saveSelectedCriteria,
            emptySelectedCriteria,
            removeSelectedCriteria
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DropPanel);