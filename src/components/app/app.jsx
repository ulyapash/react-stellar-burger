import { useEffect, useState } from "react";
import "@ya.praktikum/react-developer-burger-ui-components";

import { AppHeader } from "../app-header/app-header";
import { BurgerDetails } from "../burger-ingredients/burger-ingredients";
import { BurgerContructor } from "../burger-constructor/burger-constructor";

import styles from "./app.module.css";

function App() {
  const [ingredients, setIngredients] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((response) => {
        response.json().then((result) => {
          if (result.success) {
            setIngredients(result.data);
          }
          setIsLoading(false);
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error: ", error);
      });
  }, []);

  if (isLoading) {
    return <p className="text text_type_main-large">Загрузка...</p>;
  }

  if (!ingredients) {
    return <p className="text text_type_main-large">Произошла ошибка</p>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.burgerComponents} custom-scroll`}>
        <BurgerDetails ingredients={ingredients} />
        <BurgerContructor ingredients={ingredients} />
      </main>
    </div>
  );
}

export default App;
