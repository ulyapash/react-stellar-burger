import { Reducer } from "redux";
import { TOrder, TOrderActions } from "../actions/orderActions";

type TState = {
  isLoading: boolean;
  name: string | null;
  number: number | null;
  error: Error | null;
};

const initialState = {
  isLoading: false,
  name: null,
  number: null,
  error: null,
};

export const orderReducer: Reducer<TState, TOrderActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TOrder.MAKE_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case TOrder.MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        name: action.payload.name,
        number: action.payload.number,
      };
    }

    case TOrder.MAKE_ORDER_ERROR: {
      return {
        ...state,
        isLoading: false,
        name: null,
        number: null,
        error: action.payload,
      };
    }

    case TOrder.CLEAR_ORDER: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
