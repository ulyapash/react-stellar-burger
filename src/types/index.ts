import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { store } from "../services/store";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TBurgerConstructorActions } from "../services/actions/burgerConstructorActions";
import { TCurrentIngredientActions } from "../services/actions/currentIngredientActions";
import { TForgotPasswordActions } from "../services/actions/forgotPasswordActions";
import { TIngredientsActions } from "../services/actions/ingredientsActions";
import { TOrderActions } from "../services/actions/orderActions";
import { TResetPasswordActions } from "../services/actions/resetPasswordActions";
import { TUserActions } from "../services/actions/userActions";
import { TFeedActions } from "../services/actions/feedActions";

export type TIngredientData = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uniqueId?: string;
};

export type TUserData = {
  email: string;
  name: string;
  password?: string;
};

export type TOrderData = {
  name: string;
  number: number;
};

export type TFeedOrderData = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: "created" | "pending" | "done";
  updatedAt: string;
  _id: string;
  uniqueId?: string;
};

export type TFeedMessage = {
  success: boolean;
  orders: TFeedOrderData[];
  total: number;
  totalToday: number;
};

type TAppActions =
  | TBurgerConstructorActions
  | TCurrentIngredientActions
  | TForgotPasswordActions
  | TIngredientsActions
  | TOrderActions
  | TResetPasswordActions
  | TUserActions
  | TFeedActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, never, TAppActions>;

export type TAppThunk<TReturn = void> = ThunkAction<
  TReturn,
  RootState,
  never,
  TAppActions
>;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
