import { getCookie, setCookie } from "../../utils/cookies";
import { request, requestWithToken } from "../../utils/request";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_ERROR = "GET_USER_ERROR";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_ERROR = "UPDATE_USER_ERROR";

export const login = (data) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
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
          type: LOGIN_SUCCESS,
          payload: user,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_ERROR,
          payload: error,
        });
      });
  };
};

export const register = (data) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
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
          type: REGISTER_SUCCESS,
          payload: user,
        });
      })
      .catch((error) => {
        dispatch({
          type: REGISTER_ERROR,
          payload: error,
        });
      });
  };
};

export const logout = () => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
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
          type: LOGOUT_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGOUT_ERROR,
          payload: error,
        });
      });
  };
};

export const getUserData = () => {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });

    requestWithToken("/auth/user", {
      headers: {
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    })
      .then((result) => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: result.user,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_ERROR,
          payload: error,
        });
      });
  };
};

export const updateUser = (data) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
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
          type: UPDATE_USER_SUCCESS,
          payload: result.user,
        });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: error,
        });
      });
  };
};
