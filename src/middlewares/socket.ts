import type { Middleware, MiddlewareAPI } from "redux";

import { TSocket, TSocketActions } from "../services/actions/socketActions";

import { AppDispatch, RootState } from "../types/index";

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket;

    return (next) => (action: TSocketActions) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        SOCKET_CONNECTION_START: init,
        SOCKET_CONNECTION_SUCCESS: onOpen,
        SOCKET_CONNECTION_ERROR: onError,
        SOCKET_CONNECTION_CLOSE: onClose,
        SOCKET_GET_MESSAGE: onMessage,
      } = TSocket;

      if (type === init) {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = (e) => dispatch({ type: onOpen, payload: e });
        socket.onerror = (e) => dispatch({ type: onError, payload: e });
        socket.onmessage = (e) => {
          const { data } = e;
          const parsedData = JSON.parse(data);

          dispatch({
            type: onMessage,
            payload: parsedData,
          });
        };
        socket.onclose = (e) => dispatch({ type: onClose });
      }

      next(action);
    };
  }) as Middleware;
};
