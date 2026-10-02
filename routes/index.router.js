import express from 'express';
import * as index_controller from '../controllers/index.controller.js';
import { validateInpAuthor } from '../validators/author.validator.js';

const index_router = express.Router();
index_router.use(express.urlencoded({ extended: true }));

index_router.get('/', index_controller.render_home);

index_router.get('/new', index_controller.render_form);

index_router.post(
  '/new',
  validateInpAuthor,
  index_controller.add_entry,
  index_controller.redirect_form
);

index_router.get('/:id', index_controller.render_msg);

export default index_router;
