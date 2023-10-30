import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";
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
import {
  bunSelector,
  burgerIngredientsSelector,
} from "../../services/selectors/burgerConstructorSelector";
import {
  CLEAR_CONSTRUCTOR,
  putBun,
  putBurgerIngredient,
} from "../../services/actions/burgerConstructorActions";
import {
  orderErrorSelector,
  orderLoadingSelector,
  orderNameSelector,
  orderNumberSelector,
} from "../../services/selectors/orderSelector";
import { makeOrder } from "../../services/actions/orderActions";
import { useModal } from "../../hooks/useModal";

import styles from "./burger-constructor.module.css";
import { userIsLoggedSelector } from "../../services/selectors/userSelector";

export const BurgerContructor = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const history = useHistory();
  const dispatch = useDispatch();

  const bun = useSelector(bunSelector);
  const burgerIngredients = useSelector(burgerIngredientsSelector);
  const isLogged = useSelector(userIsLoggedSelector);

  const orderLoading = useSelector(orderLoadingSelector);
  const orderName = useSelector(orderNameSelector);
  const orderNumber = useSelector(orderNumberSelector);
  const orderError = useSelector(orderErrorSelector);

  useEffect(() => {
    if (orderName && orderNumber) {
      dispatch({
        type: CLEAR_CONSTRUCTOR,
      });
      openModal();
    }
  }, [dispatch, orderName, orderNumber, openModal]);

  const handleOrderMaking = () => {
    if (!isLogged) {
      history.push("/login");
    } else {
      dispatch(
        makeOrder(
          burgerIngredients.map((ingredient) => ingredient._id).concat(bun._id)
        )
      );
    }
  };

  const totalSum = useMemo(
    () =>
      burgerIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0) +
      (bun ? bun.price * 2 : 0),
    [burgerIngredients, bun]
  );

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      if (ingredient.type === "bun") {
        dispatch(putBun(ingredient));
      } else {
        dispatch(putBurgerIngredient(ingredient));
      }
    },
  });

  if (orderError) {
    return <p className="text text_type_main-large mt-10">{orderError}</p>;
  }

  return (
    <>
      <section
        className={`${styles.burgerConstructor} mt-25 mb-8`}
        ref={dropTarget}
      >
        {bun && (
          <div className="ml-8 mr-8">
            <ConstructorElement
              text={`${bun.name} (верх)`}
              thumbnail={bun.image}
              price={bun.price}
              type="top"
              isLocked
            />
          </div>
        )}
        <BurgerConstructorElements ingredients={burgerIngredients} />
        {bun && (
          <div className="ml-8 mr-8">
            <ConstructorElement
              text={`${bun.name} (низ)`}
              thumbnail={bun.image}
              price={bun.price}
              type="bottom"
              isLocked
            />
          </div>
        )}
        <div className={`${styles.orderInfo} mt-10 mr-8 ml-8`}>
          <div className={styles.orderPrice}>
            <p className="text text_type_digits-medium mr-2">{totalSum}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            disabled={burgerIngredients.length === 0 || orderLoading || !bun}
            onClick={handleOrderMaking}
          >
            {orderLoading ? "Оформление..." : "Оформить заказ"}
          </Button>
        </div>
      </section>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails name={orderName} number={orderNumber} />
        </Modal>
      )}
    </>
  );
};

BurgerContructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType),
};
