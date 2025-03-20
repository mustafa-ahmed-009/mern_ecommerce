const express = require("express");
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  updateLoggedUserValidator,
  changeUserPasswordValidator,
  deleteUserValidator,
} = require("../utils/validators/uservalidator");

const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  getUsers,
  changeUserPassword,
  getLoggedUserData, 
  updateLoggedUserPassword, 
  updateLoggedUserData, 
  deleteLoggedUserData
} = require("../services/userService");
const { authenticate, allowedTo } = require("../services/authService");

const router = express.Router();
//current user
router.use(authenticate);
router.get("/getMe", getLoggedUserData, getUser);
router.put('/changeMyPassword', updateLoggedUserPassword);
router.put('/changeLoggedUserData', updateLoggedUserValidator, updateLoggedUserData);
router.delete('/deleteMe', deleteLoggedUserData);



//admin routes 
router.use(allowedTo("admin"));
router
  .route("/")
  .get(getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser);
router
  .route("/changePassword/:id")
  .put(changeUserPasswordValidator, changeUserPassword);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
