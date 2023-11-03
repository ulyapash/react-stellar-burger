import { FC, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Location } from "history";

import "@ya.praktikum/react-developer-burger-ui-components";

import { AppHeader } from "../app-header/app-header";
import { ProtectedRoute } from "../protected-route/protected-route";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";

import MainPage from "../../pages/main/main";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import IngredientDetailsPage from "../../pages/ingredient-details/ingredients-details";

import { getIngredients } from "../../services/actions/ingredientsActions";
import { userIsUserLoadingSelector } from "../../services/selectors/userSelector";
import { getUserData } from "../../services/actions/userActions";
import { ingredientsLoadingSelector } from "../../services/selectors/ingredientsSelector";

import styles from "./app.module.css";

const App: FC = () => {
  const isUserLoading = useSelector(userIsUserLoadingSelector);
  const isIngredientsLoading = useSelector(ingredientsLoadingSelector);

  const history = useHistory();
  const location = useLocation<{ previous: Location }>();
  const previousLocation = location?.state?.previous;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUserData());
  }, [dispatch]);

  if (isUserLoading || isIngredientsLoading) {
    return <p className="text text_type_main-large">Загрузка...</p>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Switch location={previousLocation || location}>
        <ProtectedRoute path="/login" exact authorized={false}>
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute path="/register" exact authorized={false}>
          <RegisterPage />
        </ProtectedRoute>
        <ProtectedRoute path="/forgot-password" exact authorized={false}>
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute path="/reset-password" exact authorized={false}>
          <ResetPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile" exact>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <div>Скоро будет реализовано</div>
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <IngredientDetailsPage />
        </Route>
        <Route path="/" exact>
          <MainPage />
        </Route>
        {previousLocation && (
          <Route path="/ingredients/:id" exact>
            <Modal
              title="Детали ингредиента"
              onClose={() => {
                history.replace({ pathname: "/" });
              }}
            >
              <IngredientDetails />
            </Modal>
          </Route>
        )}
      </Switch>
    </div>
  );
};

export default App;
