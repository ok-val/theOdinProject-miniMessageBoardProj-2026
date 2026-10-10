import pool from './pool.js';

const findAllMessages = async () => {
  const { rows } = await pool.query('SELECT * FROM messages;');
  return rows;
};

// const findAllUsernames = async () => {
//   const { rows } = await pool.query(`
//     SELECT username, age, bio, email FROM messages;
//   `);
//   return rows;
// };

const insertMessage = async (body) => {
  const {
    'input--username': username,
    'input--msg': text,
    'input--age': age,
    'input--email': email,
    'input--bio': bio
  } = body;

  await pool.query(
    `
    INSERT INTO messages (username, text, age, email, bio)
    VALUES ($1, $2, $3, $4, $5);
    `,
    [username, text, age, email, bio]
  );
  // try/catch is helpful here if I want to translate specific error
  // e.g., error 23505 unique violation
  return;
};

const findQueryUser = async (q) => {
  // const qPattern = `'%${q}%'`;
  const qPattern = `%${q}%`;
  const { rows } = await pool.query(
    `
    SELECT username FROM messages WHERE LOWER(username) LIKE $1;    
  `,
    [qPattern]
  );
  return rows;
};

const findUserInfoById = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT id, username, age, bio, email FROM messages WHERE id = $1; 
  `,
    [id]
  );
  return rows[0];
};

const updateUsernameById = async (id, newName) => {
  await pool.query(
    `
    UPDATE messages SET username = $1 WHERE id = $2;   
  `,
    [newName, id]
  );
  return;
};

export {
  findAllMessages,
  insertMessage,
  findQueryUser,
  findUserInfoById,
  updateUsernameById
  // findAllUsernames
};
