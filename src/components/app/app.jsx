import "@ya.praktikum/react-developer-burger-ui-components";

import { AppHeader } from "../app-header/app-header";
import { BurgerDetails } from "../burger-ingredients/burger-ingredients";
import { BurgerContructor } from "../burger-constructor/burger-constructor";

import styles from "./app.module.css";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredientsActions";
import { useDispatch, useSelector } from "react-redux";
import {
  ingredientsDataSelector,
  ingredientsErrorSelector,
  ingredientsLoadingSelector,
} from "../../services/selectors/ingredientsSelector";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(ingredientsLoadingSelector);
  const ingredients = useSelector(ingredientsDataSelector);
  const error = useSelector(ingredientsErrorSelector);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (isLoading) {
    return <p className="text text_type_main-large">Загрузка...</p>;
  }

  if (error) {
    return <p className="text text_type_main-large">{error}</p>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.burgerComponents} custom-scroll`}>
        <BurgerDetails ingredients={ingredients} />
        <BurgerContructor />
      </main>
    </div>
  );
}

export default App;
