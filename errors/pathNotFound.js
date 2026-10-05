class PathNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = 'ERR_PATH_NOT_FOUND';
  }
}

const invokeErr_PathNotFound = (req, res) => {
  console.log(req.method, req.originalUrl);
  throw new PathNotFoundError();
};

export default invokeErr_PathNotFound;
