export const CHANGE_TEST = "CHANGE_TEST";

export const changeTest = (num) => {
  return {
    type: CHANGE_TEST,
    payload: num,
    error: null,
  };
};
