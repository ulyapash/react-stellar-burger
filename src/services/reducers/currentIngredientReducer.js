import {
  CLEAR_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT,
} from "../actions/currentIngredientActions";

const initialState = {
  currentIngredient: null,
};

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.payload,
      };
    }

    case CLEAR_CURRENT_INGREDIENT: {
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
