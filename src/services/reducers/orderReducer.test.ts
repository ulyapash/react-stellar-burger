import { TOrder, TOrderActions } from "../actions/orderActions";
import { orderReducer, initialState } from "./orderReducer";

test("should return to the initial state", () => {
  expect(orderReducer(undefined, {} as TOrderActions)).toEqual(initialState);
});

test("should make request to make the order", () => {
  expect(
    orderReducer(undefined, {
      type: TOrder.MAKE_ORDER_REQUEST,
    })
  ).toEqual({
    ...initialState,
    isLoading: true,
    name: null,
    number: null,
    error: null,
  });
});

test("should handle successful making the order", () => {
  expect(
    orderReducer(undefined, {
      type: TOrder.MAKE_ORDER_SUCCESS,
      payload: {
        name: "Заказ",
        number: 123,
      },
    })
  ).toEqual({
    ...initialState,
    isLoading: false,
    name: "Заказ",
    number: 123,
  });
});

test("should handle unsuccessful making the order", () => {
  const mockedError = new Error();

  expect(
    orderReducer(undefined, {
      type: TOrder.MAKE_ORDER_ERROR,
      payload: mockedError,
    })
  ).toEqual({
    ...initialState,
    isLoading: false,
    error: mockedError,
  });
});

test("should clear the order", () => {
  expect(
    orderReducer(undefined, {
      type: TOrder.CLEAR_ORDER,
    })
  ).toEqual(initialState);
});
