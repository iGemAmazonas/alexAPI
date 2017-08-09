import UserController from '../controllers/user';


export default(app) => {
  const userController = new UserController(app.datasource.models.User);

  app.route('/user')
    .get((req, res) => {
      userController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      userController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/user/:id')
    .get((req, res) => {
      userController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      userController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      userController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
