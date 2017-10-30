export default(app) => {
  // Setup Main Index Page to return app name and version
  app.route('/')
    .get((req, res) => {
      res.send({ name: 'AlexAPI', version: '1.0' });
    });
};
