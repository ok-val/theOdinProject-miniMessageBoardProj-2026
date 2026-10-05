import express from 'express';
import * as index_controller from '../controllers/index.controller.js';
import { validateInpAuthor } from '../validators/user.validator.js';

const index_router = express.Router();
index_router.use(express.urlencoded({ extended: true }));

index_router.get('/msg/:id', index_controller.render_msg);
index_router.get('/msg/:id/update', index_controller.render_update_msg);
index_router.post(
  '/msg/:id/update',
  index_controller.update_msg_author,
  index_controller.render_msg
);

index_router.get('/', index_controller.render_home);
index_router.get('/new', index_controller.render_form);
index_router.post(
  '/new',
  validateInpAuthor,
  index_controller.add_entry,
  index_controller.redirect_form
);

export default index_router;
