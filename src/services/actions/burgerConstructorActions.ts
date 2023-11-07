import { TIngredientData } from "../../types";

export enum TBurgerConstructor {
  PUT_BUN = "PUT_BUN",
  PUT_BURGER_INGREDIENT = "PUT_BURGER_INGREDIENT",
  DELETE_BURGER_INGREDIENT = "DELETE_BURGER_INGREDIENT",
  CHANGE_ORDER_INGREDIENTS = "CHANGE_ORDER_INGREDIENTS",
  CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR",
}

type TPutBun = {
  type: TBurgerConstructor.PUT_BUN;
  payload: TIngredientData;
};

type TPutBurgerIngredient = {
  type: TBurgerConstructor.PUT_BURGER_INGREDIENT;
  payload: TIngredientData;
};

type TChangeOrderIngredients = {
  type: TBurgerConstructor.CHANGE_ORDER_INGREDIENTS;
  payload: TIngredientData[];
};

type TDeleteBurgerIngredient = {
  type: TBurgerConstructor.DELETE_BURGER_INGREDIENT;
  payload: number;
};

type TClearConstructor = {
  type: TBurgerConstructor.CLEAR_CONSTRUCTOR;
};

export type TBurgerConstructorActions =
  | TPutBun
  | TPutBurgerIngredient
  | TChangeOrderIngredients
  | TDeleteBurgerIngredient
  | TClearConstructor;
