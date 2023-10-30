import { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  userDataSelector,
  userIsLoggedSelector,
  userIsLogoutLoadingSelector,
  userIsUserLoadingSelector,
  userIsUserUpdatingSelector,
  userLogoutErrorSelector,
  userUserErrorSelector,
  userUserUpdateErrorSelector,
} from "../../services/selectors/userSelector";
import { logout, updateUser } from "../../services/actions/userActions";

import styles from "./profile.module.css";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserDataChanged, setIsUserDataChanged] = useState("");

  const isLogoutLoading = useSelector(userIsLogoutLoadingSelector);
  const isUserLoading = useSelector(userIsUserLoadingSelector);
  const isUserUpdating = useSelector(userIsUserUpdatingSelector);
  const userData = useSelector(userDataSelector);
  const isLogged = useSelector(userIsLoggedSelector);
  const userError = useSelector(userUserErrorSelector);
  const userUpdateError = useSelector(userUserUpdateErrorSelector);
  const logoutError = useSelector(userLogoutErrorSelector);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleNameChange = useCallback((e) => {
    setIsUserDataChanged(true);
    setName(e.target.value);
  }, []);

  const handleEmailChange = useCallback((e) => {
    setIsUserDataChanged(true);
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setIsUserDataChanged(true);
    setPassword(e.target.value);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSubmitUserUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser({ name, email }));
    setIsUserDataChanged(false);
  };

  const handleCancelClick = useCallback(() => {
    setName(userData.name);
    setEmail(userData.email);
    setIsUserDataChanged(false);
  }, [userData.name, userData.email]);

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
    }
  }, [userData]);

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
        <p className="text text_type_main-medium pt-4 pb-4">Профиль</p>
        <Link to="/profile/orders">
          <p className="text text_type_main-medium text_color_inactive pt-4 pb-4">
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
      <form className={styles.inputs} onSubmit={handleSubmitUserUpdate}>
        {userUpdateError && (
          <p className="form__text text text_type_main-default text_color_error pb-4">
            Возникла ошибка при обновлении данных пользователя
          </p>
        )}
        <Input
          type="text"
          name="name"
          placeholder="Имя"
          icon="EditIcon"
          value={name}
          onChange={handleNameChange}
        />
        <EmailInput
          name="email"
          placeholder="Логин"
          icon="EditIcon"
          value={email}
          onChange={handleEmailChange}
        />
        <PasswordInput
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
        />
        {isUserDataChanged && (
          <div>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
            <Button
              htmlType="button"
              type="secondary"
              onClick={handleCancelClick}
            >
              Отмена
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
