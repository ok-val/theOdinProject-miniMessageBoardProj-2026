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
  res.render('msg', { title: ' ', data });
};

const pushToMessages = (msg) => {
  messages.push(msg);
};

const receive_form = (req, res, next) => {
  pushToMessages({
    id: messages.length,
    text: req.body['input--msg'],
    user: req.body['input--author'],
    added: new Date()
  });
  // console.log(messages);
  next();
};

export {
  render_home,
  render_form,
  receive_form,
  redirect_form,
  render_msg
};
