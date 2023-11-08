import { FC, useEffect } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

import { TSocket } from "../../services/actions/socketActions";
import {
  feedErrorSelector,
  feedOrdersSelector,
} from "../../services/selectors/feedReducer";
import OrderFeedElement from "../order-feed-element/order-feed-element";

import { SOCKET_URL } from "../../utils/api";

import { useAppDispatch, useAppSelector } from "../../types";

import styles from "./order-history.module.css";

const OrderHistory: FC = () => {
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
