import { FC, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
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

import { useAppDispatch, useAppSelector } from "../../types";

import styles from "./app.module.css";
import FeedPage from "../../pages/feed/feed";
import OrderInfo from "../order-info/order-info";

const App: FC = () => {
  const isUserLoading = useAppSelector(userIsUserLoadingSelector);
  const isIngredientsLoading = useAppSelector(ingredientsLoadingSelector);

  const history = useHistory();
  const location = useLocation<{ previous: Location }>();
  const previousLocation = location.state && location.state.previous;
  const dispatch = useAppDispatch();

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
        <ProtectedRoute path="/profile/orders/:number" exact>
          <OrderInfo />
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/feed/:number" exact>
          <OrderInfo />
        </Route>
        <Route path="/feed" exact>
          <FeedPage />
        </Route>
        <Route path="/ingredients/:id" exact>
          <IngredientDetailsPage />
        </Route>
        <Route path="/" exact>
          <MainPage />
        </Route>
      </Switch>
      {previousLocation && (
        <>
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
          <Route path="/feed/:number" exact>
            <Modal
              onClose={() => {
                history.replace({ pathname: "/feed" });
              }}
            >
              <OrderInfo />
            </Modal>
          </Route>
          <ProtectedRoute path="/profile/orders/:number" exact>
            <Modal
              onClose={() => {
                history.replace({ pathname: "/profile/orders" });
              }}
            >
              <OrderInfo />
            </Modal>
          </ProtectedRoute>
        </>
      )}
    </div>
  );
};

export default App;
