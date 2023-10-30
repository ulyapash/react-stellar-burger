import { RootState } from "../../types";

export const currentIngredientSelector = (store: RootState) =>
  store.currentIngredientReducer.currentIngredient;
