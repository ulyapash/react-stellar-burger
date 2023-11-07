import { Reducer } from "redux";
import { TIngredientData } from "../../types";
import {
  TBurgerConstructorActions,
  TBurgerConstructor,
} from "../actions/burgerConstructorActions";

type TState = {
  bun: TIngredientData | null;
  burgerIngredients: TIngredientData[];
};

export const initialState: TState = {
  bun: null,
  burgerIngredients: [],
};

export const burgerConstructorReducer: Reducer<
  TState,
  TBurgerConstructorActions
> = (state = initialState, action) => {
  switch (action.type) {
    case TBurgerConstructor.PUT_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }

    case TBurgerConstructor.PUT_BURGER_INGREDIENT: {
      return {
        ...state,
        burgerIngredients: [...state.burgerIngredients, action.payload],
      };
    }

    case TBurgerConstructor.CHANGE_ORDER_INGREDIENTS: {
      return {
        ...state,
        burgerIngredients: action.payload,
      };
    }

    case TBurgerConstructor.DELETE_BURGER_INGREDIENT: {
      return {
        ...state,
        burgerIngredients: [...state.burgerIngredients].filter(
          (_, index) => index !== action.payload
        ),
      };
    }

    case TBurgerConstructor.CLEAR_CONSTRUCTOR: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
