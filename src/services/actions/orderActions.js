import { request } from "../../utils/request";

export const MAKE_ORDER_REQUEST = "MAKE_ORDER_REQUEST";
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_ERROR = "MAKE_ORDER_ERROR";

export const makeOrder = (burgerIngredientIds) => {
  return function (dispatch) {
    dispatch({
      type: MAKE_ORDER_REQUEST,
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
          type: MAKE_ORDER_SUCCESS,
          payload: {
            name: result.name,
            number: result.order.number,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: MAKE_ORDER_ERROR,
          payload: error,
        });
      });
  };
};
