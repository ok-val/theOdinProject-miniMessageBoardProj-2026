import { body, validationResult } from 'express-validator';

const isAlphaMsg = 'must contain only alphabets';
const isLengthMsg = 'must be between 1 and 10 characters';

const sanitizeInpAuthor = [
  body('input--author')
    .trim()
    .isAlpha()
    .withMessage(`Name ${isAlphaMsg}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Name ${isLengthMsg}`)
];

const validateInpAuthor = [
  sanitizeInpAuthor,
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

export { validateInpAuthor };
