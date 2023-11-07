import { Reducer } from "redux";
import { TFeedOrderData } from "../../types";
import { TFeed, TFeedActions } from "../actions/feedActions";

type TState = {
  connected: boolean;
  orders: TFeedOrderData[];
  totalOrders: number;
  totalOrdersToday: number;
  error: Event | null;
};

const initialState: TState = {
  connected: false,
  orders: [],
  totalOrders: 0,
  totalOrdersToday: 0,
  error: null,
};

export const feedReducer: Reducer<TState, TFeedActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TFeed.FEED_CONNECTION_START:
      return {
        ...state,
        connected: false,
        error: null,
      };
    case TFeed.FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        connected: true,
      };
    case TFeed.FEED_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TFeed.FEED_CONNECTION_CLOSE:
      return {
        ...state,
        connected: false,
      };
    case TFeed.FEED_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        totalOrders: action.payload.total,
        totalOrdersToday: action.payload.totalToday,
      };
    default: {
      return state;
    }
  }
};
