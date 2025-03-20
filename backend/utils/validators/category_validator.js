const slugify = require('slugify');
const { check, body } = require('express-validator');
const validationMiddleWare = require("../../middlewares/validator_middleware")

module.exports = {
    getCategoryValidator: [
        check("id").isMongoId().withMessage("Invalid Category Id"),
        validationMiddleWare,
    ],
    createCategoryValidator: [
        check('name')
          .notEmpty()
          .withMessage('Category required')
          .isLength({ min: 3 })
          .withMessage('Too short category name')
          .isLength({ max: 32 })
          .withMessage('Too long category name')
          .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
          }),
          validationMiddleWare,
      ], 
    updateCategoryValidator: [
        check('id').isMongoId().withMessage('Invalid category id format'),
      body('name').custom((val, { req }) => {
        if (val) { 
          req.body.slug = slugify(val);
   
        }
        return true;
        }),
        validationMiddleWare,
      ],
    deleteCategoryValidator: [
        check("id").isMongoId().withMessage("Invalid Category Id"),
        validationMiddleWare,
    ],
}