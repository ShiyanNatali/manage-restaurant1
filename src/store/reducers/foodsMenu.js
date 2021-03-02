import {
  SET_FOODSMENU,
  DELETE_FOOD,
  CREATE_FOOD,
  UPDATE_FOOD,
} from "../actions/foodsMenu";

const initialState = {
  items: [],
};

function updateFood(foods, food) {
  return foods.map((item) => (item.id === food.id ? food : item));
}

function createFood(foods, food) {
  return [...foods, food];
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_FOODSMENU:
      return { ...state, items: payload };
    case DELETE_FOOD:
      return {
        ...state,
        items: state.items.filter((food) => food.id !== payload),
      };
    case UPDATE_FOOD:
      return {
        ...state,
        items: updateFood(state.items, payload),
      };
    case CREATE_FOOD:
      return {
        ...state,
        items: createFood(state.items, payload),
      };
    default:
      return state;
  }
}
