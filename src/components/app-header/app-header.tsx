import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";

export const AppHeader: FC = () => {
  const location = useLocation();

  const currentTab = location.pathname;
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <nav className={styles.links}>
          <Link
            to="/"
            className={`${styles.link} mt-4 mr-2 mb-4 pt-4 pr-5 pb-4 pl-5`}
          >
            <BurgerIcon type={currentTab === "/" ? "primary" : "secondary"} />
            <span
              className={`text text_type_main-default ml-2 ${
                currentTab === "/"
                  ? "text_type_main-default"
                  : "text_color_inactive"
              }`}
            >
              Конструктор
            </span>
          </Link>
          <Link
            to="/feed"
            className={`${styles.link} mt-4 mr-2 mb-4 pt-4 pr-5 pb-4 pl-5`}
          >
            <ListIcon type={currentTab === "/feed" ? "primary" : "secondary"} />
            <span
              className={`text text_type_main-default ml-2 ${
                currentTab === "/feed"
                  ? "text_type_main-default"
                  : "text_color_inactive"
              }`}
            >
              Лента заказов
            </span>
          </Link>
        </nav>
        <div className={styles.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <Link
          to="/profile"
          className={`${styles.link} mt-4 mr-2 mb-4 pt-4 pr-5 pb-4 pl-5`}
        >
          <ProfileIcon
            type={currentTab === "/profile" ? "primary" : "secondary"}
          />
          <span
            className={`text text_type_main-default ml-2 ${
              currentTab === "/profile"
                ? "text_type_main-default"
                : "text_color_inactive"
            }`}
          >
            Личный кабинет
          </span>
        </Link>
      </div>
    </header>
  );
};
