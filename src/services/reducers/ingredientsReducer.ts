import { Reducer } from "redux";
import { TIngredientData } from "../../types";
import {
  TIngredients,
  TIngredientsActions,
} from "../actions/ingredientsActions";

type TState = {
  isLoading: boolean;
  ingredients: TIngredientData[];
  error: Error | null;
};

export const initialState = {
  isLoading: false,
  ingredients: [],
  error: null,
};

export const ingredientsReducer: Reducer<TState, TIngredientsActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TIngredients.GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case TIngredients.GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        ingredients: action.payload,
        error: null,
      };
    }

    case TIngredients.GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
