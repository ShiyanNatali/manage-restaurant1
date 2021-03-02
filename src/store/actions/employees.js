import api from "../../api";

export const SET_EMPLOYEES = "SET_EMPLOYEES";
export const SET_LOADING = "SET_LOADING";
export const getEmployees = () => (dispatch) => {
  api.get("employees").then((resp) =>
    dispatch({
      type: SET_EMPLOYEES,
      payload: resp.data,
    })
  ).then(() => 
  dispatch({
    type: SET_LOADING,
    payload: false,
  })
  );
};

export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const deleteEmployee = (id) => (dispatch) => {
  api.delete("employees/" + id).then(() =>
    dispatch({
      type: DELETE_EMPLOYEE,
      payload: id,
    })
  );
};

export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";
export const CREATE_EMPLOYEE = "CREATE_EMPLOYEE";
export function saveFormEmployee(changes) {
  return function (dispatch) {
    if (changes.id) {
      api.put("employees/" + changes.id, changes).then((resp) =>
        dispatch({
          type: UPDATE_EMPLOYEE,
          payload: resp.data,
        })
      );
    } else {
      api.post("employees", changes).then((resp) =>
        dispatch({
          type: CREATE_EMPLOYEE,
          payload: resp.data,
        })
      );
    }
  };
}