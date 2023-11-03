import { FC, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import {
  userIsLoggedSelector,
  userIsLogoutLoadingSelector,
  userIsUserLoadingSelector,
  userIsUserUpdatingSelector,
  userLogoutErrorSelector,
  userUserErrorSelector,
} from "../../services/selectors/userSelector";
import { logout } from "../../services/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../types";

import styles from "./profile.module.css";
import ProfileForm from "../../components/profile-form/profile-form";
import OrderHistory from "../../components/order-history/order-history";

const ProfilePage: FC = () => {
  const isLogoutLoading = useAppSelector(userIsLogoutLoadingSelector);
  const isUserLoading = useAppSelector(userIsUserLoadingSelector);
  const isUserUpdating = useAppSelector(userIsUserUpdatingSelector);
  const isLogged = useAppSelector(userIsLoggedSelector);
  const userError = useAppSelector(userUserErrorSelector);
  const logoutError = useAppSelector(userLogoutErrorSelector);

  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isLogged) {
      history.push("/login");
    }
  }, [history, isLogged]);

  if (isUserLoading) {
    return <p className="text text_type_main-large">Загрузка...</p>;
  }

  if (isUserUpdating) {
    return (
      <p className="text text_type_main-large">
        Данные пользователя обновляются...
      </p>
    );
  }

  if (isLogoutLoading) {
    return <p className="text text_type_main-large">Выход...</p>;
  }

  if (userError) {
    return (
      <p className="text text_type_main-large">
        Возникла ошибка при получении данных пользователя
      </p>
    );
  }

  if (logoutError) {
    return (
      <p className="text text_type_main-large">
        Возникла ошибка при попытке выхода из аккаунта
      </p>
    );
  }

  return (
    <div className={styles.profile}>
      <div className={styles.links}>
        <Link to="/profile">
          <p
            className={`text text_type_main-medium pt-4 pb-4 ${
              pathname === "/profile"
                ? " text_type_main-medium"
                : "text_color_inactive"
            }`}
          >
            Профиль
          </p>
        </Link>
        <Link to="/profile/orders">
          <p
            className={`text text_type_main-medium pt-4 pb-4 ${
              pathname === "/profile/orders"
                ? " text_type_main-medium"
                : "text_color_inactive"
            }`}
          >
            История заказов
          </p>
        </Link>
        <p
          className={`${styles.link} text text_type_main-medium text_color_inactive pt-4 pb-4 mb-20`}
          onClick={handleLogout}
        >
          Выход
        </p>

        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете
          <br />
          изменить свои персональные данные
        </p>
      </div>
      {pathname === "/profile" ? <ProfileForm /> : <OrderHistory />}
    </div>
  );
};

export default ProfilePage;
