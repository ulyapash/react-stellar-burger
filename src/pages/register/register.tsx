import { FC, useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  userIsRegisterLoadingSelector,
  userRegisterErrorSelector,
  userIsLoggedSelector,
} from "../../services/selectors/userSelector";
import { register } from "../../services/actions/userActions";

import { useAppDispatch, useAppSelector } from "../../types";

import "../../styles/form.css";

const RegisterPage: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useAppSelector(userIsRegisterLoadingSelector);
  const isLogged = useAppSelector(userIsLoggedSelector);
  const error = useAppSelector(userRegisterErrorSelector);

  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    []
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  useEffect(() => {
    if (isLogged) {
      history.push("/");
    }
  }, [history, isLogged]);

  return (
    <div className="form">
      <h2 className="form__title text text_type_main-medium">Регистрация</h2>
      {error && (
        <p className="form__text text text_type_main-default text_color_error pb-4">
          Возникла ошибка при регистрации
        </p>
      )}
      <form className="form__content" onSubmit={handleRegistration}>
        <Input
          name="name"
          value={name}
          placeholder="Имя"
          onChange={handleNameChange}
          disabled={isLoading}
        />
        <EmailInput
          name="email"
          value={email}
          onChange={handleEmailChange}
          disabled={isLoading}
        />
        <PasswordInput
          name="email"
          value={password}
          onChange={handlePasswordChange}
          disabled={isLoading}
        />
        <Button
          htmlType="submit"
          size="large"
          type="primary"
          disabled={isLoading}
        >
          {isLoading ? "Выполняется регистрация" : "Зарегистрироваться"}
        </Button>
      </form>
      <p className="form__text text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{" "}
        <Link className="text_color_accent" to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
