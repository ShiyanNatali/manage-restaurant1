import React from "react";
import {
  useHistory,
  withRouter,
  useRouteMatch,
  NavLink,
} from "react-router-dom";
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
  Typography,
} from "@material-ui/core";
import FoodItem from "./FoodItem";
import { deleteFood } from "../../store/actions/foodsMenu";

function FoodsList({ foodsMenu, category, deleteFood }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  function onAddButtonClick() {
    if (category === "all") {
      history.push(url + "/all/new");
    } else {
      history.push(url + "/new");
    }
  }

  function captionTable() {
    switch (category) {
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
        return "All Menu";
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan="5">
                <Typography variant="h5">{captionTable()}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell>DISH TITLE</TableCell>
              <TableCell align="right">CATEGORIES</TableCell>
              <TableCell align="right">VOLUME</TableCell>
              <TableCell align="right">PRICE</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodsMenu.map((food) => (
              <FoodItem
                food={food}
                key={food.id}
                category={category}
                onDelete={deleteFood}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="center" colSpan="5">
                <Button
                  variant="contained"
                  component={NavLink}
                  to={category === "all" ? url + "/all/new" : url + "/new"}
                  color="primary"
                  size="small"
                  onClick={onAddButtonClick}
                >
                  new dish
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

const mapStateToProps = (state, props) => {
  const category =
    props.match.params.category === undefined
      ? "all"
      : props.match.params.category;
  const foodsMenu =
    category === "all"
      ? state.foodsMenu.items
      : state.foodsMenu.items.filter((food) => food.category === category) ||
        [];
  return {
    foodsMenu,
    category,
  };
};

const mapDispatchToprops = {
  deleteFood,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToprops)(FoodsList)
);
