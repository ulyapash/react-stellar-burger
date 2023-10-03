import iconOrderDetails from "../../images/iconOrderDetails.svg";
import styles from "./order-details.module.css";

export const OrderDetails = () => {
  return (
    <div className={`${styles.orderDetails} pt-30 pb-30`}>
      <h2 className="text text_type_digits-large mb-8">34536</h2>
      <span className="text text_type_main-medium">идентификатор заказа</span>
      <img
        src={iconOrderDetails}
        alt={"Иконка заказа"}
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
