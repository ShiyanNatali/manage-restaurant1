import {
  SET_ORDERS,
  DELETE_ORDER,
  CREATE_ORDER,
  UPDATE_ORDER,
  PAYMENT_ORDER,
} from "../actions/orders";

const initialState = {
  items: [],
};

function updateOrder(orders, order) {
  return orders.map((item) => (item.id === order.id ? order : item));
}

function createOrder(orders, order) {
  return [...orders, order];
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_ORDERS:
      return { ...state, items: payload };
    case DELETE_ORDER:
      return {
        ...state,
        items: state.items.filter((order) => order.id !== payload).reverse(),
      };
    case UPDATE_ORDER:
      return {
        ...state,
        items: updateOrder(state.items, payload),
      };
    case PAYMENT_ORDER:
      return {
        ...state,
        items: updateOrder(state.items, payload),
      };
    case CREATE_ORDER:
      return {
        ...state,
        items: createOrder(state.items, payload),
      };
    default:
      return state;
  }
}
