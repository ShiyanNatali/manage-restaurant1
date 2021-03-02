import React, { useState, useEffect } from "react";
import { useHistory, withRouter, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field, useFormikContext, useField } from "formik";
import {
  Button,
  TextField,
  Container,
  InputLabel,
  Select,
  FormControl,
  Grid,
  Paper,
} from "@material-ui/core";
import { saveFormOrder } from "../../store/actions/orders";
import api from "../../api";
import OrderDetails from "./OrderDetails";
import getDateTime from "../common/getCurrentDate";

function OrderForm({ order, employees, saveFormOrder }) {
  const history = useHistory();
  const { params } = useRouteMatch();
  const [orderDetails, setOrderDetails] = useState([]);
  const [changeTotalSum, setChangeTotalSum] = useState(false);
  const [changeOrderSum, setChangeOrderSum] = useState(false);

  useEffect(() => {
    if (params.id === "new") {
      setOrderDetails([]);
    } else {
      api
        .get("order_detail?order_id=" + params.id)
        .then(({ data }) => setOrderDetails(data));
    }
  }, [params.id]);

  const MyField = (props, label) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    useEffect(() => {
      if (changeTotalSum) {
        const totalSum = orderDetails.reduce(
          (amount, item) => amount + item.sum,
          0
        );
        setFieldValue(props.name, totalSum);
        setChangeTotalSum(false);
        if (!changeOrderSum) {
          setChangeOrderSum(true);
        }
      }
    }, [setFieldValue, props.name, field]);

    return (
      <>
        <TextField
          id="standart-full-width"
          disabled
          label={label}
          {...field}
          {...props}
          variant="outlined"
          fullWidth
          size="small"
          style={{ marginTop: 8 }}
        />
      </>
    );
  };

  function deleteOrderDetail(id) {
    api.delete("order_detail/" + id);
    setOrderDetails(orderDetails.filter((item) => item.id !== id));
    setChangeTotalSum(true);
  }

  function onClickCancel() {
    history.push("/orders");
  }

  function onFormSubmit(data) {
    saveFormOrder(data);
    onClickCancel();
  }

  function saveFormItem(changes) {
    if (changes.id) {
      api.put(
        "order_detail/" + changes.id + "?order_id=" + changes.order_id,
        changes
      );
      setOrderDetails(
        orderDetails.map((item) => (item.id === changes.id ? changes : item))
      );
      setChangeTotalSum(true);
    } else {
      api.post("order_detail", changes).then((resp) => {
        setOrderDetails([...orderDetails, resp.data]);
        setChangeTotalSum(true);
      });
    }
  }

  function validate(values) {
    const errors = {};
    if (!values.table_id) {
      errors.table_id = true;
    }
    if (!values.user_id) {
      errors.user_id = true;
    }
    return errors;
  }

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item xs={4}>
          <Formik
            initialValues={order}
            onSubmit={onFormSubmit}
            validate={validate}
          >
            {({ errors }) => (
              <Form>
                <Paper>
                  <Field name="created_at" type="text">
                    {({ field, meta }) =>
                      MyTextField({ field, meta }, "Created at", true)
                    }
                  </Field>
                  <Field name="updated_at" type="text">
                    {({ field, meta }) =>
                      MyTextField({ field, meta }, "Updated at", true)
                    }
                  </Field>
                  <Field name="table_id" type="text">
                    {({ field, meta }) => MyTextField({ field, meta }, "Table", order.status === "closed")}
                  </Field>
                  <Field name="user_id" type="text">
                    {({ field, meta }) =>
                      MySelectField({ field, meta }, "Name", employees, order.status === "closed")
                    }
                  </Field>
                  <Field name="status" type="text">
                    {({ field, meta }) =>
                      MyTextField({ field, meta }, "Status", true)
                    }
                  </Field>
                  <MyField name="total_sum" type="text" label="Total Amount" />
                </Paper>
                <Paper>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={order.status === "closed"}
                    color="primary"
                    size="small"
                    style={{ margin: 9 }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    disabled={changeOrderSum}
                    color="secondary"
                    size="small"
                    style={{ margin: 9 }}
                    onClick={onClickCancel}
                  >
                    Cancel
                  </Button>
                </Paper>
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid item xs={8}>
          <OrderDetails
            orderDetails={orderDetails}
            orderId={params.id}
            onDelete={deleteOrderDetail}
            onSaveForm={saveFormItem}
            status={order.status}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

function MyTextField({ field, meta }, label, disabled = false) {
  const props = {};
  if (meta.touched && meta.error) {
    props.error = meta.error;
  }

  return (
    <TextField
      id="standart-full-width"
      disabled={disabled}
      label={label}
      {...field}
      {...props}
      variant="outlined"
      fullWidth
      size="small"
      style={{ marginTop: 8 }}
    />
  );
}

function MySelectField({ field, meta }, label, listsOption, disabled = false) {
  const props = {};
  if (meta.touched && meta.error) {
    props.error = meta.error;
  }

  return (
    <FormControl
      variant="outlined"
      fullWidth
      size="small"
      disabled={disabled}
      style={{ marginTop: 8 }}
    >
      <InputLabel htmlFor="outlined-native-simple">{label}</InputLabel>
      <Select
        native
        label={label}
        {...field}
        {...props}
        inputProps={{
          name: "user_id",
          id: "outlined-native-simple",
        }}
      >
        {listsOption.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name + " " + item.surname}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

const mapStateToProps = (state, props) => {
  const order =
    props.match.params.id === "new"
      ? {
          created_at: getDateTime(),
          updated_at: getDateTime(),
          table_id: "",
          user_id: "",
          status: "active",
          total_sum: "0.00",
        }
      : state.orders.items.find(
          (order) => Number(order.id) === Number(props.match.params.id)
        );
  return {
    order,
    employees: state.employees.items,
  };
};

const mapDispatchToprops = {
  saveFormOrder,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToprops)(OrderForm)
);
