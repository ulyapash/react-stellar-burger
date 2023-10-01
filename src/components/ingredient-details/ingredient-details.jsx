import { ingredientPropType } from "../../utils/prop-types";

import styles from "./ingredient-details.module.css";

export const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={`${styles.ingredientDetails} pb-10 pb-15`}>
      <img src={ingredient.image} alt="Биокотлета из марсианской Магнолии" />
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

IngredientDetails.propTypes = {
  ingredient: ingredientPropType,
};
