import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import {
  Button,
  TextField,
  Container,
  InputLabel,
  Select,
  FormControl,
} from "@material-ui/core";
import { saveFormFood } from "../../store/actions/foodsMenu";

function FoodForm({ food, category, saveFormFood }) {
  const history = useHistory();

  function onClickCancel() {
    if (category === "all") {
      history.push("/foods");
    } else {
      history.push("/foods/" + category);
    }
  }

  function onFormSubmit(data) {
    saveFormFood(data);
    onClickCancel();
  }

  function validate(values) {
    const errors = {};
    if (!values.title) {
      errors.title = true;
    }
    if (!values.category) {
      errors.category = true;
    }
    if (!values.volume) {
      errors.volume = true;
    }
    if (!values.price || isNaN(values.price)) {
      errors.price = true;
    }

    return errors;
  }

  return (
    <Formik initialValues={food} onSubmit={onFormSubmit} validate={validate}>
      {({ errors }) => (
        <Container maxWidth="sm">
          <Form>
            <Field name="title" type="text">
              {({ field, meta }) => MyTextField({ field, meta }, "Dish Title")}
            </Field>
            <Field name="category" type="text">
              {({ field, meta }) => MySelectField({ field, meta }, "Category")}
            </Field>
            <Field name="volume" type="text">
              {({ field, meta }) => MyTextField({ field, meta }, "Volume")}
            </Field>
            <Field name="price" type="text">
              {({ field, meta }) => MyTextField({ field, meta }, "Price")}
            </Field>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              style={{ margin: 9 }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              style={{ margin: 9 }}
              onClick={onClickCancel}
            >
              Cancel
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
}

function MyTextField({ field, meta }, label) {
  const props = {};
  if (meta.touched && meta.error) {
    props.error = meta.error;
  }

  return (
    <TextField
      id="standart-full-width"
      label={label}
      {...field}
      {...props}
      variant="outlined"
      fullWidth
      size="small"
      style={{ margin: 8 }}
    />
  );
}

function MySelectField({ field, meta }, label) {
  const props = {};
  if (meta.touched && meta.error) {
    props.error = meta.error;
  }
  return (
    <FormControl
      variant="outlined"
      fullWidth
      size="small"
      style={{ margin: 8 }}
    >
      <InputLabel htmlFor="outlined-native-simple">{label}</InputLabel>
      <Select
        native
        label={label}
        {...field}
        {...props}
        inputProps={{
          name: "category",
          id: "outlined-native-simple",
        }}
      >
        <option aria-label="None" value="" />
        <option value="appetizers">Appetizers</option>
        <option value="soups">Soups</option>
        <option value="main">Main Courses</option>
        <option value="side">Side Dishes</option>
        <option value="desserts">Desserts</option>
        <option value="drinks">Drinks</option>
      </Select>
    </FormControl>
  );
}

const mapStateToProps = (state, props) => {
  const category =
    props.match.params.category === undefined
      ? "all"
      : props.match.params.category;
  const food =
    props.match.params.id === "new"
      ? {
          title: "",
          category: category === "all" ? "" : category,
          volume: "",
          price: "0.00",
        }
      : state.foodsMenu.items.find(
          (food) => Number(food.id) === Number(props.match.params.id)
        );
  return {
    food,
    category,
  };
};

const mapDispatchToprops = {
  saveFormFood,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToprops)(FoodForm)
);
