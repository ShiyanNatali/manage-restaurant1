import React from 'react';
import './App.css';

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Navigation from "./components/common/Navigation";
import FoodsMenu from './components/foodsMenu/FoodsMenu';
import Orders from './components/orders/Orders';
import Employees from './components/employees/Employees';

function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Navigation />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Switch>
              <Route path="/foods">
                <FoodsMenu />
              </Route>
              <Route path="/orders">
                <Orders />.
              </Route>
              <Route path="/employees">
                <Employees />.
              </Route>
              <Route path="*">
                <Redirect to="/foods" />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </Router>
  );
}

export default App;
