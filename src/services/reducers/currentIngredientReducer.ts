import { Reducer } from "redux";
import { TIngredientData } from "../../types";
import {
  TCurrentIngredient,
  TCurrentIngredientActions,
} from "../actions/currentIngredientActions";

type TState = {
  currentIngredient: TIngredientData | null;
};

const initialState = {
  currentIngredient: null,
};

export const currentIngredientReducer: Reducer<
  TState,
  TCurrentIngredientActions
> = (state = initialState, action) => {
  switch (action.type) {
    case TCurrentIngredient.SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.payload,
      };
    }

    case TCurrentIngredient.CLEAR_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null,
      };
    }

    default: {
      return state;
    }
  }
};
