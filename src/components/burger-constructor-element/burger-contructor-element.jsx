import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ingredientPropType } from "../../utils/prop-types";

import styles from "./burger-contructor-element.module.css";

export const BurgerContructorElement = ({ ingredient }) => {
  return (
    <div className={styles.burderConstructorElement}>
      <DragIcon className="mr-2" type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </div>
  );
};

BurgerContructorElement.propTypes = {
  ingredient: ingredientPropType,
};
