export const CHANGE_TEST = "CHANGE_TEST";

export const CREATE_AND_RELATION = "CREATE_AND_RELATION";
export const SAVE_CRITERIA = "SAVE_CRITERIA";
export const EMPTY_CRITERIA = "EMPTY_CRITERIA";
export const REMOVE_ITEM_CRITERIA = "REMOVE_ITEM_CRITERIA"

export const changeTest = (num) => {
  return {
    type: CHANGE_TEST,
    payload: num,
    error: null,
  };
};

export const saveSelectedCriteria = (criteria) => {
  return {
    type: SAVE_CRITERIA,
    payload: criteria,
    error: null,
  }
};
export const emptySelectedCriteria = () => {
  return {
    type: EMPTY_CRITERIA,
    payload: null,
    error: null,
  }
};
export const removeSelectedCriteria = (criteria) => {
  return {
    type: REMOVE_ITEM_CRITERIA,
    payload: criteria,
    error: null,
  }
}

export const createAndRelation = (tree, select_criteria) => {
  return {
    type: CREATE_AND_RELATION,
    payload: {
      tree,
      select_criteria
    },
    error: null,
  }
}