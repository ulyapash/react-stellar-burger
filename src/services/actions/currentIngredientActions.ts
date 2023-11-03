import { TIngredientData } from "../../types";

export enum TCurrentIngredient {
  SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT",
  CLEAR_CURRENT_INGREDIENT = "CLEAR_CURRENT_INGREDIENT",
}

type TSetCurrentIngredient = {
  type: TCurrentIngredient.SET_CURRENT_INGREDIENT;
  payload: TIngredientData;
};

type TClearCurrentIngredient = {
  type: TCurrentIngredient.CLEAR_CURRENT_INGREDIENT;
};

export type TCurrentIngredientActions =
  | TSetCurrentIngredient
  | TClearCurrentIngredient;
