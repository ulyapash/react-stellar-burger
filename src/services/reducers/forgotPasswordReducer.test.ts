import {
  TForgotPassword,
  TForgotPasswordActions,
} from "../actions/forgotPasswordActions";
import { forgotPasswordReducer, initialState } from "./forgotPasswordReducer";

test("should return to the initial state", () => {
  expect(
    forgotPasswordReducer(undefined, {} as TForgotPasswordActions)
  ).toEqual(initialState);
});

test("should make request to recover password", () => {
  expect(
    forgotPasswordReducer(undefined, {
      type: TForgotPassword.FORGOT_PASSWORD_REQUEST,
    })
  ).toEqual({
    ...initialState,
    isAllowed: false,
    isLoading: true,
    error: null,
  });
});

test("should handle successful recovering password", () => {
  expect(
    forgotPasswordReducer(undefined, {
      type: TForgotPassword.FORGOT_PASSWORD_SUCCESS,
    })
  ).toEqual({
    ...initialState,
    isAllowed: true,
    isLoading: false,
  });
});

test("should handle unsuccessful recovering password", () => {
  const mockedError = new Error();

  expect(
    forgotPasswordReducer(undefined, {
      type: TForgotPassword.FORGOT_PASSWORD_ERROR,
      payload: mockedError,
    })
  ).toEqual({
    ...initialState,
    isLoading: false,
    error: mockedError,
  });
});
