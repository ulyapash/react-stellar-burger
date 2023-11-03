import type { Middleware, MiddlewareAPI } from "redux";
import { v4 as uuidV4 } from "uuid";

import { TFeed, TFeedActions } from "../services/actions/feedActions";

import {
  AppDispatch,
  RootState,
  TFeedMessage,
  TFeedOrderData,
} from "../types/index";
import { SOCKET_URL } from "../utils/api";

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket;

    return (next) => (action: TFeedActions) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        FEED_CONNECTION_START: init,
        FEED_CONNECTION_SUCCESS: onOpen,
        FEED_CONNECTION_ERROR: onError,
        FEED_CONNECTION_CLOSE: onClose,
        FEED_GET_MESSAGE: onMessage,
      } = TFeed;

      if (type === init) {
        socket = new WebSocket(SOCKET_URL + action.payload);
      }

      if (socket) {
        socket.onopen = (e) => dispatch({ type: onOpen, payload: e });
        socket.onerror = (e) => dispatch({ type: onError, payload: e });
        socket.onmessage = (e) => {
          const { data } = e;
          const ingredients: TFeedMessage = JSON.parse(data);
          dispatch({
            type: onMessage,
            payload: {
              ...ingredients,
              orders: ingredients.orders.map((ingredient: TFeedOrderData) => ({
                ...ingredient,
                uniqueId: uuidV4(),
              })),
            },
          });
        };
        socket.onclose = (e) => dispatch({ type: onClose });
      }

      next(action);
    };
  }) as Middleware;
};
