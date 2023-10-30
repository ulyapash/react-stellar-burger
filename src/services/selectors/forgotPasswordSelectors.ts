import { RootState } from "../../types";

export const forgotPasswordLoadingSelector = (state: RootState) =>
  state.forgotPasswordReducer.isLoading;
export const forgotPasswordAllowedSelector = (state: RootState) =>
  state.forgotPasswordReducer.isAllowed;
export const forgotPasswordErrorSelector = (state: RootState) =>
  state.forgotPasswordReducer.error;
