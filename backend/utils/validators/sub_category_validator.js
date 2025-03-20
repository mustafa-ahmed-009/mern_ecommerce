const { check , body } = require("express-validator")
const slugify = require('slugify');
const validationMiddleWare = require("../../middlewares/validator_middleware")

module.exports = {
    getSubCategoryByIdValidator: [
        check("id").isMongoId().withMessage("Invalid Category Id"),
        validationMiddleWare,
    ],
    createCategoryValidator: [
        check('name')
          .notEmpty()
          .withMessage('SubCategory required')
          .isLength({ min: 2 })
          .withMessage('Too short Subcategory name')
          .isLength({ max: 32 })
          .withMessage('Too long Subcategory name')
          .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
          }),
        check('category')
          .notEmpty()
          .withMessage('subCategory must be belong to category')
          .isMongoId()
          .withMessage('Invalid Category id format'),
          validationMiddleWare,
      ], 
      updateSubCategoryValidator : [
        check('id').isMongoId().withMessage('Invalid Subcategory id format'),
        body('name').custom((val, { req }) => {
          req.body.slug = slugify(val);
          return true;
        }),
        validationMiddleWare,
      ] , 
    deleteSubCategoryValidator: [
        check("id").isMongoId().withMessage("Invalid Category Id"),
        validationMiddleWare,
    ],
}