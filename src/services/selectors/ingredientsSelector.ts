import { RootState } from "../../types";

export const ingredientsLoadingSelector = (store: RootState) =>
  store.ingredientsReducer.isLoading;
export const ingredientsDataSelector = (store: RootState) =>
  store.ingredientsReducer.ingredients;
export const ingredientsErrorSelector = (store: RootState) =>
  store.ingredientsReducer.error;
