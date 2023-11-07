import { FC, useMemo } from "react";

import {
  feedOrdersSelector,
  feedTotalOrdersSelector,
  feedTotalOrdersTodaySelector,
} from "../../services/selectors/feedReducer";

import { useAppSelector } from "../../types";

import styles from "./status-feed.module.css";

const StatusFeed: FC = () => {
  const orders = useAppSelector(feedOrdersSelector);
  const totalOrders = useAppSelector(feedTotalOrdersSelector);
  const totalOrdersToday = useAppSelector(feedTotalOrdersTodaySelector);

  const doneOrders = useMemo(
    () => orders.filter((order) => order.status === "done").slice(0, 20),
    [orders]
  );

  const pendingOrders = orders
    .filter((order) => order.status === "pending")
    .slice(0, 20);

  return (
    <div className={styles.statusFeed}>
      <div className={`${styles.orderStatuses} mb-15`}>
        <div className={`${styles.orderStatus} mr-9`}>
          <h3 className="text text_type_main-medium pb-6">Готовы:</h3>
          <div className={`${styles.statusDone} text text_type_digits-default`}>
            <div className={styles.orderNumbers}>
              {doneOrders.map((order) => (
                <div key={order.uniqueId}>{order.number}</div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.ordersDashboardStatus}>
          <h2 className="text text_type_main-medium pb-6">В работе:</h2>
          <div className="text text_type_digits-default">
            <div className={styles.orderDashboardNumbers}>
              {pendingOrders.map((order) => (
                <div key={order.uniqueId}>{order.number}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
      <p className="text text_type_digits-large mb-15">{totalOrders}</p>
      <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
      <p className="text text_type_digits-large">{totalOrdersToday}</p>
    </div>
  );
};

export default StatusFeed;
