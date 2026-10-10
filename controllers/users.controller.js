// import { messages } from './index.controller.js';
import {
  findAllMessages,
  findUserInfoById,
  findQueryUser,
  updateUsernameById
} from '../db/queries.js';

import validateUserUpdateInput from '../validators/userUpdate.validator.js';

const renderUserList = async (req, res) => {
  try {
    const messages = await findAllMessages();
    res.render('users', { title: 'Users', messages });
  } catch (error) {
    next(error);
  }
};

const renderUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const data = await findUserInfoById(userId);
    // console.log(data);
    if (!data) {
      return res.render('userNotFound', { title: 'user not found' });
    }
    res.render('user', {
      title: `${data.username}'s details`,
      data,
      method: null
    });
  } catch (error) {
    next(error);
  }
};

const getUserUpdatePage = async (req, res) => {
  const userId = req.params.id;
  try {
    const data = await findUserInfoById(userId);
    res.render('userUpdate', {
      title: `Update ${data.username}'s username`,
      data,
      errors: null
    });
  } catch (error) {
    next(error);
  }
};

const postUpdateUsername_getConfirmPage = [
  validateUserUpdateInput,
  async (req, res) => {
    const userId = req.params.id;
    const {
      'input--username': newName,
      'current--username': currentName
    } = req.body;

    try {
      await updateUsernameById(userId, newName);
      res.render('userUpdateConfirmation', {
        title: 'Username update success',
        currentName,
        newName
      });
    } catch (error) {
      next(error);
    }
  }
];

export {
  renderUserList,
  renderUser,
  getUserUpdatePage,
  postUpdateUsername_getConfirmPage
};
