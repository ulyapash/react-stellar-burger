import { Reducer } from "redux";
import { v4 as uuidV4 } from "uuid";

import { TSocket, TSocketActions } from "../actions/socketActions";

import { TFeedMessage, TFeedOrderData } from "../../types";

type TState = {
  connected: boolean;
  orders: TFeedOrderData[];
  totalOrders: number;
  totalOrdersToday: number;
  error: Event | null;
};

export const initialState: TState = {
  connected: false,
  orders: [],
  totalOrders: 0,
  totalOrdersToday: 0,
  error: null,
};

export const feedReducer: Reducer<TState, TSocketActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TSocket.SOCKET_CONNECTION_START:
      return {
        ...state,
        connected: false,
        error: null,
      };
    case TSocket.SOCKET_CONNECTION_SUCCESS:
      return {
        ...state,
        connected: true,
      };
    case TSocket.SOCKET_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TSocket.SOCKET_CONNECTION_CLOSE:
      return {
        ...state,
        connected: false,
      };
    case TSocket.SOCKET_GET_MESSAGE:
      const { orders, total, totalToday } =
        action.payload as unknown as TFeedMessage;

      return {
        ...state,
        orders: orders.map((ingredient) => ({
          ...ingredient,
          uniqueId: uuidV4(),
        })),
        totalOrders: total,
        totalOrdersToday: totalToday,
      };
    default: {
      return state;
    }
  }
};
