import React from "react";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory, useRouteMatch } from "react-router-dom";

function EmployeesItem({ employee, onDelete }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  function onRowClick() {
    history.push(url + "/" + employee.id);
  }

  return (
    <TableRow onClick={onRowClick}>
      <TableCell component="th" scope="row">
        {employee.name}
      </TableCell>
      <TableCell align="right">{employee.surname}</TableCell>
      <TableCell align="right">{employee.position}</TableCell>
      <TableCell align="right">
        <IconButton aria-label="edit" color="primary" onClick={onRowClick}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="secondary"
          onClick={(e) => e.stopPropagation() || onDelete(employee.id)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default EmployeesItem;
