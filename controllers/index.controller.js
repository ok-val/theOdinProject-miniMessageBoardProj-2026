import { matchedData } from 'express-validator';

const messages = [
  {
    id: 0,
    text: 'Hi there!',
    user: 'Amando',
    added: new Date()
  },
  {
    id: 1,
    text: 'Hello World!',
    user: 'Charles',
    added: new Date()
  }
];

const update_msg_author = (req, res, next) => {
  const newAuthor = req.body['input--author'];
  const currentAuthor = req.body['current--author'];

  const foundData = messages.find((msg) => {
    if (msg.user === currentAuthor) {
      return msg;
    }
  });

  messages[foundData.id].user = newAuthor;
  next();
};

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
  pushToMessages({
    id: messages.length,
    text: req.body['input--msg'],
    user: req.body['input--author'],
    added: new Date()
  });
  // console.log(messages);
  next();
};

// Utils

function pushToMessages(msg) {
  messages.push(msg);
}

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
