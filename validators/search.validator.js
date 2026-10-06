import { body, query, validationResult } from 'express-validator';
import { messages } from '../models/messasges.model.js';

const isAlphaMsg = 'must contain only alphabets';
const isLengthMsg = 'must be between 1 and 10 characters';

const sanitizeInputQuery = [
  query('input--search')
    .trim()
    .isAlpha()
    .withMessage(`Name ${isAlphaMsg}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Name ${isLengthMsg}`)
];

const validateInputQuery = [
  sanitizeInputQuery,
  (req, res, next) => {
    const errors = validationResult(req);
    // console.log(req.query);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render('search', {
        title: 'Search',
        errors: errors.array(),
        messages,
        results: null
      });
    }
    next();
  }
];

export { validateInputQuery };
