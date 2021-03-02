import React from 'react';
import { connect } from "react-redux";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
  TableBody,
  Paper,
  Button,
} from "@material-ui/core";
import { useHistory, useRouteMatch, NavLink } from "react-router-dom";
import EmployeesItem from './EmployeesItem';
import { deleteEmployee } from '../../store/actions/employees';

function EmployeesList({ employees, deleteEmployee}) {
  const history = useHistory();
  const { url } = useRouteMatch();

  function onAddButtonClick() {
    history.push(url + "/new");
  }

    return (
      <>
        <TableContainer component={Paper}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell align="right">SURNAME</TableCell>
                <TableCell align="right">POSITION</TableCell>
                <TableCell align="right">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <EmployeesItem employee={employee} key={employee.id} onDelete={deleteEmployee}/>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell align="center" colSpan="5">
                  <Button
                    variant="contained"
                    component={NavLink}
                    to={url + "/new"}
                    color="primary"
                    size="small"
                    onClick={onAddButtonClick}
                  >
                    new employee
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </>
    );
}

const mapStateToProps = ({ employees: { items } }) => ({
  employees: items,
});

const mapDispatchToprops = {
  deleteEmployee,
};

export default connect(mapStateToProps, mapDispatchToprops)(EmployeesList);
