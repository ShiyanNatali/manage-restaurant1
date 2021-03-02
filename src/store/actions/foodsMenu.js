import api from '../../api';

export const SET_FOODSMENU = "SET_FOODMENU";
export const getFoodsMenu = () => (dispatch) => {
  api.get("restaraunt_menu").then((resp) =>
    dispatch({
      type: SET_FOODSMENU,
      payload: resp.data,
    })
  );
};

export const DELETE_FOOD = "DELETE_FOOD";
export const deleteFood = (id) => (dispatch) => {
  api.delete("restaraunt_menu/" + id).then(() =>
    dispatch({
      type: DELETE_FOOD,
      payload: id,
    })
  );
};


export const UPDATE_FOOD = "UPDATE_FOOD";
export const CREATE_FOOD = "CREATE_FOOD";
export function saveFormFood(changes) {
  return function (dispatch) {
    if (changes.id) {
      api.put("restaraunt_menu/" + changes.id, changes).then((resp) =>
        dispatch({
          type: UPDATE_FOOD,
          payload: resp.data,
        })
      );
    } else {
      api.post("restaraunt_menu", changes).then((resp) =>
        dispatch({
          type: CREATE_FOOD,
          payload: resp.data,
        })
      );
    }
  };
}