import { combineReducers } from "redux";

import { ingredientsReducer } from "./ingredientsReducer";
import { burgerConstructorReducer } from "./burgerConstructorReducer";
import { orderReducer } from "./orderReducer";
import { currentIngredientReducer } from "./currentIngredientReducer";
import { forgotPasswordReducer } from "./forgotPasswordReducer";
import { resetPasswordReducer } from "./resetPasswordReducer";
import { userReducer } from "./userReducers";

export const rootReducer = combineReducers({
  ingredientsReducer,
  burgerConstructorReducer,
  orderReducer,
  currentIngredientReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  userReducer,
});
