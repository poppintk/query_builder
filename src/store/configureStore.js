import { createStore, applyMiddleware, compose } from "redux";

import { createLogger } from "redux-logger";

import rootReducer from "../reducers";

const configureStore = () => {
  const loggerMiddleware = createLogger();

  const store = createStore(
    rootReducer,
    compose(applyMiddleware(loggerMiddleware))
  );

  return store;
};

export default configureStore;
