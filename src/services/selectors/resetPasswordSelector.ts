import { RootState } from "../../types";

export const resetPasswordLoadingSelector = (state: RootState) =>
  state.resetPasswordReducer.isLoading;
export const resetPasswordResettedSelector = (state: RootState) =>
  state.resetPasswordReducer.isResetted;
export const resetPasswordErrorSelector = (state: RootState) =>
  state.resetPasswordReducer.error;
