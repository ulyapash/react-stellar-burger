import {
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from "../actions/ingredientsActions";

const initialState = {
  isLoading: false,
  ingredients: [],
  error: null,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        ingredients: action.payload,
        error: null,
      };
    }

    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: "Возникла ошибка при загрузке ингредиентов",
      };
    }

    default: {
      return state;
    }
  }
};
