import {
  MAKE_ORDER_ERROR,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
} from "../actions/orderActions";

const initialState = {
  isLoading: false,
  name: null,
  number: null,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        name: action.payload.name,
        number: action.payload.number,
      };
    }

    case MAKE_ORDER_ERROR: {
      return {
        ...state,
        isLoading: false,
        name: null,
        number: null,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
