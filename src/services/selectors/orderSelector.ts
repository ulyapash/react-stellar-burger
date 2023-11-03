import { RootState } from "../../types";

export const orderLoadingSelector = (state: RootState) =>
  state.orderReducer.isLoading;
export const orderNameSelector = (state: RootState) => state.orderReducer.name;
export const orderNumberSelector = (state: RootState) =>
  state.orderReducer.number;
export const orderErrorSelector = (state: RootState) =>
  state.orderReducer.error;
