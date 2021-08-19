import { createStore, combineReducers, compose } from "redux";
import userReducer from "./reducers/user";

const enhancers = compose(
  typeof window !== "undefined" && window.devToolsExtension ? window.devToolsExtension() : (f) => f
);

const reducers = combineReducers({ userReducer });

export default createStore(reducers, enhancers);
