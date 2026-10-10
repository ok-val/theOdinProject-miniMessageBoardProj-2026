import { body, validationResult } from 'express-validator';

const isAlphaMsg = 'must contain only alphabets';

const sanitizeInputs = [
  body('input--username').trim()
  // .isAlpha()
  // .withMessage(`Name ${isAlphaMsg}`)
];

const validateUserUpdateInput = [
  sanitizeInputs,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render('form', {
        title: 'Users',
        errors: errors.array()
      });
    }
    next();
  }
];

export default validateUserUpdateInput;
