import { body, validationResult } from 'express-validator';

const isAlphaMsg = 'must contain only alphabets';
const isLengthMsg = 'must be between 1 and 10 characters';
const isAgeNumeric = 'must contain only numbers';
const isAgeBetweenRange = 'must be between 18 and 120';
const isBioWithinWordLimit = 'must not exceed 120 chars';
const isEmailValid = 'must be a valid email';

const sanitizeInputs = [
  body('input--author')
    .trim()
    .isAlpha()
    .withMessage(`Name ${isAlphaMsg}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Name ${isLengthMsg}`),

  body('input--age')
    .optional()
    .trim()
    .isInt({ min: 18, max: 120 })
    .withMessage(`Age ${isAgeBetweenRange}`)
    .isNumeric()
    .withMessage(`Age ${isAgeNumeric}`),

  body('input--email')
    .trim()
    .isEmail()
    .withMessage(isEmailValid)
    .normalizeEmail(),

  body('input--bio')
    .trim()
    .isLength({ max: 200 })
    .withMessage(`Bio ${isBioWithinWordLimit}`)
];

const validateInputs = [
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

export { validateInputs };
