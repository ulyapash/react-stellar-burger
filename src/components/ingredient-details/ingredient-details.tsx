import { FC, useEffect } from "react";

import styles from "./ingredient-details.module.css";
import { currentIngredientSelector } from "../../services/selectors/currentIngredientSelector";
import { useAppDispatch, useAppSelector } from "../../types";
import { ingredientsDataSelector } from "../../services/selectors/ingredientsSelector";
import { useParams } from "react-router-dom";
import { TCurrentIngredient } from "../../services/actions/currentIngredientActions";

export const IngredientDetails: FC = () => {
  const ingredient = useAppSelector(currentIngredientSelector);
  const ingredients = useAppSelector(ingredientsDataSelector);
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: TCurrentIngredient.SET_CURRENT_INGREDIENT,
      payload: ingredients.find((ingredient) => ingredient._id === id)!,
    });
  }, [dispatch, ingredients, id]);

  if (!ingredient) {
    return null;
  }

  return (
    <div className={`${styles.ingredientDetails} pb-10 pb-15`}>
      <img
        src={ingredient.image_large}
        alt="Биокотлета из марсианской Магнолии"
      />
      <span className={`${styles.name} text text_type_main-medium mt-4`}>
        {ingredient.name}
      </span>
      <div className={`${styles.nutrients} mt-8`}>
        <div className={styles.nutrient}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.calories}
          </p>
        </div>
        <div className={styles.nutrient}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </div>
        <div className={styles.nutrient}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.fat}
          </p>
        </div>
        <div className={styles.nutrient}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};
