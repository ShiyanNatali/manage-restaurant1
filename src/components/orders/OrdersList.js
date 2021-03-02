import React from "react";
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
import OrderItem from "./OrderItem";
import { deleteOrder, paymentOrder } from "../../store/actions/orders";

function OrdersList({ orders, deleteOrder, paymentOrder }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  function onAddButtonClick() {
    history.push(url + "/new");
  }

  function onPaymentOrder(changes) {
    paymentOrder(changes);
  }
  
  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell># ORDER</TableCell>
              <TableCell align="right">CREATE DATE</TableCell>
              <TableCell align="right">UPDATE DATE</TableCell>
              <TableCell align="right"># TABLE</TableCell>
              <TableCell align="right">WAITER</TableCell>
              <TableCell align="right">STATUS</TableCell>
              <TableCell align="right">AMOUNT</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <OrderItem order={order} key={order.id} onDelete={deleteOrder} onPayment={onPaymentOrder}/>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="center" colSpan="8">
                <Button
                  variant="contained"
                  component={NavLink}
                  to={url + "/new"}
                  color="primary"
                  size="small"
                  onClick={onAddButtonClick}
                >
                  new order
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

const mapStateToProps = ({ orders: { items }, employees }) => ({
  orders: items.map((item) => {
    const employee = employees.items.find((employee) => employee.id === item.user_id);
    return {
      ...item,
      name: employee ? employee.name+' '+employee.surname : null,
    }}).reverse(),
});


const mapDispatchToprops = {
  deleteOrder,
  paymentOrder,
};

export default connect(mapStateToProps, mapDispatchToprops)(OrdersList);
