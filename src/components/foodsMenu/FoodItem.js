import React from "react";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory, useRouteMatch } from "react-router-dom";

function FoodItem({ food, category, onDelete }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  function onRowClick() {
    if (category === "all") {
      history.push(url + "/all/" + food.id);
    } else {
      history.push(url + "/" + food.id);
    }
  }

  function foodCategory(foodCategory) {
    switch (foodCategory) {
      case "appetizers":
        return "Appetizers";
      case "soups":
        return "Soups";
      case "main":
        return "Main Courses";
      case "side":
        return "Side Dishes";
      case "desserts":
        return "Desserts";
      case "drinks":
        return "Drinks";
      default:
        return foodCategory;
    }
  }

  return (
    <TableRow onClick={onRowClick}>
      <TableCell component="th" scope="row">
        {food.title}
      </TableCell>
      <TableCell align="right">{foodCategory(food.category)}</TableCell>
      <TableCell align="right">{food.volume}</TableCell>
      <TableCell align="right">{food.price}</TableCell>
      <TableCell align="right">
        <IconButton aria-label="edit" color="primary" onClick={onRowClick}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="secondary"
          onClick={(e) => e.stopPropagation() || onDelete(food.id)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default FoodItem;
