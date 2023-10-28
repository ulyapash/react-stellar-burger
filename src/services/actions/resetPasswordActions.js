import { request } from "../../utils/request";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";

export const resetPassword = (data) => {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    request("/password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: RESET_PASSWORD_ERROR,
          payload: error,
        });
      });
  };
};
