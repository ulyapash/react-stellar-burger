import PropTypes from "prop-types";

import iconOrderDetails from "../../images/iconOrderDetails.svg";
import styles from "./order-details.module.css";

export const OrderDetails = ({ name, number }) => {
  return (
    <div className={`${styles.orderDetails} pt-30 pr-25 pb-30 pl-25`}>
      <h2 className="text text_type_digits-large mb-8">{number}</h2>
      <span className="text text_type_main-medium">{name}</span>
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

OrderDetails.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};
