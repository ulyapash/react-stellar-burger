import { request } from "../../utils/request";
import { AppDispatch, TAppThunk, TIngredientData } from "../../types";

export enum TIngredients {
  GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST",
  GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS",
  GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR",
}

export const getIngredients = (): TAppThunk => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: TIngredients.GET_INGREDIENTS_REQUEST,
    });

    request("/ingredients")
      .then((result) => {
        dispatch({
          type: TIngredients.GET_INGREDIENTS_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: TIngredients.GET_INGREDIENTS_ERROR,
          payload: error,
        });
      });
  };
};

type TGetIngredientsRequest = {
  type: TIngredients.GET_INGREDIENTS_REQUEST;
};

type TGetIngredientsSuccess = {
  type: TIngredients.GET_INGREDIENTS_SUCCESS;
  payload: TIngredientData[];
};

type TGetIngredientsError = {
  type: TIngredients.GET_INGREDIENTS_ERROR;
  payload: Error | null;
};

export type TIngredientsActions =
  | TGetIngredientsRequest
  | TGetIngredientsSuccess
  | TGetIngredientsError;
