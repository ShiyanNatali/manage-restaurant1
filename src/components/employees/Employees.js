import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { getEmployees } from "../../store/actions/employees";
import EmployeesList from "./EmployeesList";
import EmployeeForm from "./EmployeeForm";

function Employees({ getEmployees }) {
  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  const { path } = useRouteMatch();

  return (
    <Paper>
      <Switch>
        <Route path={path} exact>
          <EmployeesList />
        </Route>
        <Route path={path + "/:id"}>
          <EmployeeForm />
        </Route>
      </Switch>
    </Paper>
  );
}

const mapDispatchToprops = {
  getEmployees,
};

export default connect(null, mapDispatchToprops)(Employees);
