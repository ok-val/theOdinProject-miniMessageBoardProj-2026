#!/usr/bin/env node

import pg from 'pg';

const { Client } = pg;
// const newMessage = {
//   id: messages.length,
//   text: text,
//   user: user,
//   date: date,
//   age: age,
//   bio: bio,
//   email: email

const createMessagesSchemaQuery = `

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR ( 255 ),
  username VARCHAR ( 255 ),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  age INTEGER,
  bio VARCHAR ( 255 ), 
  email VARCHAR ( 255 )
);
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.argv[2]
  });
  await client.connect();
  await client.query(createMessagesSchemaQuery);
  await client.end();
  console.log('seeding finished');
}
main();
