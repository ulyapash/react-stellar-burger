import { combineReducers } from "redux";

import { ingredientsReducer } from "./ingredientsReducer";
import { burgerConstructorReducer } from "./burgerConstructorReducer";
import { orderReducer } from "./orderReducer";
import { currentIngredientReducer } from "./currentIngredientReducer";

export const rootReducer = combineReducers({
  ingredientsReducer,
  burgerConstructorReducer,
  orderReducer,
  currentIngredientReducer,
});
