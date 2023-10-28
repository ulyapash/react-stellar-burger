import PropTypes from "prop-types";

import { BurgerContructorElement } from "../burger-constructor-element/burger-contructor-element";
import { ingredientPropType } from "../../utils/prop-types";

import styles from "./burger-constructor-elements.module.css";

export const BurgerConstructorElements = ({ ingredients }) => {
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

BurgerConstructorElements.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType),
};
