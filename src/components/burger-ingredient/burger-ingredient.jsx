import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ingredientPropType } from "../../utils/prop-types";
import {
  bunSelector,
  burgerIngredientsSelector,
} from "../../services/selectors/burgerConstructorSelector";
import styles from "./burger-ingredient.module.css";

export const BurgerIngredient = ({ ingredient, handleOpenModal }) => {
  const bun = useSelector(bunSelector);
  const burgerIngredients = useSelector(burgerIngredientsSelector);

  const count = useMemo(() => {
    if (ingredient.type === "bun") {
      if (!bun) {
        return 0;
      }

      return bun._id === ingredient._id ? 1 : 0;
    }

    return burgerIngredients.reduce(
      (acc, burgerIngredient) =>
        burgerIngredient._id === ingredient._id ? acc + 1 : acc,
      0
    );
  }, [bun, ingredient, burgerIngredients]);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <>
      <div
        className={`${styles.burgerIngridient} mb-8`}
        onClick={handleOpenModal}
        ref={dragRef}
      >
        {count !== 0 && <Counter count={count} size="default" />}
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
    </>
  );
};

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType,
  handleOpenModal: PropTypes.func,
};
