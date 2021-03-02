import React, { useState } from "react";
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
import { connect } from "react-redux";
import OrderDetailsItem from "./OrderDetailsItem";
import OrderDetailForm from "./OrderDetailForm";

const EMPTY_ORDER = {
  dish_id: "",
  quantity: "1",
  sum: "",
  order_id: "",
};

function OrderDetails({
  orderDetails,
  orderId,
  onDelete,
  onSaveForm,
  foodsMenu,
  status,
}) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isChangeItem, setIsChangeItem] = useState(false);
  const [orderItem, setOrderItem] = useState({});
  const [listFoods, setListFoods] = useState([]);

  function showForm() {
    setIsFormVisible(true);
  }

  function hideForm() {
    setIsFormVisible(false);
  }

  function onAdd() {
    const listFoodsItem=foodsMenu.filter(item => !orderDetails.some(itemOrder => item.id===itemOrder.dish_id))
    setListFoods(listFoodsItem);
    setOrderItem(getEmptyOrder(listFoodsItem[0].id, orderId));
    setIsChangeItem(false);
    showForm();
  }
  function onEdit(id) {
    setOrderItem(orderDetails.filter((item) => item.id === id)[0]);
    setIsChangeItem(true);
    setListFoods(foodsMenu);
    showForm();
  }
  function saveItem(changes) {
    onSaveForm(changes);
    hideForm();
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan="5">
                <Typography variant="h6">Order Details</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell>DISH TITLE</TableCell>
              <TableCell align="right">QUANTITY</TableCell>
              <TableCell align="right">AMOUNT</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails.map((item) => (
              <OrderDetailsItem
                orderDetail={item}
                foodsMenu={foodsMenu}
                key={item.id}
                onDelete={onDelete}
                onEdit={onEdit}
                status={status}
              />
            ))}
          </TableBody>
          <TableFooter>
            {isFormVisible ? (
              <TableRow>
                <TableCell align="right" colSpan="5">
                  <OrderDetailForm
                    orderItem={orderItem}
                    foodsMenu={listFoods}
                    status={isChangeItem}
                    onCancel={hideForm}
                    onSave={saveItem}
                  />
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell align="center" colSpan="5">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={onAdd}
                    style={{ margin: 9 }}
                    disabled={orderId === "new" || status === "closed"}
                  >
                    add dish
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

function getEmptyOrder(dish_id, order_id) {
  return { ...EMPTY_ORDER, dish_id, order_id};
}

const mapStateToProps = ({ foodsMenu: { items } }) => ({
  foodsMenu: items,
});

export default connect(mapStateToProps)(OrderDetails);
