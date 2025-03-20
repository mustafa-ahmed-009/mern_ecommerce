const express = require("express");
const authService = require("../services/authService");

const {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} = require("../services/addressService");

const router = express.Router();
router.use(authService.authenticate,authService.allowedTo("user"));
router
  .route("/")
  .post(addAddress)
  .get(getLoggedUserAddresses);
router.delete('/:productId', removeAddress);  
// router.delete('/remove/:productId', authService.protect, removeProductFromWishList);
module.exports = router;
