import { FC } from "react";
import { TIngredientData } from "../../types";
import { BurgerContructorElement } from "../burger-constructor-element/burger-contructor-element";

import styles from "./burger-constructor-elements.module.css";

type TProps = {
  ingredients: TIngredientData[];
};

export const BurgerConstructorElements: FC<TProps> = ({ ingredients }) => {
  return (
    <div className={`${styles.burgerConstructorElements} custom-scroll`}>
      {ingredients.map((ingredient, index) => (
        <BurgerContructorElement
          ingredient={ingredient}
          index={index}
          key={ingredient.uniqueId}
        />
      ))}
    </div>
  );
};
