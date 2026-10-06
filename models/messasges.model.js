const messages = [
  {
    id: 0,
    text: 'Hi there!',
    email: 'armando@ardo.com',
    age: '23',
    bio: 'An Assie bloke',
    user: 'Amando',
    added: new Date()
  },
  {
    id: 1,
    text: 'Hello World!',
    email: 'charles@voodoo.com',
    age: '35',
    bio: 'Not for the faint of heart',
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

const pushToMessages = (text, user, date, age, bio, email) => {
  const newMessage = {
    id: messages.length,
    text: text,
    user: user,
    date: date,
    age: age,
    bio: bio,
    email: email
  };
  messages.push(newMessage);
};

export { messages, update_msg_author, pushToMessages };
