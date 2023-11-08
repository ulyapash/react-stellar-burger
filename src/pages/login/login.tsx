import { FC, useCallback, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { login } from "../../services/actions/userActions";
import {
  userDataSelector,
  userIsLoggedSelector,
  userIsLoginLoadingSelector,
  userLoginErrorSelector,
} from "../../services/selectors/userSelector";

import { useAppDispatch, useAppSelector } from "../../types";

import "../../styles/form.css";

const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useAppSelector(userIsLoginLoadingSelector);
  const userData = useAppSelector(userDataSelector);
  const isLogged = useAppSelector(userIsLoggedSelector);
  const error = useAppSelector(userLoginErrorSelector);

  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<{ from: string }>();

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (!isLoading && userData && !error && isLogged) {
      history.push(location?.state?.from || "/");
    }
  }, [history, location?.state?.from, isLoading, userData, isLogged, error]);

  return (
    <div className="form">
      <h2 className="form__title text text_type_main-medium">Вход</h2>
      {error && (
        <p className="form__text text text_type_main-default text_color_error pb-4">
          Возникла ошибка при входе
        </p>
      )}
      <form className="form__content" onSubmit={handleLogin}>
        <EmailInput
          name="email"
          value={email}
          onChange={handleEmailChange}
          disabled={isLoading}
          data-testid="email-field"
        />
        <PasswordInput
          name="email"
          value={password}
          onChange={handlePasswordChange}
          disabled={isLoading}
          data-testid="password-field"
        />
        <Button
          htmlType="submit"
          size="large"
          type="primary"
          disabled={isLoading}
          data-testid="submit-button"
        >
          {isLoading ? "Выполняется вход" : "Войти"}
        </Button>
      </form>
      <p className="form__text text text_type_main-default text_color_inactive mb-4">
        Вы — новый пользователь?{" "}
        <Link className="text_color_accent" to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="form__text text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <Link className="text_color_accent" to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
