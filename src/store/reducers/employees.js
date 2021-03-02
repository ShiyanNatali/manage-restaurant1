import {
  SET_EMPLOYEES,
  SET_LOADING,
  DELETE_EMPLOYEE,
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "../actions/employees";

const initialState = {
  items: [],
  isLoading: true,
};

function updateEmployee(employees, employee) {
  return employees.map((item) => (item.id === employee.id ? employee : item));
}

function createEmployee(employees, employee) {
  return [...employees, employee];
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_EMPLOYEES:
      return { ...state, items: payload };
    case SET_LOADING:
      return { ...state, isLoading: payload};
    case DELETE_EMPLOYEE:
      return {
        ...state,
        items: state.items.filter((employee) => employee.id !== payload),
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        items: updateEmployee(state.items, payload),
      };
    case CREATE_EMPLOYEE:
      return {
        ...state,
        items: createEmployee(state.items, payload),
      };
    default:
      return state;
  }
}
