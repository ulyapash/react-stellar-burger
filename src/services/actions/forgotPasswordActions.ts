import { Dispatch } from "redux";
import { request } from "../../utils/request";

export enum TForgotPassword {
  FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST",
  FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_ERROR",
}

export const forgotPassword = (email: string) => {
  return function (dispatch: Dispatch) {
    dispatch({
      type: TForgotPassword.FORGOT_PASSWORD_REQUEST,
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
          type: TForgotPassword.FORGOT_PASSWORD_SUCCESS,
        });
      })
      .catch((error) =>
        dispatch({
          type: TForgotPassword.FORGOT_PASSWORD_ERROR,
          payload: error,
        })
      );
  };
};

type TForgotPasswordRequest = {
  type: TForgotPassword.FORGOT_PASSWORD_REQUEST;
};

type TForgorPasswordSuccess = {
  type: TForgotPassword.FORGOT_PASSWORD_SUCCESS;
};

type TForgorPasswordError = {
  type: TForgotPassword.FORGOT_PASSWORD_ERROR;
  payload: Error;
};

export type TForgotPasswordActions =
  | TForgotPasswordRequest
  | TForgorPasswordSuccess
  | TForgorPasswordError;
