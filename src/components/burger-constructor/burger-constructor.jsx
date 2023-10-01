import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { BurgerConstructorElements } from "../burger-constructor-elements/burger-constructor-elements";
import { ingredientPropType } from "../../utils/prop-types";

import styles from "./burger-constructor.module.css";

export const BurgerContructor = ({ ingredients }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const totalSum = useMemo(
    () => ingredients.reduce((sum, ingredient) => sum + ingredient.price, 40), // 40 is bun (up) + bun(bottom)
    [ingredients]
  );

  const handleOpenModal = () => {
    setIsModalOpened(true);
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
  };

  return (
    <>
      <section className={`${styles.burgerConstructor} mt-25 mb-8`}>
        <div className="ml-8 mr-8">
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
            price={20}
            isLocked
          />
        </div>
        <BurgerConstructorElements ingredients={ingredients} />
        <div className="ml-8 mr-8">
          <ConstructorElement
            text="Краторная булка N-200i (низ)"
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
            price={20}
            isLocked
          />
        </div>
        <div className={`${styles.orderInfo} mt-10 mr-8 ml-8`}>
          <div className={styles.orderPrice}>
            <p className="text text_type_digits-medium">{totalSum}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleOpenModal}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModalOpened && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

BurgerContructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType),
};
