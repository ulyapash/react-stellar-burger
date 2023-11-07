export enum TSocket {
  SOCKET_CONNECTION_START = "SOCKET_CONNECTION_START",
  SOCKET_CONNECTION_SUCCESS = "SOCKET_CONNECTION_SUCCESS",
  SOCKET_CONNECTION_ERROR = "SOCKET_CONNECTION_ERROR",
  SOCKET_CONNECTION_CLOSE = "SOCKET_CONNECTION_CLOSE",
  SOCKET_GET_MESSAGE = "SOCKET_GET_MESSAGE",
}

type TSocketConnectionStart = {
  type: TSocket.SOCKET_CONNECTION_START;
  payload: string;
};

type TSocketConnectionSuccess = {
  type: TSocket.SOCKET_CONNECTION_SUCCESS;
  payload: Event;
};

type TSocketConnectionError = {
  type: TSocket.SOCKET_CONNECTION_ERROR;
  payload: Event;
};

type TSocketConnectionClose = {
  type: TSocket.SOCKET_CONNECTION_CLOSE;
};

type TSocketGetMessage = {
  type: TSocket.SOCKET_GET_MESSAGE;
  payload: Event;
};

export type TSocketActions =
  | TSocketConnectionStart
  | TSocketConnectionSuccess
  | TSocketConnectionError
  | TSocketConnectionClose
  | TSocketGetMessage;
