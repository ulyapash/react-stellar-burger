import { RootState } from "../../types";

export const bunSelector = (state: RootState) =>
  state.burgerConstructorReducer.bun;
export const burgerIngredientsSelector = (state: RootState) =>
  state.burgerConstructorReducer.burgerIngredients;
