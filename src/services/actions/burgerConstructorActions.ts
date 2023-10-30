import { v4 as uuidV4 } from "uuid";
import { TIngredientData } from "../../types";

export enum TBurgerConstructor {
  PUT_BUN = "PUT_BUN",
  PUT_BURGER_INGREDIENT = "PUT_BURGER_INGREDIENT",
  DELETE_BURGER_INGREDIENT = "DELETE_BURGER_INGREDIENT",
  CHANGE_ORDER_INGREDIENTS = "CHANGE_ORDER_INGREDIENTS",
  CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR",
}

export const putBun = (bun: TIngredientData) => {
  return {
    type: TBurgerConstructor.PUT_BUN,
    payload: bun,
  };
};

export const putBurgerIngredient = (ingredient: TIngredientData) => {
  return {
    type: TBurgerConstructor.PUT_BURGER_INGREDIENT,
    payload: { ...ingredient, uniqueId: uuidV4() },
  };
};

export const changeOrderIngredients = (
  dragIndex: number,
  hoverIndex: number,
  ingredients: TIngredientData[]
) => {
  const sortedIngredients = [...ingredients];

  const draggingItem = ingredients[dragIndex];
  const [hoveredItem] = sortedIngredients.splice(hoverIndex, 1, draggingItem);
  sortedIngredients.splice(dragIndex, 1, hoveredItem);

  return {
    type: TBurgerConstructor.CHANGE_ORDER_INGREDIENTS,
    payload: sortedIngredients,
  };
};

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
