import express from 'express';
import * as index_controller from '../controllers/index.controller.js';

const index_router = express.Router();
index_router.use(express.urlencoded({ extended: true }));

index_router.get('/', index_controller.render_home);

index_router.get('/new', index_controller.render_form);

index_router.get('/:id', index_controller.render_msg);

index_router.post(
  '/new',
  index_controller.receive_form,
  index_controller.redirect_form
);

export default index_router;
