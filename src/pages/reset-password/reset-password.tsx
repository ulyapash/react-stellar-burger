import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  resetPasswordErrorSelector,
  resetPasswordLoadingSelector,
  resetPasswordResettedSelector,
} from "../../services/selectors/resetPasswordSelector";
import { resetPassword } from "../../services/actions/resetPasswordActions";
import { forgotPasswordAllowedSelector } from "../../services/selectors/forgotPasswordSelectors";

import "../../styles/form.css";

const ResetPasswordPage: FC = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const isLoading = useSelector(resetPasswordLoadingSelector);
  const isResetted = useSelector(resetPasswordResettedSelector);
  const error = useSelector(resetPasswordErrorSelector);
  const isAllowed = useSelector(forgotPasswordAllowedSelector);

  const history = useHistory();
  const dispatch = useDispatch();

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const handleCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setToken(e.target.value);
    },
    []
  );

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword({ password, token }));
  };

  useEffect(() => {
    if (isResetted) {
      history.push("/login");
    }
  }, [isResetted, history]);

  useEffect(() => {
    if (!isAllowed) {
      history.push("/forgot-password");
    }
  }, [history, isAllowed]);

  return (
    <div className="form">
      <h2 className="form__title text text_type_main-medium">
        Восстановление пароля
      </h2>
      {error && (
        <p className="form__text text text_type_main-default text_color_error pb-4">
          Возникла ошибка при сбросе пароля
        </p>
      )}
      <form className="form__content" onSubmit={handlePasswordReset}>
        <PasswordInput
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Введите новый пароль"
          disabled={isLoading}
        />
        <Input
          name="token"
          value={token}
          onChange={handleCodeChange}
          placeholder="Введите код из письма"
          disabled={isLoading}
        />
        <Button
          htmlType="submit"
          size="large"
          type="primary"
          disabled={isLoading}
        >
          {isLoading ? "Сохранение" : "Сохранить"}
        </Button>
      </form>
      <p className="form__text text text_type_main-default text_color_inactive">
        Вспомнили пароль?{" "}
        <Link className="text_color_accent" to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ResetPasswordPage;
