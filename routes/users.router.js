import express from 'express';
import * as users_controller from '../controllers/users.controller.js';

const users_router = express.Router();

users_router.get('/', users_controller.renderUserList);
users_router.get('/:id', users_controller.renderUser);
users_router.get('/:id/update', users_controller.getUserUpdatePage);
users_router.post(
  '/:id/update',
  users_controller.postUpdateUsername_getConfirmPage
);

export default users_router;
