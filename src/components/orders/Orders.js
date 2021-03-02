import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { getOrders } from "../../store/actions/orders";
import { getEmployees } from "../../store/actions/employees";
import OrdersList from "./OrdersList";
import OrderForm from "./OrderForm";

function Orders({ getOrders, employeesIsLoading, getEmployees }) {
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  useEffect(() => {
    if (employeesIsLoading)
    getEmployees();
  }, [employeesIsLoading, getEmployees]);

  const { path } = useRouteMatch();

  return (
    <Paper>
      <Switch>
        <Route path={path} exact>
          <OrdersList />
        </Route>
        <Route path={path + "/:id"}>
          <OrderForm />
        </Route>
      </Switch>
    </Paper>
  );
}

const mapStateToProps = ({ employees }) => {
  const employeesIsLoading = employees.isLoading;
  return {employeesIsLoading};
}

const mapDispatchToprops = {
  getOrders,
  getEmployees,
};

export default connect(mapStateToProps, mapDispatchToprops)(Orders);
