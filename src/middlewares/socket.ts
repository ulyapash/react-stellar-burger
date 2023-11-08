import type { Middleware, MiddlewareAPI } from "redux";

import { TSocketActions, TWSActions } from "../services/actions/socketActions";

import { AppDispatch, RootState } from "../types/index";

export const socketMiddleware = (wsActons: TWSActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket;

    return (next) => (action: TSocketActions) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        init,
        onOpen,
        onError,
        onClose,
        onMessage,
      } = wsActons;

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
