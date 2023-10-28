import { useSelector } from "react-redux";

import styles from "./ingredient-details.module.css";
import { currentIngredientSelector } from "../../services/selectors/currentIngredientSelector";

export const IngredientDetails = () => {
  const ingredient = useSelector(currentIngredientSelector);

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
