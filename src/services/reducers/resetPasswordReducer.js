import {
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
} from "../actions/resetPasswordActions";

const initialState = {
  isLoading: false,
  isResetted: false,
  error: null,
};

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isResetted: false,
        error: null,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isResetted: true,
        isAllowed: true,
      };
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        isLoading: false,
        isResetted: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
