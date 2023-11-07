import { burgerIngredient } from "../../mocks/ingredients";
import {
  TCurrentIngredient,
  TCurrentIngredientActions,
} from "../actions/currentIngredientActions";
import {
  currentIngredientReducer,
  initialState,
} from "./currentIngredientReducer";

test("should return to the initial state", () => {
  expect(
    currentIngredientReducer(undefined, {} as TCurrentIngredientActions)
  ).toEqual(initialState);
});

test("should set the new ingredient as the current", () => {
  expect(
    currentIngredientReducer(undefined, {
      type: TCurrentIngredient.SET_CURRENT_INGREDIENT,
      payload: burgerIngredient,
    })
  ).toEqual({
    ...initialState,
    currentIngredient: burgerIngredient,
  });
});

test("should clear the current ingredient", () => {
  expect(
    currentIngredientReducer(
      { ...initialState, currentIngredient: burgerIngredient },
      {
        type: TCurrentIngredient.CLEAR_CURRENT_INGREDIENT,
      }
    )
  ).toEqual(initialState);
});
