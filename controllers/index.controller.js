import {
  messages,
  update_msg_author,
  pushToMessages
} from '../models/messasges.model.js';

const render_home = (req, res) => {
  res.render('index', { title: 'Home', messages });
};

const render_form = (req, res) => {
  res.render('form', { title: 'New message' });
};

const redirect_form = (req, res) => {
  res.redirect('/new');
};

const render_msg = (req, res, next) => {
  const dataId = req.params.id;
  const data = messages[dataId];
  if (!data) {
    next('route');
  }
  res.render('msg', { title: ' ', data, method: null });
};

const render_update_msg = (req, res) => {
  const dataId = req.params.id;
  const data = messages[dataId];
  if (!data) {
    next('route');
  }
  res.render('msg', { title: ' ', data, method: req.method });
};

const add_entry = (req, res, next) => {
  // Update DB
  pushToMessages(
    req.body['input--msg'],
    req.body['input--author'],
    new Date(),
    req.body['input--age'],
    req.body['input--bio'],
    req.body['input--email']
  );
  // console.log(messages);
  next();
};

export {
  messages,
  render_home,
  render_form,
  add_entry,
  redirect_form,
  render_msg,
  render_update_msg,
  update_msg_author
};
