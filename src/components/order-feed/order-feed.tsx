import { FC, useEffect } from "react";

import { TFeed } from "../../services/actions/feedActions";
import { useAppDispatch, useAppSelector } from "../../types";
import {
  feedErrorSelector,
  feedOrdersSelector,
} from "../../services/selectors/feedReducer";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

import OrderFeedElement from "../order-feed-element/order-feed-element";

import styles from "./order-feed.module.css";

const OrderFeed: FC = () => {
  const orders = useAppSelector(feedOrdersSelector);
  const error = useAppSelector(feedErrorSelector);

  const dispatch = useAppDispatch();

  const { path } = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    dispatch({
      type: TFeed.FEED_CONNECTION_START,
      payload: "/orders/all",
    });

    return () => {
      dispatch({
        type: TFeed.FEED_CONNECTION_CLOSE,
      });
    };
  }, [dispatch]);

  if (!orders) {
    return <p className="text text_type_main-large">Загрузка...</p>;
  }

  if (error) {
    return (
      <p className="text text_type_main-large">
        Возникал ошибка при загрузке заказов
      </p>
    );
  }

  return (
    <div className={`${styles.feed} custom-scroll pr-2`}>
      {orders.map((order) => {
        return (
          <Link
            to={{
              pathname: path + `/${order.number}`,
              state: { previous: location },
            }}
            key={order.uniqueId}
          >
            <OrderFeedElement order={order} />
          </Link>
        );
      })}
    </div>
  );
};

export default OrderFeed;
