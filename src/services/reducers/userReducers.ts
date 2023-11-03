import { Reducer } from "redux";
import { TUserData } from "../../types";
import { TUser, TUserActions } from "../actions/userActions";

type TState = {
  isLoginLoading: boolean;
  isRegisterLoading: boolean;
  isLogoutLoading: boolean;
  isUserLoading: boolean;
  isUserUpdating: boolean;
  data: TUserData | null;
  isLogged: boolean;
  loginError: Error | null;
  registerError: Error | null;
  logoutError: Error | null;
  userError: Error | null;
  userUpdateError: Error | null;
};

const initialState = {
  isLoginLoading: false,
  isRegisterLoading: false,
  isLogoutLoading: false,
  isUserLoading: false,
  isUserUpdating: false,
  data: null,
  isLogged: false,
  loginError: null,
  registerError: null,
  logoutError: null,
  userError: null,
  userUpdateError: null,
};

export const userReducer: Reducer<TState, TUserActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TUser.LOGIN_REQUEST:
      return {
        ...state,
        isLoginLoading: true,
        data: null,
        loginError: null,
      };
    case TUser.LOGIN_SUCCESS:
      return {
        ...state,
        isLoginLoading: false,
        userError: null,
        data: action.payload,
        isLogged: true,
      };
    case TUser.LOGIN_ERROR:
      return {
        ...state,
        isLoginLoading: false,
        loginError: action.payload,
      };
    case TUser.REGISTER_REQUEST:
      return {
        ...state,
        isRegisterLoading: true,
        data: null,
        registerError: null,
      };
    case TUser.REGISTER_SUCCESS:
      return {
        ...state,
        isRegisterLoading: false,
        isLogged: true,
        data: action.payload,
      };
    case TUser.REGISTER_ERROR:
      return {
        ...state,
        isRegisterLoading: false,
        registerError: action.payload,
      };
    case TUser.LOGOUT_REQUEST:
      return {
        ...state,
        isLogoutLoading: true,
        logoutError: null,
      };
    case TUser.LOGOUT_SUCCESS:
      return {
        ...state,
        isLogoutLoading: false,
        data: null,
        isLogged: false,
      };
    case TUser.LOGOUT_ERROR:
      return {
        ...state,
        isLogoutLoading: false,
        logoutError: action.payload,
      };
    case TUser.GET_USER_REQUEST: {
      return {
        ...state,
        isUserLoading: true,
        userError: null,
      };
    }

    case TUser.GET_USER_SUCCESS: {
      return {
        ...state,
        isUserLoading: false,
        isLogged: true,
        data: action.payload,
      };
    }

    case TUser.GET_USER_ERROR: {
      return {
        ...state,
        isUserLoading: false,
        userError: action.payload,
      };
    }
    case TUser.UPDATE_USER_REQUEST: {
      return {
        ...state,
        isUserUpdating: true,
        userUpdateError: null,
      };
    }
    case TUser.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isUserUpdating: false,
        data: action.payload,
      };
    }
    case TUser.UPDATE_USER_ERROR: {
      return {
        ...state,
        isUserUpdating: false,
        userUpdateError: null,
      };
    }
    default: {
      return state;
    }
  }
};
