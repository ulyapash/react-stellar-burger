import { request } from "../../utils/request";
import { AppDispatch, TAppThunk } from "../../types";

export enum TResetPassword {
  RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST",
  RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR",
}

export const resetPassword = (data: {
  password: string;
  token: string;
}): TAppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: TResetPassword.RESET_PASSWORD_REQUEST,
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
          type: TResetPassword.RESET_PASSWORD_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: TResetPassword.RESET_PASSWORD_ERROR,
          payload: error,
        });
      });
  };
};

type TResetPasswordRequest = {
  type: TResetPassword.RESET_PASSWORD_REQUEST;
};

type TResetPasswordSuccess = {
  type: TResetPassword.RESET_PASSWORD_SUCCESS;
};

type TResetPasswordError = {
  type: TResetPassword.RESET_PASSWORD_ERROR;
  payload: Error;
};

export type TResetPasswordActions =
  | TResetPasswordRequest
  | TResetPasswordSuccess
  | TResetPasswordError;
