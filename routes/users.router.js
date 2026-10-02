import express from 'express';
import * as users_controller from '../controllers/users.controller.js';

const users_router = express.Router();

users_router.get('/', users_controller.renderUserList);

export default users_router;
