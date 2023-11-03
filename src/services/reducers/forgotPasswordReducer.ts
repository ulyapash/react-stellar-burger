import { Reducer } from "redux";
import {
  TForgotPassword,
  TForgotPasswordActions,
} from "../actions/forgotPasswordActions";

type TState = {
  isLoading: boolean;
  isAllowed: boolean;
  error: Error | null;
};

const initialState = {
  isLoading: false,
  isAllowed: false,
  error: null,
};

export const forgotPasswordReducer: Reducer<TState, TForgotPasswordActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TForgotPassword.FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isAllowed: false,
        error: null,
      };
    }
    case TForgotPassword.FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAllowed: true,
      };
    }
    case TForgotPassword.FORGOT_PASSWORD_ERROR: {
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
