import {
  GET_USER_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "../actions/userActions";

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

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoginLoading: true,
        user: null,
        loginError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoginLoading: false,
        userError: false,
        user: action.payload,
        isLogged: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoginLoading: false,
        loginError: action.payload,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        isRegisterLoading: true,
        user: null,
        registerError: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegisterLoading: false,
        isLogged: true,
        user: action.payload,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        isRegisterLoading: false,
        registerError: action.payload,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLogoutLoading: true,
        logoutError: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLogoutLoading: false,
        data: null,
        isLogged: false,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        isLogoutLoading: false,
        logoutError: action.payload,
      };
    case GET_USER_REQUEST: {
      return {
        ...state,
        isUserLoading: true,
        userError: null,
      };
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        isUserLoading: false,
        isLogged: true,
        user: action.payload,
      };
    }

    case GET_USER_ERROR: {
      return {
        ...state,
        isUserLoading: false,
        userError: action.payload,
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        isUserUpdating: true,
        userUpdateError: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isUserUpdating: false,
        data: action.payload,
      };
    }
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        isUserUpdating: false,
        userUpdateError: false,
      };
    }
    default: {
      return state;
    }
  }
};
