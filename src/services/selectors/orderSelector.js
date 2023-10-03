export const orderLoadingSelector = (state) => state.orderReducer.isLoading;
export const orderNameSelector = (state) => state.orderReducer.name;
export const orderNumberSelector = (state) => state.orderReducer.number;
export const orderErrorSelector = (state) => state.orderReducer.error;
