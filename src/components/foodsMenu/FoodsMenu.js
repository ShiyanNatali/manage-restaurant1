import React, { useEffect } from "react";
import { Paper, Grid } from "@material-ui/core";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import FoodsList from "./FoodsList";
import FoodForm from "./FoodForm";
import SideBarNav from "../common/SideBarNav";
import { getFoodsMenu } from "../../store/actions/foodsMenu";

function FoodsMenu({ getFoodsMenu }) {
  useEffect(() => {
    getFoodsMenu();
  }, [getFoodsMenu]);

  const { path } = useRouteMatch();

  return (
    <Grid container>
      <Grid item xs={2}>
        <SideBarNav />
      </Grid>
      <Grid item xs={10}>
        <Paper>
          <Switch>
          <Route path={path + "/:category/:id"}>
              <FoodForm />
            </Route>
            <Route path={path + "/:category?"}>
              <FoodsList />
            </Route>
          </Switch>
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapDispatchToprops = {
  getFoodsMenu,
};

export default connect(null, mapDispatchToprops)(FoodsMenu);
