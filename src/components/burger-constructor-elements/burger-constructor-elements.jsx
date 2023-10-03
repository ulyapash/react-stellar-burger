import PropTypes from "prop-types";

import { BurgerContructorElement } from "../burger-constructor-element/burger-contructor-element";
import { ingredientPropType } from "../../utils/prop-types";

import styles from "./burger-constructor-elements.module.css";

export const BurgerConstructorElements = ({ ingredients }) => {
  return (
    <main className={`${styles.burgerConstructorElements} custom-scroll`}>
      {ingredients.map((ingredient) => (
        <BurgerContructorElement ingredient={ingredient} key={ingredient._id} />
      ))}
    </main>
  );
};

BurgerConstructorElements.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType),
};
