import api from "../../api";

export const SET_ORDERS = "SET_ORDERS";
export const getOrders = () => (dispatch) => {
  api.get("order").then((resp) =>
    dispatch({
      type: SET_ORDERS,
      payload: resp.data,
    })
  );
};

export const DELETE_ORDER = "DELETE_ORDER";
export const deleteOrder = (id) => (dispatch) => {
  api.delete("order/" + id).then(() =>
    dispatch({
      type: DELETE_ORDER,
      payload: id,
    })
  );
};

export const PAYMENT_ORDER = "PAYMENT_ORDER";
export const paymentOrder = (changes) => (dispatch) => {
  api.put("order/" + changes.id, changes).then((resp) =>
    dispatch({
      type: PAYMENT_ORDER,
      payload: resp.data,
    })
  );
};

export const UPDATE_ORDER = "UPDATE_ORDER";
export const CREATE_ORDER = "CREATE_ORDER";
export function saveFormOrder(changes) {
  return function (dispatch) {
    if (changes.id) {
      api.put("order/" + changes.id, changes).then((resp) =>
        dispatch({
          type: UPDATE_ORDER,
          payload: resp.data,
        })
      );
    } else {
      api.post("order", changes).then((resp) =>
        dispatch({
          type: CREATE_ORDER,
          payload: resp.data,
        })
      );
    }
  };
}
