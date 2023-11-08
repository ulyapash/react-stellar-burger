import { allIngredients } from "../../mocks/ingredients";
import {
  TIngredients,
  TIngredientsActions,
} from "../actions/ingredientsActions";
import { ingredientsReducer, initialState } from "./ingredientsReducer";

test("should return to the initial state", () => {
  expect(ingredientsReducer(undefined, {} as TIngredientsActions)).toEqual(
    initialState
  );
});

test("should make request to get ingredients", () => {
  expect(
    ingredientsReducer(undefined, {
      type: TIngredients.GET_INGREDIENTS_REQUEST,
    })
  ).toEqual({
    ...initialState,
    isLoading: true,
    ingredients: [],
    error: null,
  });
});

test("should handle successful getting ingredients", () => {
  expect(
    ingredientsReducer(undefined, {
      type: TIngredients.GET_INGREDIENTS_SUCCESS,
      payload: allIngredients,
    })
  ).toEqual({
    ...initialState,
    isLoading: false,
    ingredients: allIngredients,
  });
});

test("should handle unsuccessful getting ingredients", () => {
  const mockedError = new Error();

  expect(
    ingredientsReducer(undefined, {
      type: TIngredients.GET_INGREDIENTS_ERROR,
      payload: mockedError,
    })
  ).toEqual({
    ...initialState,
    isLoading: false,
    error: mockedError,
  });
});
