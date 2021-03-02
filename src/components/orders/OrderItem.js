import React from "react";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PaymentIcon from "@material-ui/icons/Payment";
import { useHistory, useRouteMatch } from "react-router-dom";
import getDateTime from "../common/getCurrentDate";

function OrderItem({ order, onDelete, onPayment }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  function onRowClick() {
    history.push(url + "/" + order.id);
  }

  function onChangesOrder(changes) {
    return {...changes, status:"closed",updated_at:getDateTime()};
  }

  return (
    <TableRow onClick={onRowClick}>
      <TableCell component="th" scope="row">
        {order.id}
      </TableCell>
      <TableCell align="right">{order.created_at}</TableCell>
      <TableCell align="right">{order.updated_at}</TableCell>
      <TableCell align="right">{order.table_id}</TableCell>
      <TableCell align="right">{order.name}</TableCell>
      <TableCell align="right">{order.status}</TableCell>
      <TableCell align="right">{order.total_sum}</TableCell>

      <TableCell align="right">
      <IconButton
          aria-label="payment"
          disabled={order.status==="closed"}
          onClick={(e) => e.stopPropagation() || onPayment(onChangesOrder(order))}
        >
          <PaymentIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="edit" color="primary" onClick={onRowClick}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="secondary"
          disabled={order.status==="closed"}
          onClick={(e) => e.stopPropagation() || onDelete(order.id)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default OrderItem;
