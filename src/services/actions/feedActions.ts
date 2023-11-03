import { TFeedMessage } from "../../types";

export enum TFeed {
  FEED_CONNECTION_START = "FEED_CONNECTION_START",
  FEED_CONNECTION_SUCCESS = "FEED_CONNECTION_SUCCESS",
  FEED_CONNECTION_ERROR = "FEED_CONNECTION_ERROR",
  FEED_CONNECTION_CLOSE = "FEED_CONNECTION_CLOSE",
  FEED_GET_MESSAGE = "FEED_GET_MESSAGE",
}

type TFeedConnectionStart = {
  type: TFeed.FEED_CONNECTION_START;
  payload: string;
};

type TFeedConnectionSuccess = {
  type: TFeed.FEED_CONNECTION_SUCCESS;
  payload: Event;
};

type TFeedConnectionError = {
  type: TFeed.FEED_CONNECTION_ERROR;
  payload: Event;
};

type TFeedConnectionClose = {
  type: TFeed.FEED_CONNECTION_CLOSE;
};

type TFeedGetMessage = {
  type: TFeed.FEED_GET_MESSAGE;
  payload: TFeedMessage;
};

export type TFeedActions =
  | TFeedConnectionStart
  | TFeedConnectionSuccess
  | TFeedConnectionError
  | TFeedConnectionClose
  | TFeedGetMessage;
