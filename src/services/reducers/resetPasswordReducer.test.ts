import {
  TResetPassword,
  TResetPasswordActions,
} from "../actions/resetPasswordActions";
import { resetPasswordReducer, initialState } from "./resetPasswordReducer";

test("should return to the initial state", () => {
  expect(resetPasswordReducer(undefined, {} as TResetPasswordActions)).toEqual(
    initialState
  );
});

test("should make request to reset password", () => {
  expect(
    resetPasswordReducer(undefined, {
      type: TResetPassword.RESET_PASSWORD_REQUEST,
    })
  ).toEqual({
    ...initialState,
    isLoading: true,
    isResetted: false,
    error: null,
  });
});

test("should handle successful resetting password", () => {
  expect(
    resetPasswordReducer(undefined, {
      type: TResetPassword.RESET_PASSWORD_SUCCESS,
    })
  ).toEqual({
    ...initialState,
    isLoading: false,
    isResetted: true,
  });
});

test("should handle unsuccessful resetting password", () => {
  const mockedError = new Error();

  expect(
    resetPasswordReducer(undefined, {
      type: TResetPassword.RESET_PASSWORD_ERROR,
      payload: mockedError,
    })
  ).toEqual({
    ...initialState,
    isLoading: false,
    error: mockedError,
  });
});
