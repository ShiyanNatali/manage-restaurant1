import React, { useEffect } from "react";
import { Formik, Form, Field, useFormikContext, useField } from "formik";
import { Button, TextField, Select, FormControl } from "@material-ui/core";

function OrderDetailForm({ orderItem, foodsMenu, onCancel, onSave, status }) {
  const MyField = (props) => {
    const {
      values: { dish_id, quantity },
      setFieldValue,
    } = useFormikContext();
    const [field] = useField(props);

    useEffect(() => {
      if (
        dish_id !== "" &&
        quantity !== ""
      ) {
        const sum =
          foodsMenu.filter((item) => item.id === dish_id)[0].price * quantity;
        setFieldValue(props.name, sum);
      }
    }, [
      dish_id,
      quantity,
      setFieldValue,
      props.name,
    ]);

    return (
      <>
        <TextField
          id="standart-full-width"
          {...field}
          {...props}
          variant="outlined"
          disabled
          size="small"
          style={{ margin: 0.5 }}
        />
      </>
    );
  };

  function onFormSubmit(values) {
    onSave(values);
  }

  function validate(values) {
    const errors = {};
    if (!values.quantity) {
      errors.quantity = true;
    }
    return errors;
  }

  return (
    <Formik
      initialValues={orderItem}
      onSubmit={onFormSubmit}
      validate={validate}
    >
      {({ errors }) => (
        <Form style={{whiteSpace: "nowrap"}}>
          <Field name="dish_id" type="text">
            {({ field, meta }) =>
              MySelectField({ field, meta }, foodsMenu, status)
            }
          </Field>
          <Field name="quantity" type="text">
            {({ field, meta }) => MyTextField({ field, meta })}
          </Field>
          <MyField name="sum" type="text" />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            style={{ margin: 0.5 }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            style={{ margin: 0.5 }}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
}

function MyTextField({ field, meta }, disabled = false) {
  const props = {};
  if (meta.touched && meta.error) {
    props.error = meta.error;
  }

  return (
    <TextField
      id="standart-full-width"
      {...field}
      {...props}
      variant="outlined"
      disabled={disabled}
      size="small"
      style={{ margin: 0.5 }}
    />
  );
}

function MySelectField({ field, meta }, listsOption, disabled = false) {
  const props = {};
  if (meta.touched && meta.error) {
    props.error = meta.error;
  }

  return (
    <FormControl
      variant="outlined"
      size="small"
      style={{ minWidth: 200 }}
      disabled={disabled}
    >
      <Select
        native
        {...field}
        {...props}
        inputProps={{
          name: "dish_id",
          id: "outlined-native-simple",
        }}
      >
        {listsOption.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
export default OrderDetailForm;
