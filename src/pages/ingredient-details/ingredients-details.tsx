import { FC } from "react";

import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";

import styles from "./ingredient-details.module.css";

const IngredientDetailsPage: FC = () => {
  return (
    <div className={styles.ingredientDetails}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      <IngredientDetails />
    </div>
  );
};

export default IngredientDetailsPage;
