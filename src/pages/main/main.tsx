import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { BurgerDetails } from "../../components/burger-ingredients/burger-ingredients";
import { BurgerContructor } from "../../components/burger-constructor/burger-constructor";

import {
  ingredientsDataSelector,
  ingredientsErrorSelector,
  ingredientsLoadingSelector,
} from "../../services/selectors/ingredientsSelector";
import { useAppSelector } from "../../types";

import styles from "./main.module.css";

const MainPage: FC = () => {
  const isLoading = useAppSelector(ingredientsLoadingSelector);
  const ingredients = useAppSelector(ingredientsDataSelector);
  const error = useAppSelector(ingredientsErrorSelector);

  if (isLoading) {
    return <p className="text text_type_main-large">Загрузка...</p>;
  }

  if (error) {
    return <p className="text text_type_main-large">{error}</p>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={`${styles.burgerComponents} custom-scroll`}>
        <BurgerDetails ingredients={ingredients} />
        <BurgerContructor />
      </main>
    </DndProvider>
  );
};

export default MainPage;
