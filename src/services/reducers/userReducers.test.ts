import { user, userWithPassword } from "../../mocks/user";
import { TUser, TUserActions } from "../actions/userActions";
import { userReducer, initialState } from "./userReducers";

test("should return to the initial state", () => {
  expect(userReducer(undefined, {} as TUserActions)).toEqual(initialState);
});

test("should make request to login user", () => {
  expect(
    userReducer(undefined, {
      type: TUser.LOGIN_REQUEST,
    })
  ).toEqual({
    ...initialState,
    isLoginLoading: true,
    data: null,
    loginError: null,
  });
});

test("should handle successful logging user", () => {
  expect(
    userReducer(undefined, {
      type: TUser.LOGIN_SUCCESS,
      payload: user,
    })
  ).toEqual({
    ...initialState,
    isLoginLoading: false,
    data: user,
    isLogged: true,
  });
});

test("should handle unsuccessful logging user", () => {
  const mockedError = new Error();

  expect(
    userReducer(undefined, {
      type: TUser.LOGIN_ERROR,
      payload: mockedError,
    })
  ).toEqual({
    ...initialState,
    isLoginLoading: false,
    loginError: mockedError,
  });
});

test("should make request to register", () => {
  expect(
    userReducer(undefined, {
      type: TUser.REGISTER_REQUEST,
    })
  ).toEqual({
    ...initialState,
    isRegisterLoading: true,
    data: null,
    registerError: null,
  });
});

test("should handle successful registering user", () => {
  expect(
    userReducer(undefined, {
      type: TUser.REGISTER_SUCCESS,
      payload: userWithPassword,
    })
  ).toEqual({
    ...initialState,
    isRegisterLoading: false,
    isLogged: true,
    data: userWithPassword,
  });
});

test("should handle unsuccessful registering user", () => {
  const mockedError = new Error();

  expect(
    userReducer(undefined, {
      type: TUser.REGISTER_ERROR,
      payload: mockedError,
    })
  ).toEqual({
    ...initialState,
    isRegisterLoading: false,
    registerError: mockedError,
  });
});

test("should make request to logout user", () => {
  expect(
    userReducer(undefined, {
      type: TUser.LOGOUT_REQUEST,
    })
  ).toEqual({
    ...initialState,
    isLogoutLoading: true,
    logoutError: null,
  });
});

test("should handle successful logouting user", () => {
  expect(
    userReducer(undefined, {
      type: TUser.LOGOUT_SUCCESS,
    })
  ).toEqual({
    ...initialState,
    isLogoutLoading: false,
    data: null,
    isLogged: false,
  });
});

test("should handle unsuccessful logouting user", () => {
  const mockedError = new Error();

  expect(
    userReducer(undefined, {
      type: TUser.LOGOUT_ERROR,
      payload: mockedError,
    })
  ).toEqual({
    ...initialState,
    isLoginLoading: false,
    logoutError: mockedError,
  });
});

test("should make request to get user", () => {
  expect(
    userReducer(undefined, {
      type: TUser.GET_USER_REQUEST,
    })
  ).toEqual({
    ...initialState,
    isUserLoading: true,
    userError: null,
  });
});

test("should handle successful getting user", () => {
  expect(
    userReducer(undefined, {
      type: TUser.GET_USER_SUCCESS,
      payload: user,
    })
  ).toEqual({
    ...initialState,
    isUserLoading: false,
    isLogged: true,
    data: user,
  });
});

test("should handle unsuccessful getting user", () => {
  const mockedError = new Error();

  expect(
    userReducer(undefined, {
      type: TUser.GET_USER_ERROR,
      payload: mockedError,
    })
  ).toEqual({
    ...initialState,
    isUserLoading: false,
    userError: mockedError,
  });
});

test("should make request to update user", () => {
  expect(
    userReducer(undefined, {
      type: TUser.UPDATE_USER_REQUEST,
    })
  ).toEqual({
    ...initialState,
    isUserUpdating: true,
    userUpdateError: null,
  });
});

test("should handle successful updating user", () => {
  expect(
    userReducer(undefined, {
      type: TUser.UPDATE_USER_SUCCESS,
      payload: user,
    })
  ).toEqual({
    ...initialState,
    isUserUpdating: false,
    data: user,
  });
});

test("should handle unsuccessful updating user", () => {
  const mockedError = new Error();

  expect(
    userReducer(undefined, {
      type: TUser.UPDATE_USER_ERROR,
      payload: mockedError,
    })
  ).toEqual({
    ...initialState,
    isUserUpdating: false,
    userUpdateError: mockedError,
  });
});
