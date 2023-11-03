import { RootState } from "../../types";

export const feedConnectedSelector = (store: RootState) =>
  store.feedReducer.connected;
export const feedOrdersSelector = (store: RootState) =>
  store.feedReducer.orders;
export const feedTotalOrdersSelector = (store: RootState) =>
  store.feedReducer.totalOrders;
export const feedTotalOrdersTodaySelector = (store: RootState) =>
  store.feedReducer.totalOrdersToday;
export const feedErrorSelector = (store: RootState) => store.feedReducer.error;
