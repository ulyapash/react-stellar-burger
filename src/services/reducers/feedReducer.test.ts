import { TSocket, TSocketActions } from "../actions/socketActions";
import { feedReducer, initialState } from "./feedReducer";

const mockedEvent = new Event("mock");

test("should return to the initial state", () => {
  expect(feedReducer(undefined, {} as TSocketActions)).toEqual(initialState);
});

test("should successfully connect to the socket", () => {
  expect(
    feedReducer(undefined, {
      type: TSocket.SOCKET_CONNECTION_SUCCESS,
      payload: mockedEvent,
    })
  ).toEqual({
    ...initialState,
    connected: true,
  });
});

test("should handle socket error", () => {
  expect(
    feedReducer(undefined, {
      type: TSocket.SOCKET_CONNECTION_ERROR,
      payload: mockedEvent,
    })
  ).toEqual({
    ...initialState,
    connected: false,
    error: mockedEvent,
  });
});

test("should close the socket", () => {
  expect(
    feedReducer(undefined, { type: TSocket.SOCKET_CONNECTION_CLOSE })
  ).toEqual({
    ...initialState,
    connected: false,
    error: null,
  });
});
