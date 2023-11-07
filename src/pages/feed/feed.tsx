import { FC } from "react";

import OrdersFeed from "../../components/order-feed/order-feed";
import StatusFeed from "../../components/status-feed/status-feed";

import styles from "./feed.module.css";

const FeedPage: FC = () => {
  return (
    <div className={styles.feed}>
      <h2 className={`${styles.heading}text text_type_main-large pl-5`}>
        Лента заказов
      </h2>
      <div className={styles.content}>
        <div className={`${styles.column} mr-15`}>
          <OrdersFeed />
        </div>
        <div className={styles.column}>
          <StatusFeed />
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
