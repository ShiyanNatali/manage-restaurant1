import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Button, TextField, Container } from "@material-ui/core";
import { saveFormEmployee } from "../../store/actions/employees";

function EmployeeForm({ employee, saveFormEmployee }) {
  const history = useHistory();

  function onClickCancel() {
    history.push("/employees");
  }

  function onFormSubmit(data) {
    saveFormEmployee(data);
    onClickCancel();
  }

  function validate(values) {
    const errors = {};
    if (!values.name) {
      errors.name = true;
    }
    if (!values.surname) {
      errors.surname = true;
    }
    if (!values.position) {
      errors.position = true;
    }
    return errors;
  }

  return (
    <Formik
      initialValues={employee}
      onSubmit={onFormSubmit}
      validate={validate}
    >
      {({ errors }) => (
        <Container maxWidth="sm">
          <Form>
            <Field name="name" type="text">
              {({ field, meta }) => MyTextField({ field, meta }, "Name")}
            </Field>
            <Field name="surname" type="text">
              {({ field, meta }) => MyTextField({ field, meta }, "Surname")}
            </Field>
            <Field name="position" type="text">
              {({ field, meta }) => MyTextField({ field, meta }, "Position")}
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

const mapStateToProps = (state, props) => {
  const employee =
    props.match.params.id === "new"
      ? {
          name: "",
          surname: "",
          position: "",
        }
      : state.employees.items.find(
          (employee) => Number(employee.id) === Number(props.match.params.id)
        );
  return {
    employee,
  };
};

const mapDispatchToprops = {
  saveFormEmployee,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToprops)(EmployeeForm)
);
