export default(app) => {
  // Setup Main Index Page to return app name and version
  app.route('/')
    .get((req, res) => {
      res.send({ name: 'Alex', version: '1.0' });
    });
};
