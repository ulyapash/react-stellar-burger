import { FC, useCallback, useEffect, useState } from "react";

import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  userDataSelector,
  userUserUpdateErrorSelector,
} from "../../services/selectors/userSelector";
import { updateUser } from "../../services/actions/userActions";

import { useAppDispatch, useAppSelector } from "../../types";

import styles from "./profile-form.module.css";

const ProfileForm: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserDataChanged, setIsUserDataChanged] = useState(false);

  const userData = useAppSelector(userDataSelector);
  const userUpdateError = useAppSelector(userUserUpdateErrorSelector);

  const dispatch = useAppDispatch();

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsUserDataChanged(true);
      setName(e.target.value);
    },
    []
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsUserDataChanged(true);
      setEmail(e.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsUserDataChanged(true);
      setPassword(e.target.value);
    },
    []
  );

  const handleSubmitUserUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser({ name, email }));
    setIsUserDataChanged(false);
  };

  const handleCancelClick = useCallback(() => {
    setName(userData!.name);
    setEmail(userData!.email);
    setIsUserDataChanged(false);
  }, [userData]);

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
    }
  }, [userData]);

  return (
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
  );
};

export default ProfileForm;
