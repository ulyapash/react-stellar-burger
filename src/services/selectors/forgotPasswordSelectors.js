export const forgotPasswordLoadingSelector = (state) =>
  state.forgotPasswordReducer.isLoading;
export const forgotPasswordAllowedSelector = (state) =>
  state.forgotPasswordReducer.isAllowed;
export const forgotPasswordErrorSelector = (state) =>
  state.forgotPasswordReducer.error;
