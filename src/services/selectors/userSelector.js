export const userIsLoginLoadingSelector = (state) =>
  state.userReducer.isLoginLoading;
export const userIsRegisterLoadingSelector = (state) =>
  state.userReducer.isRegisterLoading;
export const userIsLogoutLoadingSelector = (state) =>
  state.userReducer.isLogoutLoading;
export const userIsUserLoadingSelector = (state) =>
  state.userReducer.isUserLoading;
export const userIsUserUpdatingSelector = (state) =>
  state.userReducer.isUserUpdating;

export const userDataSelector = (state) => state.userReducer.user;
export const userIsLoggedSelector = (state) => state.userReducer.isLogged;

export const userLoginErrorSelector = (state) => state.userReducer.loginError;
export const userRegisterErrorSelector = (state) =>
  state.userReducer.registerError;
export const userLogoutErrorSelector = (state) => state.userReducer.logoutError;
export const userUserErrorSelector = (state) => state.userReducer.userError;
export const userUserUpdateErrorSelector = (state) =>
  state.userReducer.userUpdateError;
