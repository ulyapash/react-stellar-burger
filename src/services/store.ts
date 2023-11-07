import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

import { rootReducer } from "./reducers/rootReducer";
import { socketMiddleware } from "../middlewares/socket";
import { TSocket, TWSActions } from "./actions/socketActions";

const wsActions: TWSActions = {
  init: TSocket.SOCKET_CONNECTION_START,
  onOpen: TSocket.SOCKET_CONNECTION_SUCCESS,
  onError: TSocket.SOCKET_CONNECTION_ERROR,
  onClose: TSocket.SOCKET_CONNECTION_CLOSE,
  onMessage: TSocket.SOCKET_GET_MESSAGE,
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsActions)))
);
