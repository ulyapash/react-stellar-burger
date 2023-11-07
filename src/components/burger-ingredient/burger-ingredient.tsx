import { FC, useMemo } from "react";
import { useDrag } from "react-dnd";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  bunSelector,
  burgerIngredientsSelector,
} from "../../services/selectors/burgerConstructorSelector";
import styles from "./burger-ingredient.module.css";
import { TIngredientData, useAppSelector } from "../../types";

type TProps = {
  ingredient: TIngredientData;
};

export const BurgerIngredient: FC<TProps> = ({ ingredient }) => {
  const bun = useAppSelector(bunSelector);
  const burgerIngredients = useAppSelector(burgerIngredientsSelector);

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
        ref={dragRef}
        data-testid="burger-ingredient"
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
