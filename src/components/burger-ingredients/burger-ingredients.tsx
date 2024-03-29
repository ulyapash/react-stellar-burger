import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Modal } from "../modal/modal";
import { BurgerIngredient } from "../burger-ingredient/burger-ingredient";

import { useModal } from "../../hooks/useModal";

import styles from "./burger-ingredients.module.css";
import { TIngredientData, useAppDispatch } from "../../types";
import { TCurrentIngredient } from "../../services/actions/currentIngredientActions";

type TProps = {
  ingredients: TIngredientData[];
};

export const BurgerDetails: FC<TProps> = ({ ingredients }) => {
  const [currentTab, setCurrentTab] = useState("Булки");

  const { isModalOpen, openModal, closeModal } = useModal();

  const ingredientsRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLHeadingElement>(null);
  const saucesRef = useRef<HTMLHeadingElement>(null);
  const mainsRef = useRef<HTMLHeadingElement>(null);

  const location = useLocation();
  const history = useHistory();
  const dispatch = useAppDispatch();

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
    const scrollTo = (ref: React.RefObject<HTMLDivElement>) =>
      ref.current!.scrollIntoView({ behavior: "smooth" });

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
    const containerY = ingredientsRef.current!.getBoundingClientRect().y;
    const bunsOffset = Math.abs(
      bunsRef.current!.getBoundingClientRect().y - containerY
    );
    const saucesOffset = Math.abs(
      saucesRef.current!.getBoundingClientRect().y - containerY
    );
    const mainsOffset = Math.abs(
      mainsRef.current!.getBoundingClientRect().y - containerY
    );

    const offsets = [bunsOffset, saucesOffset, mainsOffset];
    const ingredientTypes = ["Булки", "Соусы", "Начинки"];

    const minOffset = Math.min(...offsets);
    const indexOfMinOffset = offsets.findIndex(
      (offset) => offset === minOffset
    );

    setCurrentTab(ingredientTypes[indexOfMinOffset]);
  };

  const handleOpenModal = (ingredient: TIngredientData) => () => {
    openModal();
    dispatch({
      type: TCurrentIngredient.SET_CURRENT_INGREDIENT,
      payload: ingredient,
    });
  };

  const handleCloseModal = () => {
    closeModal();
    dispatch({
      type: TCurrentIngredient.CLEAR_CURRENT_INGREDIENT,
    });

    history.push("/");
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
              <Link
                to={{
                  pathname: `/ingredients/${bun._id}`,
                  state: { previous: location },
                }}
                key={bun._id}
              >
                <li className={styles.item} key={bun._id}>
                  <BurgerIngredient
                    ingredient={bun}
                    handleOpenModal={handleOpenModal(bun)}
                  />
                </li>
              </Link>
            ))}
          </ul>

          <h2 className="text text_type_main-medium pt-10 pb-6" ref={saucesRef}>
            Соусы
          </h2>
          <ul className={`${styles.list} pl-4 pr-4`}>
            {sauces.map((sauce) => (
              <Link
                to={{
                  pathname: `/ingredients/${sauce._id}`,
                  state: { previous: location },
                }}
                key={sauce._id}
              >
                <li className={styles.item}>
                  <BurgerIngredient
                    ingredient={sauce}
                    handleOpenModal={handleOpenModal(sauce)}
                  />
                </li>
              </Link>
            ))}
          </ul>

          <h2 className="text text_type_main-medium pt-10 pb-6" ref={mainsRef}>
            Начинки
          </h2>
          <ul className={`${styles.list} pl-4 pr-4`}>
            {mains.map((main) => (
              <Link
                to={{
                  pathname: `/ingredients/${main._id}`,
                  state: { previous: location },
                }}
                key={main._id}
              >
                <li className={styles.item} key={main._id}>
                  <BurgerIngredient
                    ingredient={main}
                    handleOpenModal={handleOpenModal(main)}
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </section>
      {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};
