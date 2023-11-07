import {
  burgerIngredients,
  burgerBun,
  burgerIngredient,
  burgerIngredientsPut,
  burgerIngredientsDelete,
} from "../../mocks/ingredients";
import {
  TBurgerConstructor,
  TBurgerConstructorActions,
} from "../actions/burgerConstructorActions";
import {
  burgerConstructorReducer,
  initialState,
} from "./burgerConstructorReducer";

test("should return to the initial state", () => {
  expect(
    burgerConstructorReducer(undefined, {} as TBurgerConstructorActions)
  ).toEqual(initialState);
});

test("should put an ingredient to the order", () => {
  expect(
    burgerConstructorReducer(
      {
        ...initialState,
        burgerIngredients: burgerIngredients,
      },
      {
        type: TBurgerConstructor.PUT_BURGER_INGREDIENT,
        payload: burgerIngredient,
      }
    )
  ).toEqual({
    ...initialState,
    burgerIngredients: burgerIngredientsPut,
  });
});

test("should put a bun to the order", () => {
  expect(
    burgerConstructorReducer(undefined, {
      type: TBurgerConstructor.PUT_BUN,
      payload: burgerBun,
    })
  ).toEqual({
    ...initialState,
    bun: burgerBun,
  });
});

test("should delete the ingredient", () => {
  expect(
    burgerConstructorReducer(
      {
        ...initialState,
        burgerIngredients: burgerIngredients,
      },
      {
        type: TBurgerConstructor.DELETE_BURGER_INGREDIENT,
        payload: 2,
      }
    )
  ).toEqual({
    ...initialState,
    burgerIngredients: burgerIngredientsDelete,
  });
});

test("should clear the order", () => {
  expect(
    burgerConstructorReducer(
      {
        ...initialState,
        burgerIngredients: burgerIngredients,
        bun: burgerBun,
      },
      { type: TBurgerConstructor.CLEAR_CONSTRUCTOR }
    )
  ).toEqual(initialState);
});
