import { useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredient.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";

export const BurgerIngredient = ({ ingredient }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpened(true);
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
  };

  return (
    <>
      <div
        className={`${styles.burgerIngridient} mb-8`}
        onClick={handleOpenModal}
      >
        <img
          className={styles.image}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <span
          className={`${styles.price} text text_type_digits-default mt-1 mb-1`}
        >
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </span>
        <p className={`${styles.name} text text_type_main-default`}>
          {ingredient.name}
        </p>
      </div>
      {isModalOpened && (
        <Modal onClose={handleCloseModal}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType,
};
