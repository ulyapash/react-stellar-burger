export const PUT_BUN = "PUT_BUN";
export const PUT_BURGER_INGREDIENT = "PUT_BURGER_INGREDIENT";
export const DELETE_BURGER_INGREDIENT = "DELETE_BURGER_INGREDIENT";
export const CHANGE_ORDER_INGREDIENTS = "CHANGE_ORDER_INGREDIENTS";

export const putBun = (bun) => {
  return {
    type: PUT_BUN,
    payload: bun,
  };
};

export const putBurgerIngredient = (ingredient) => {
  return {
    type: PUT_BURGER_INGREDIENT,
    payload: ingredient,
  };
};

export const changeOrderIngredients = (dragIndex, hoverIndex, ingredients) => {
  const sortedIngredients = [...ingredients];

  const draggingItem = ingredients[dragIndex];
  const [hoveredItem] = sortedIngredients.splice(hoverIndex, 1, draggingItem);
  sortedIngredients.splice(dragIndex, 1, hoveredItem);

  return {
    type: CHANGE_ORDER_INGREDIENTS,
    payload: sortedIngredients,
  };
};
