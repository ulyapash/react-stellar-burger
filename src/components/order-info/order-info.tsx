import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ingredientsDataSelector } from "../../services/selectors/ingredientsSelector";
import {
  feedConnectedSelector,
  feedOrdersSelector,
} from "../../services/selectors/feedReducer";
import { TFeed } from "../../services/actions/feedActions";

import {
  TFeedOrderData,
  TIngredientData,
  useAppDispatch,
  useAppSelector,
} from "../../types";

import styles from "./order-info.module.css";

const OrderInfo: FC = () => {
  const [order, setOrder] = useState<TFeedOrderData | null>(null);
  const { number } = useParams<{ number: string }>();

  const dispatch = useAppDispatch();

  const connected = useAppSelector(feedConnectedSelector);
  const orders = useAppSelector(feedOrdersSelector);
  const ingredients = useAppSelector(ingredientsDataSelector);

  const orderIngredients = useMemo(() => {
    const order = orders.find((order) => order.number === +number)!;

    if (!order) {
      return [];
    }

    setOrder(order);

    const ingredientList = order.ingredients.map((orderIngredient) => {
      const ingredientList = ingredients.find(
        (ingredient) => ingredient._id === orderIngredient
      )!;

      return {
        ...ingredientList,
        uniqueId: uuidV4(),
      }!;
    });

    const ingredientsWithCount = ingredientList.reduce<
      (TIngredientData & { count: number })[]
    >((acc, ingredientFromList) => {
      const indexOfIngredient = acc.findIndex(
        (ingredient) => ingredient._id === ingredientFromList._id
      );

      if (indexOfIngredient !== -1) {
        (
          acc[indexOfIngredient] as TIngredientData & { count: number }
        ).count += 1;
      } else {
        acc.push({ ...ingredientFromList, count: 1 });
      }

      return acc;
    }, []);

    return ingredientsWithCount;
  }, [number, ingredients, orders]);

  const sum = useMemo(() => {
    return orderIngredients.reduce((acc, ingredient) => {
      return acc + ingredient.price!;
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

  useEffect(() => {
    if (!connected) {
      dispatch({
        type: TFeed.FEED_CONNECTION_START,
        payload: "/orders/all",
      });

      return () => {
        dispatch({
          type: TFeed.FEED_CONNECTION_CLOSE,
        });
      };
    }
  }, []);

  if (!order) {
    return null;
  }

  return (
    <div className={styles.orderInfo}>
      <div className={`${styles.heading} text text_type_digits-default mb-10`}>
        #{order.number}
      </div>
      <div className="text text_type_main-medium mb-3">{order.name}</div>
      <div
        className={`${
          order.status === "done" && styles.statusDone
        } text text_type_main-default mb-15`}
      >
        {convertStatusToText(order.status)}
      </div>
      <div className="text text_type_main-medium mb-6">Состав:</div>
      <div className={`${styles.ingredients} mb-10`}>
        {orderIngredients.map((ingredient) => (
          <div className={styles.ingredient} key={ingredient.uniqueId}>
            <div className={styles.ingredientPreview}>
              <img
                className={styles.igredientImage}
                src={ingredient.image}
                alt={ingredient.name}
              />
            </div>
            <div
              className={`${styles.ingredientName} text text_type_main-default ml-4 mr-4`}
            >
              {ingredient.name}
            </div>
            <div className={styles.ingredientCount}>
              <div className="text text_type_digits-default mr-2">
                {ingredient.count} x {ingredient.price}
              </div>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.metaData}>
        <div className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.updatedAt)} />
        </div>
        <div className={styles.sum}>
          <div className="text text_type_digits-default mr-2">{sum}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
