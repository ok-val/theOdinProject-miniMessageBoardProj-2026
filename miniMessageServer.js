import express from 'express';
import index_router from './routes/index.router.js';
import users_router from './routes/users.router.js';
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
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));

// App static files setting
app.use(express.static('public'));

// Add routers
app.use('/users', users_router);
app.use(index_router);

// Error handling
app.use('/{*splat}', invokeErr_PathNotFound);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err);
});
