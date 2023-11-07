import { FC, useEffect } from "react";

import {
  feedErrorSelector,
  feedOrdersSelector,
} from "../../services/selectors/feedReducer";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

import OrderFeedElement from "../order-feed-element/order-feed-element";
import { TSocket } from "../../services/actions/socketActions";
import { SOCKET_URL } from "../../utils/api";

import { useAppDispatch, useAppSelector } from "../../types";

import styles from "./order-feed.module.css";

const OrderFeed: FC = () => {
  const orders = useAppSelector(feedOrdersSelector);
  const error = useAppSelector(feedErrorSelector);

  const dispatch = useAppDispatch();

  const { path } = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    dispatch({
      type: TSocket.SOCKET_CONNECTION_START,
      payload: SOCKET_URL + "/orders/all",
    });

    return () => {
      dispatch({
        type: TSocket.SOCKET_CONNECTION_CLOSE,
      });
    };
  }, [dispatch]);

  if (!orders) {
    return <p className="text text_type_main-large">Загрузка...</p>;
  }

  if (error) {
    return (
      <p className="text text_type_main-large">
        Возникла ошибка при загрузке заказов
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
