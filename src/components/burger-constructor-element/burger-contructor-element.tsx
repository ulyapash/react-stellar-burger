import { FC, useCallback, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { TBurgerConstructor } from "../../services/actions/burgerConstructorActions";
import { burgerIngredientsSelector } from "../../services/selectors/burgerConstructorSelector";
import { TIngredientData, useAppDispatch, useAppSelector } from "../../types";

import styles from "./burger-contructor-element.module.css";

type TProps = {
  index: number;
  ingredient: TIngredientData;
};

export const BurgerContructorElement: FC<TProps> = ({ index, ingredient }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const ingredients = useAppSelector(burgerIngredientsSelector);

  const changeIngredients = (
    dragIndex: number,
    hoverIndex: number,
    ingredients: TIngredientData[]
  ) => {
    const sortedIngredients = [...ingredients];

    const draggingItem = ingredients[dragIndex];
    const [hoveredItem] = sortedIngredients.splice(hoverIndex, 1, draggingItem);
    sortedIngredients.splice(dragIndex, 1, hoveredItem);

    dispatch({
      type: TBurgerConstructor.CHANGE_ORDER_INGREDIENTS,
      payload: sortedIngredients,
    });
  };

  const handleRemoveElement = useCallback(() => {
    dispatch({
      type: TBurgerConstructor.DELETE_BURGER_INGREDIENT,
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
    hover(item: { index: number }, monitor) {
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
      const hoverClientY = clientOffset!.y - hoverRect.top;

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
