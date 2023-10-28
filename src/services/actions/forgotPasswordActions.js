import { request } from "../../utils/request";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_ERROR";

export const forgotPassword = (email) => {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    request("/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then(() => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });
      })
      .catch((error) =>
        dispatch({
          type: FORGOT_PASSWORD_ERROR,
          payload: error,
        })
      );
  };
};
