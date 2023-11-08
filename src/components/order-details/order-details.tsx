import { FC } from "react";

import iconOrderDetails from "../../images/iconOrderDetails.svg";
import styles from "./order-details.module.css";

type TProps = {
  name: string;
  number: number;
};

export const OrderDetails: FC<TProps> = ({ name, number }) => {
  return (
    <div className={`${styles.orderDetails} pt-30 pr-25 pb-30 pl-25`}>
      <h2
        className="text text_type_digits-large mb-8"
        data-testid="order-number"
      >
        {number}
      </h2>
      <span className="text text_type_main-medium" data-testid="order-name">
        {name}
      </span>
      <img
        src={iconOrderDetails}
        alt={"Иконка подтвеждения заказа"}
        className="mt-15 mb-15"
      />
      <span className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </span>
      <span className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};
