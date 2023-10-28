import {
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
} from "../actions/forgotPasswordActions";

const initialState = {
  isLoading: false,
  isAllowed: false,
  error: null,
};

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isAllowed: false,
        error: null,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAllowed: true,
      };
    }
    case FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        isLoading: false,
        isAllowed: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
