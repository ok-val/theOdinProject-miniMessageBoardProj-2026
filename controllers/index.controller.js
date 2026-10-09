import {
  messages,
  update_msg_author,
  pushToMessages
} from '../models/messasges.model.js';

import * as db from '../db/queries.js';
import { validateInputs } from '../validators/form.validator.js';

const render_home = async (req, res) => {
  const messages = await db.findAllMessages();
  // console.log(messages);
  res.render('index', { title: 'Home', messages });
};

const render_form = (req, res) => {
  res.render('form', { title: 'New message' });
};

// const render_msg = (req, res, next) => {
//   const dataId = req.params.id;
//   const data = messages[dataId];
//   if (!data) {
//     next('route');
//   }
//   res.render('msg', { title: ' ', data, method: null });
// };

// const render_update_msg = (req, res) => {
//   const dataId = req.params.id;
//   const data = messages[dataId];
//   if (!data) {
//     next('route');
//   }
//   res.render('msg', { title: ' ', data, method: req.method });
// };

// const add_entry = (req, res, next) => {
//   // Update DB
//   pushToMessages(
//     req.body['input--msg'],
//     req.body['input--author'],
//     new Date(),
//     req.body['input--age'],
//     req.body['input--bio'],
//     req.body['input--email']
//   );
//   // console.log(messages);
//   next();
// };

const insertMessageIntoDB = async (req, res, next) => {
  // 'input--username': 'Velrond',
  // 'input--msg': 'Hello Mordor',
  // 'input--age': '92',
  // 'input--email': 'velrond@mordor.me',
  // 'input--bio': 'Some douce from Morgoth'
  try {
    await db.insertMessage(req.body);
    res.render('insertMessageConfirmation', {
      title: 'Insert successful'
    });
  } catch (error) {
    next(error);
  }
};

const handlePostForm = [validateInputs, insertMessageIntoDB];
export {
  messages,
  render_home,
  render_form,
  // add_entry,
  // redirect_form,
  // render_msg,
  // render_update_msg,
  update_msg_author,
  handlePostForm
  // insertMessageIntoDB
};
