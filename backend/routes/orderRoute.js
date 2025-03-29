const express = require("express");

const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersOfCustomer,
} = require("../services/orderService");
const { authenticate } = require("../services/authService");
const router = express.Router();
router.use(authenticate);
router.route("/").get(getOrders).post(createOrder);
router
  .route("/:id")
  .get(authenticate, getOrdersOfCustomer)
  .put(updateOrder)
  .delete(deleteOrder);

module.exports = router;
