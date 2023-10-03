import { useMemo } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { BurgerIngredient } from "../burger-ingredient/burger-ingredient";
import { ingredientPropType } from "../../utils/prop-types";

import styles from "./burger-ingredients.module.css";

export const BurgerDetails = ({ ingredients }) => {
  const buns = useMemo(
    () => ingredients.filter((ingridient) => ingridient.type === "bun"),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((ingridient) => ingridient.type === "sauce"),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((ingridient) => ingridient.type === "main"),
    [ingredients]
  );

  return (
    <section className={`${styles.burgerDetails} pt-10 pl-5 pl-5`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <nav className={`${styles.tabs} pt-5`}>
        <Tab value="Булки" active>
          Булки
        </Tab>
        <Tab value="Соусы">Соусы</Tab>
        <Tab value="Начинки">Начинки</Tab>
      </nav>
      <main className={`${styles.content} custom-scroll mt-10`}>
        <h2 className="text text_type_main-medium pb-6">Булки</h2>
        <ul className={`${styles.list} pl-4 pr-4`}>
          {buns.map((bun) => (
            <li className={styles.item} key={bun._id}>
              <BurgerIngredient ingredient={bun} />
            </li>
          ))}
        </ul>

        <h2 className="text text_type_main-medium pt-10 pb-6">Соусы</h2>
        <ul className={`${styles.list} pl-4 pr-4`}>
          {sauces.map((sauce) => (
            <li className={styles.item} key={sauce._id}>
              <BurgerIngredient ingredient={sauce} />
            </li>
          ))}
        </ul>

        <h2 className="text text_type_main-medium pt-10 pb-6">Начинки</h2>
        <ul className={`${styles.list} pl-4 pr-4`}>
          {mains.map((main) => (
            <li className={styles.item} key={main._id}>
              <BurgerIngredient ingredient={main} />
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
};

BurgerDetails.propTypes = {
  ingridients: PropTypes.arrayOf(ingredientPropType),
};
