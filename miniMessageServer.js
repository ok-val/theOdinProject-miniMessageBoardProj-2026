import express from 'express';
import path from 'node:path';
import index_router from './routes/index.router.js';
import users_router from './routes/users.router.js';
import search_router from './routes/search.router.js';
import invokeErr_PathNotFound from './errors/pathNotFound.js';

const app = express();
const localport = 3000;

app.listen(localport, (error) => {
  if (error) {
    throw error;
  }
  console.log(`listening on ${localport}`);
});

// App view engine setting
app.set('view engine', 'ejs');

// Absolute paths are needed for debugging
app.set('views', path.join(import.meta.dirname, 'views'));
app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// App static files setting
app.use(express.static('public'));

// Add routers
app.use('/users', users_router);
app.use('/search', search_router);
app.use(index_router);

// Error handling
// This middleware should use a proper controller for handling errors
// e.g., errors.controller.js
// app.use('/{*splat}', invokeErr_PathNotFound);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err);
});
