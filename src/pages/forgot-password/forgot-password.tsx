import { FC, useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  forgotPasswordErrorSelector,
  forgotPasswordAllowedSelector,
  forgotPasswordLoadingSelector,
} from "../../services/selectors/forgotPasswordSelectors";
import { forgotPassword } from "../../services/actions/forgotPasswordActions";

import "../../styles/form.css";

const ForgotPasswordPage: FC = () => {
  const [email, setEmail] = useState("");
  const isLoading = useSelector(forgotPasswordLoadingSelector);
  const isAllowed = useSelector(forgotPasswordAllowedSelector);
  const error = useSelector(forgotPasswordErrorSelector);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (isAllowed) {
      history.push("/reset-password");
    }
  }, [isAllowed, history]);

  return (
    <div className="form">
      <h2 className="form__title text text_type_main-medium">
        Восстановление пароля
      </h2>
      <p className="form__text text text_type_main-default text_color_inactive pb-4">
        Вспомнили пароль?{" "}
        <Link className="text_color_accent" to="/login">
          Войти
        </Link>
      </p>
      <form className="form__content" onSubmit={handlePasswordRecovery}>
        <EmailInput
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Укажите e-mail"
          disabled={isLoading}
        />
        <Button
          htmlType="submit"
          size="large"
          type="primary"
          disabled={isLoading}
        >
          {isLoading ? "Восстановление" : "Восстановить"}
        </Button>
      </form>
      {error && (
        <p className="form__text text text_type_main-default text_color_error">
          Возникла ошибка при отправке кода на почту
        </p>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
