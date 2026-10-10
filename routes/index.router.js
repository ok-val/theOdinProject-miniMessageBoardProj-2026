import express from 'express';
import * as index_controller from '../controllers/index.controller.js';

const index_router = express.Router();
index_router.use(express.urlencoded({ extended: true }));

index_router.get('/', index_controller.render_home);
index_router.get('/new', index_controller.render_form);
index_router.post('/new', index_controller.handlePostForm);

export default index_router;
