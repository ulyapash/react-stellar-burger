import { BASE_URL } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";

export const getIngredients = () => {
  return (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });

    fetch(BASE_URL + "/ingredients")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((result) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_INGREDIENTS_ERROR,
        });
        console.error(error);
      });
  };
};
