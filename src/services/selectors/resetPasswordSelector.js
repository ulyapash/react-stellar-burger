export const resetPasswordLoadingSelector = (state) =>
  state.resetPasswordReducer.isLoading;
export const resetPasswordResettedSelector = (state) =>
  state.resetPasswordReducer.isResetted;
export const resetPasswordErrorSelector = (state) =>
  state.resetPasswordReducer.error;
