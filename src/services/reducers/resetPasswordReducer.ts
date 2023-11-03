import { Reducer } from "redux";
import {
  TResetPassword,
  TResetPasswordActions,
} from "../actions/resetPasswordActions";

type TState = {
  isLoading: boolean;
  isResetted: boolean;
  error: Error | null;
};

const initialState = {
  isLoading: false,
  isResetted: false,
  error: null,
};

export const resetPasswordReducer: Reducer<TState, TResetPasswordActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TResetPassword.RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isResetted: false,
        error: null,
      };
    }
    case TResetPassword.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isResetted: true,
      };
    }
    case TResetPassword.RESET_PASSWORD_ERROR: {
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
