import { Dispatch } from "redux";
import { TOrderData } from "../../types";
import { request } from "../../utils/request";

export enum TOrder {
  MAKE_ORDER_REQUEST = "MAKE_ORDER_REQUEST",
  MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS",
  MAKE_ORDER_ERROR = "MAKE_ORDER_ERROR",
  CLEAR_ORDER = "CLEAR_ORDER",
}

export const makeOrder = (burgerIngredientIds: string[]) => {
  return function (dispatch: Dispatch) {
    dispatch({
      type: TOrder.MAKE_ORDER_REQUEST,
    });

    request("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: burgerIngredientIds }),
    })
      .then((result) => {
        dispatch({
          type: TOrder.MAKE_ORDER_SUCCESS,
          payload: {
            name: result.name,
            number: result.order.number,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: TOrder.MAKE_ORDER_ERROR,
          payload: error,
        });
      });
  };
};

type TOrderRequest = {
  type: TOrder.MAKE_ORDER_REQUEST;
};

type TOrderSuccess = {
  type: TOrder.MAKE_ORDER_SUCCESS;
  payload: TOrderData;
};

type TOrderError = {
  type: TOrder.MAKE_ORDER_ERROR;
  payload: Error;
};

type TClearOrder = {
  type: TOrder.CLEAR_ORDER;
};

export type TOrderActions =
  | TOrderRequest
  | TOrderSuccess
  | TOrderError
  | TClearOrder;
