import { messages } from './index.controller.js';

const renderUserList = (req, res) => {
  res.render('users', { title: 'Users', messages });
};

export { renderUserList };
