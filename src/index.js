import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import "./index.css";
import BvQueryBuilder from "./containers/appContainer";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={configureStore()}>
    <BvQueryBuilder />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
