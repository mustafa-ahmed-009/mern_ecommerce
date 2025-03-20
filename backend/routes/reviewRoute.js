const express = require('express');

const {
  createReviewValidator,
  updateReviewValidator,
  getReviewValidator,
  deleteReviewValidator,
} = require('../utils/validators/reviewValidator');

const {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  createFilterObj,
  setProductIdAndUserIdToBody,
} = require('../services/reviewService');

const {authenticate,allowedTo} = require('../services/authService');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(createFilterObj, getReviews)
  .post(
    authenticate,
    allowedTo('user'),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview
  );
router
  .route('/:id')
  .get( getReviewValidator ,  getReview)
  .put(
    authenticate,
    allowedTo('user'),
updateReviewValidator,
    updateReview
  )
  .delete(
    authenticate,
    allowedTo('user'),
deleteReviewValidator,
    deleteReview
  );

module.exports = router;