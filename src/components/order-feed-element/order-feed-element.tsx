import { FC, useMemo } from "react";
import { v4 as uuidV4 } from "uuid";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ingredientsDataSelector } from "../../services/selectors/ingredientsSelector";

import { TFeedOrderData, useAppSelector } from "../../types";

import styles from "./order-feed-element.module.css";

type TProps = {
  order: TFeedOrderData;
  showStatus?: boolean;
};

const OrderFeedElement: FC<TProps> = ({ order, showStatus }) => {
  const ingredients = useAppSelector(ingredientsDataSelector);

  const orderIngredients = useMemo(() => {
    return order.ingredients.map((orderIngredient) => {
      return {
        ...ingredients.find(
          (ingredient) => ingredient._id === orderIngredient
        )!,
        uniqueId: uuidV4(),
      };
    });
  }, [ingredients, order.ingredients]);

  const [ingredientPreviews, leftIngredientsNumber] = useMemo(() => {
    if (orderIngredients.length > 5) {
      return [orderIngredients.slice(0, 6), orderIngredients.length - 5];
    }

    return [[...orderIngredients], 0];
  }, [orderIngredients]);

  const sum = useMemo(() => {
    return orderIngredients.reduce((acc, ingredient) => {
      return acc + ingredient.price;
    }, 0);
  }, [orderIngredients]);

  const convertStatusToText = (status: TFeedOrderData["status"]) => {
    switch (status) {
      case "created":
        return "Создан";
      case "pending":
        return "Готовится";
      case "done":
        return "Выполнен";
      default:
        return "Ошибочный статус";
    }
  };

  return (
    <div className={`${styles.orderFeedElement} mb-4 p-6`}>
      <div className={styles.additionalInfo}>
        <div className="text text_type_digits-default">#{order.number}</div>
        <div className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.updatedAt)} />
        </div>
      </div>
      <div>
        <div className="text text_type_main-medium mt-6">{order.name}</div>
        {showStatus && (
          <div
            className={`${
              order.status === "done" && styles.statusDone
            } text text_type_main-default mt-2`}
          >
            {convertStatusToText(order.status)}
          </div>
        )}
      </div>
      <div className={`${styles.info} mt-6`}>
        <div className={styles.ingredients}>
          {ingredientPreviews.map((ingredient, i) => (
            <div className={styles.ingredientPreview} key={ingredient.uniqueId}>
              <img
                className={styles.igredientImage}
                src={ingredient.image}
                alt={ingredient.name}
              />
              {i === 5 && (
                <div
                  className={`${styles.leftIngredients} text text_type_main-default ml-6`}
                >{`+${leftIngredientsNumber}`}</div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.sum}>
          <div className="text text_type_digits-default mr-2">{sum}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderFeedElement;
