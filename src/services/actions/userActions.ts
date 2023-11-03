import { AppDispatch, TAppThunk, TUserData } from "../../types";
import { getCookie, setCookie } from "../../utils/cookies";
import { request, requestWithToken } from "../../utils/request";

export enum TUser {
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
  REGISTER_REQUEST = "REGISTER_REQUEST",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_ERROR = "REGISTER_ERROR",
  LOGOUT_REQUEST = "LOGOUT_REQUEST",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_ERROR = "LOGOUT_ERROR",
  GET_USER_REQUEST = "GET_USER_REQUEST",
  GET_USER_SUCCESS = "GET_USER_SUCCESS",
  GET_USER_ERROR = "GET_USER_ERROR",
  UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST",
  UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS",
  UPDATE_USER_ERROR = "UPDATE_USER_ERROR",
}

export const login = (data: Pick<TUserData, "email" | "password">) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: TUser.LOGIN_REQUEST,
    });

    request("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        const { user, refreshToken, accessToken } = result;

        localStorage.setItem("refreshToken", refreshToken);
        setCookie("accessToken", accessToken.substring(7));

        dispatch({
          type: TUser.LOGIN_SUCCESS,
          payload: user,
        });
      })
      .catch((error) => {
        dispatch({
          type: TUser.LOGIN_ERROR,
          payload: error,
        });
      });
  };
};

export const register = (data: TUserData) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: TUser.REGISTER_REQUEST,
    });

    request("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        const { user, refreshToken, accessToken } = result;

        localStorage.setItem("refreshToken", refreshToken);
        setCookie("accessToken", accessToken.substring(7));

        dispatch({
          type: TUser.REGISTER_SUCCESS,
          payload: user,
        });
      })
      .catch((error) => {
        dispatch({
          type: TUser.REGISTER_ERROR,
          payload: error,
        });
      });
  };
};

export const logout = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: TUser.LOGOUT_REQUEST,
    });

    request("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    })
      .then(() => {
        localStorage.setItem("refreshToken", "");
        setCookie("accessToken", "");

        dispatch({
          type: TUser.LOGOUT_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: TUser.LOGOUT_ERROR,
          payload: error,
        });
      });
  };
};

export const getUserData = (): TAppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: TUser.GET_USER_REQUEST,
    });

    requestWithToken("/auth/user", {
      headers: {
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    })
      .then((result) => {
        dispatch({
          type: TUser.GET_USER_SUCCESS,
          payload: result.user,
        });
      })
      .catch((error) => {
        dispatch({
          type: TUser.GET_USER_ERROR,
          payload: error,
        });
      });
  };
};

export const updateUser = (data: TUserData): TAppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: TUser.UPDATE_USER_REQUEST,
    });

    requestWithToken("/auth/user", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        dispatch({
          type: TUser.UPDATE_USER_SUCCESS,
          payload: result.user,
        });
      })
      .catch((error) => {
        dispatch({
          type: TUser.UPDATE_USER_ERROR,
          payload: error,
        });
      });
  };
};

type TLoginRequest = {
  type: TUser.LOGIN_REQUEST;
};

type TLoginSuccess = {
  type: TUser.LOGIN_SUCCESS;
  payload: TUserData;
};
type TLoginError = {
  type: TUser.LOGIN_ERROR;
  payload: Error;
};

type TRegsiterRequest = {
  type: TUser.REGISTER_REQUEST;
};

type TRegsiterSuccess = {
  type: TUser.REGISTER_SUCCESS;
  payload: TUserData;
};
type TRegsiterError = {
  type: TUser.REGISTER_ERROR;
  payload: Error;
};

type TLogoutRequest = {
  type: TUser.LOGOUT_REQUEST;
};

type TLogoutSuccess = {
  type: TUser.LOGOUT_SUCCESS;
};

type TLogoutError = {
  type: TUser.LOGOUT_ERROR;
  payload: Error;
};

type TGetUserRequest = {
  type: TUser.GET_USER_REQUEST;
};

type TGetUserSuccess = {
  type: TUser.GET_USER_SUCCESS;
  payload: TUserData;
};

type TGetUserError = {
  type: TUser.GET_USER_ERROR;
  payload: Error;
};

type TUpdateUserRequest = {
  type: TUser.UPDATE_USER_REQUEST;
};

type TUpdateUserSuccess = {
  type: TUser.UPDATE_USER_SUCCESS;
  payload: TUserData;
};

type TUpdateUserError = {
  type: TUser.UPDATE_USER_ERROR;
  payload: Error;
};

export type TUserActions =
  | TLoginRequest
  | TLoginSuccess
  | TLoginError
  | TRegsiterRequest
  | TRegsiterSuccess
  | TRegsiterError
  | TLogoutRequest
  | TLogoutSuccess
  | TLogoutError
  | TGetUserRequest
  | TGetUserSuccess
  | TGetUserError
  | TUpdateUserRequest
  | TUpdateUserSuccess
  | TUpdateUserError;
