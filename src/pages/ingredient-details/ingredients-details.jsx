import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import { SET_CURRENT_INGREDIENT } from "../../services/actions/currentIngredientActions";

import styles from "./ingredient-details.module.css";
import { ingredientsDataSelector } from "../../services/selectors/ingredientsSelector";

const IngredientDetailsPage = () => {
  const ingredients = useSelector(ingredientsDataSelector);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_CURRENT_INGREDIENT,
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
