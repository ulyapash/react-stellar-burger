import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <nav className={styles.links}>
          <a
            href="/"
            className={`${styles.link} mt-4 mr-2 mb-4 pt-4 pr-5 pb-4 pl-5`}
          >
            <BurgerIcon className="mr-2" type="primary" />
            <span className="text text_type_main-default ml-2">
              Конструктор
            </span>
          </a>
          <a
            href="/"
            className={`${styles.link} mt-4 mr-2 mb-4 pt-4 pr-5 pb-4 pl-5`}
          >
            <ListIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2">
              Лента заказов
            </span>
          </a>
        </nav>
        <div className={styles.logo}>
          <a href="/">
            <Logo />
          </a>
        </div>
        <a
          href="/"
          className={`${styles.link} mt-4 mr-2 mb-4 pt-4 pr-5 pb-4 pl-5`}
        >
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default text_color_inactive ml-2">
            Личный кабинет
          </span>
        </a>
      </div>
    </header>
  );
};
