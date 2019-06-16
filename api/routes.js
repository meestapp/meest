const users = require('./users');
const meetings = require('./meetings');

module.exports = (app) => {
  app.use('/users/', users);
  app.use('/meetings/', meetings);

  // Error handlers
  // 404 error handler
  app.use(function(req, res, next) { // eslint-disable-line
    return res.sendStatus(404);
  });

  // 500 error handler
  app.use(function(err, req, res, next) { // eslint-disable-line
    return res.status(500).send(err);
  });
};
