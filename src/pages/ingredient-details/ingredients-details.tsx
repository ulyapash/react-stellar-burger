import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";

import styles from "./ingredient-details.module.css";
import { ingredientsDataSelector } from "../../services/selectors/ingredientsSelector";
import { TCurrentIngredient } from "../../services/actions/currentIngredientActions";

const IngredientDetailsPage: FC = () => {
  const ingredients = useSelector(ingredientsDataSelector);
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: TCurrentIngredient.SET_CURRENT_INGREDIENT,
      payload: ingredients.find((ingredient) => ingredient._id === id),
    });
  }, [dispatch, ingredients, id]);

  return (
    <div className={styles.ingredientDetails}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      <IngredientDetails />
    </div>
  );
};

export default IngredientDetailsPage;
