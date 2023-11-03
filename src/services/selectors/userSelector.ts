import { RootState } from "../../types";

export const userIsLoginLoadingSelector = (state: RootState) =>
  state.userReducer.isLoginLoading;
export const userIsRegisterLoadingSelector = (state: RootState) =>
  state.userReducer.isRegisterLoading;
export const userIsLogoutLoadingSelector = (state: RootState) =>
  state.userReducer.isLogoutLoading;
export const userIsUserLoadingSelector = (state: RootState) =>
  state.userReducer.isUserLoading;
export const userIsUserUpdatingSelector = (state: RootState) =>
  state.userReducer.isUserUpdating;

export const userDataSelector = (state: RootState) => state.userReducer.data;
export const userIsLoggedSelector = (state: RootState) =>
  state.userReducer.isLogged;

export const userLoginErrorSelector = (state: RootState) =>
  state.userReducer.loginError;
export const userRegisterErrorSelector = (state: RootState) =>
  state.userReducer.registerError;
export const userLogoutErrorSelector = (state: RootState) =>
  state.userReducer.logoutError;
export const userUserErrorSelector = (state: RootState) =>
  state.userReducer.userError;
export const userUserUpdateErrorSelector = (state: RootState) =>
  state.userReducer.userUpdateError;
