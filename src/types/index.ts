import { store } from "../services/store";

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

export type RootState = ReturnType<typeof store.getState>;
