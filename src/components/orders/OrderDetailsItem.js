import React from "react";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function OrderDetailsItem({
  orderDetail,
  onDelete,
  onEdit,
  foodsMenu,
  status,
}) {
  function nameDish(id) {
    return foodsMenu.filter((item) => item.id === id)[0].title;
  }

  function onRowClick() {
    if (status === "active") {
      onEdit(orderDetail.id);
    }
  }

  return (
    <TableRow onClick={onRowClick}>
      <TableCell component="th" scope="row">
        {nameDish(orderDetail.dish_id)}
      </TableCell>
      <TableCell align="right">{orderDetail.quantity}</TableCell>
      <TableCell align="right">{orderDetail.sum}</TableCell>
      <TableCell align="right">
        <IconButton
          aria-label="edit"
          disabled={status === "closed"}
          color="primary"
          onClick={onRowClick}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="secondary"
          disabled={status === "closed"}
          onClick={(e) => e.stopPropagation() || onDelete(orderDetail.id)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default OrderDetailsItem;
