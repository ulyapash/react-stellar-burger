import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Modal } from "../modal/modal";
import { BurgerIngredient } from "../burger-ingredient/burger-ingredient";
import { ingredientPropType } from "../../utils/prop-types";

import styles from "./burger-ingredients.module.css";
import {
  CLEAR_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT,
} from "../../services/actions/currentIngredientActions";

export const BurgerDetails = ({ ingredients }) => {
  const [currentTab, setCurrentTab] = useState("Булки");
  const [isModalOpened, setIsModalOpened] = useState(false);

  const ingredientsRef = useRef(null);
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const dispatch = useDispatch();

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

  useEffect(() => {
    const scrollTo = (ref) =>
      ref.current.scrollIntoView({ behavior: "smooth" });

    switch (currentTab) {
      case "Булки":
        scrollTo(bunsRef);
        break;
      case "Соусы":
        scrollTo(saucesRef);
        break;
      case "Начинки":
        scrollTo(mainsRef);
        break;
      default:
        break;
    }
  }, [currentTab]);

  const handleIngredientScroll = () => {
    const containerY = ingredientsRef.current.getBoundingClientRect().y;
    const bunsOffset = Math.abs(
      bunsRef.current.getBoundingClientRect().y - containerY
    );
    const saucesOffset = Math.abs(
      saucesRef.current.getBoundingClientRect().y - containerY
    );
    const mainsOffset = Math.abs(
      mainsRef.current.getBoundingClientRect().y - containerY
    );

    const offsets = [bunsOffset, saucesOffset, mainsOffset];
    const ingredientTypes = ["Булки", "Соусы", "Начинки"];

    const minOffset = Math.min(...offsets);
    const indexOfMinOffset = offsets.findIndex(
      (offset) => offset === minOffset
    );

    setCurrentTab(ingredientTypes[indexOfMinOffset]);
  };

  const handleOpenModal = (ingredient) => () => {
    setIsModalOpened(true);
    dispatch({
      type: SET_CURRENT_INGREDIENT,
      payload: ingredient,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
    dispatch({
      type: CLEAR_CURRENT_INGREDIENT,
    });
  };

  return (
    <>
      <section className={`${styles.burgerDetails} pt-10 pl-5 pl-5`}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <nav className={`${styles.tabs} pt-5`}>
          <Tab
            value="Булки"
            active={currentTab === "Булки"}
            onClick={() => setCurrentTab("Булки")}
          >
            Булки
          </Tab>
          <Tab
            value="Соусы"
            active={currentTab === "Соусы"}
            onClick={() => setCurrentTab("Соусы")}
          >
            Соусы
          </Tab>
          <Tab
            value="Начинки"
            active={currentTab === "Начинки"}
            onClick={() => setCurrentTab("Начинки")}
          >
            Начинки
          </Tab>
        </nav>
        <div
          className={`${styles.content} custom-scroll mt-10`}
          ref={ingredientsRef}
          onScroll={handleIngredientScroll}
        >
          <h2 className="text text_type_main-medium pb-6" ref={bunsRef}>
            Булки
          </h2>
          <ul className={`${styles.list} pl-4 pr-4`}>
            {buns.map((bun) => (
              <li className={styles.item} key={bun._id}>
                <BurgerIngredient
                  ingredient={bun}
                  handleOpenModal={handleOpenModal(bun)}
                />
              </li>
            ))}
          </ul>

          <h2 className="text text_type_main-medium pt-10 pb-6" ref={saucesRef}>
            Соусы
          </h2>
          <ul className={`${styles.list} pl-4 pr-4`}>
            {sauces.map((sauce) => (
              <li className={styles.item} key={sauce._id}>
                <BurgerIngredient
                  ingredient={sauce}
                  handleOpenModal={handleOpenModal(sauce)}
                />
              </li>
            ))}
          </ul>

          <h2 className="text text_type_main-medium pt-10 pb-6" ref={mainsRef}>
            Начинки
          </h2>
          <ul className={`${styles.list} pl-4 pr-4`}>
            {mains.map((main) => (
              <li className={styles.item} key={main._id}>
                <BurgerIngredient
                  ingredient={main}
                  handleOpenModal={handleOpenModal(main)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      {isModalOpened && (
        <Modal onClose={handleCloseModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

BurgerDetails.propTypes = {
  ingridients: PropTypes.arrayOf(ingredientPropType),
};
