const slugify = require('slugify');
const { check, body } = require('express-validator');
const validationMiddleWare = require("../../middlewares/validator_middleware")

module.exports = {
    getBrandValidator: [
        check("id").isMongoId().withMessage("Invalid Brand Id"),
        validationMiddleWare,
    ],
    createBrandValidator :  [
        check('name')
          .notEmpty()
          .withMessage('Brand required')
          .isLength({ min: 3 })
          .withMessage('Too short Brand name')
          .isLength({ max: 32 })
          .withMessage('Too long Brand name')
          .custom((val, { req }) => {
            if (val) { 
              req.body.slug = slugify(val);
              return true;
            }
          }),
          validationMiddleWare,
      ],
    updateBrandValidator: [
        check('id').isMongoId().withMessage('Invalid Brand id format'),
      body('name').custom((val, { req }) => {
        if (req.body.slug) { 
          req.body.slug = slugify(val);
          return true;
        }
          return true;
        }),
        validationMiddleWare,
      ] , 
    deleteBrandValidator: [
        check("id").isMongoId().withMessage("Invalid Brand Id"),
        validationMiddleWare,
    ],
}