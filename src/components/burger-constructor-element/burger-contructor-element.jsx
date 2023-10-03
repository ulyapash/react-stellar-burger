import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  DELETE_BURGER_INGREDIENT,
  changeOrderIngredients,
} from "../../services/actions/burgerConstructorActions";
import { burgerIngredientsSelector } from "../../services/selectors/burgerConstructorSelector";
import { ingredientPropType } from "../../utils/prop-types";

import styles from "./burger-contructor-element.module.css";

export const BurgerContructorElement = ({ index, ingredient }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const ingredients = useSelector(burgerIngredientsSelector);

  const changeIngredients = (dragIndex, hoverIndex, ingredients) => {
    dispatch(changeOrderIngredients(dragIndex, hoverIndex, ingredients));
  };

  const handleRemoveElement = useCallback(() => {
    dispatch({
      type: DELETE_BURGER_INGREDIENT,
      payload: index,
    });
  }, [dispatch, index]);

  const [{ handlerId }, drop] = useDrop({
    accept: "burger-ingredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverRect = ref.current?.getBoundingClientRect();
      const hoverCenterY = (hoverRect.bottom - hoverRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverRect.top;

      if (
        (dragIndex < hoverIndex && hoverClientY < hoverCenterY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverCenterY)
      ) {
        return;
      }

      changeIngredients(dragIndex, hoverIndex, ingredients);
      item.index = index;
    },
  });

  const [_, drag] = useDrag({
    type: "burger-ingredient",
    item: { index },
  });

  drag(drop(ref));

  return (
    <div
      className={styles.burderConstructorElement}
      ref={ref}
      data-handler-id={handlerId}
    >
      <div className={`${styles.dragIcon} mr-2`}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleRemoveElement()}
      />
    </div>
  );
};

BurgerContructorElement.propTypes = {
  index: PropTypes.number,
  ingredient: ingredientPropType,
};
