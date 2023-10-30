import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import "../../styles/form.css";
import { register } from "../../services/actions/userActions";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector(userIsRegisterLoadingSelector);
  const isLogged = useSelector(userIsLoggedSelector);
  const error = useSelector(userRegisterErrorSelector);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleRegistration = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  console.log(isLogged);

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
