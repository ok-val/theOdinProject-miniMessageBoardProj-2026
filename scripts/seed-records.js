#!/usr/bin/env node

import pg from 'pg';

const { Client } = pg;
// id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
// text VARCHAR ( 255 ),
// username VARCHAR ( 255 ),
// date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// age INTEGER,
// bio VARCHAR ( 255 ),
// email VARCHAR ( 255 )

const createRecords = `
  INSERT INTO messages (text, username, age, bio, email)
  SELECT v.text, v.username, v.age, v.bio, v.email
  FROM (
    VALUES
      ('Hello, world!',          'alice',   28, 'Coffee lover and amateur photographer', 'alice@example.com'),
      ('Anyone up for a game?',  'bob_dev', 34, 'Full-stack dev, weekend hiker',         'bob@example.com'),
      ('Great meeting everyone', 'carmen',  25, 'Designer who sketches on the train',    'carmen@example.com')
  ) AS v(text, username, age, bio, email)
  WHERE NOT EXISTS (SELECT 1 FROM messages);
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.argv[2]
  });
  await client.connect();
  await client.query(createRecords);
  await client.end();
  console.log('seeding finished');
}
main();
