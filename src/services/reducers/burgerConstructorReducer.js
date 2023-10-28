import {
  PUT_BUN,
  PUT_BURGER_INGREDIENT,
  DELETE_BURGER_INGREDIENT,
  CHANGE_ORDER_INGREDIENTS,
  CLEAR_CONSTRUCTOR,
} from "../actions/burgerConstructorActions";

const initialState = {
  bun: null,
  burgerIngredients: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }

    case PUT_BURGER_INGREDIENT: {
      return {
        ...state,
        burgerIngredients: [...state.burgerIngredients, action.payload],
      };
    }

    case CHANGE_ORDER_INGREDIENTS: {
      return {
        ...state,
        burgerIngredients: action.payload,
      };
    }

    case DELETE_BURGER_INGREDIENT: {
      return {
        ...state,
        burgerIngredients: [...state.burgerIngredients].filter(
          (_, index) => index !== action.payload
        ),
      };
    }

    case CLEAR_CONSTRUCTOR: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
