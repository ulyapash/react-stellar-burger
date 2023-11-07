import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

import { rootReducer } from "./reducers/rootReducer";
import { socketMiddleware } from "../middlewares/socket";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware()))
);
