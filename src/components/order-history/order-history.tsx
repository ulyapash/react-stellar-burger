import { FC, useEffect } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

import { TFeed } from "../../services/actions/feedActions";
import {
  feedErrorSelector,
  feedOrdersSelector,
} from "../../services/selectors/feedReducer";

import { useAppDispatch, useAppSelector } from "../../types";

import styles from "./order-history.module.css";
import OrderFeedElement from "../order-feed-element/order-feed-element";

const OrderHistory: FC = () => {
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
    <div className={`${styles.orderHistory} custom-scrol pr-2`}>
      {orders.map((order) => (
        <Link
          to={{
            pathname: path + `/orders/${order.number}`,
            state: { previous: location },
          }}
          key={order.uniqueId}
        >
          <OrderFeedElement order={order} />
        </Link>
      ))}
    </div>
  );
};

export default OrderHistory;
