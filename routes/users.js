import UsersController from '../controllers/users';

export default(app) => {
  const usersController = new UsersController(app.datasource.models.Users);

  app.route('/users')
    .get(getAllRoute)
    .post(createRoute);

  app.route('/users/:id')
    .get(getByIdRoute)
    .put(updateRoute)
    .delete(deleteRoute);

  function setResponse(response, res) {
    res.status(response.statusCode);
    res.json(response.data);
  }

  function getAllRoute(req, res) {
    usersController.findAllByFilters(req.params)
      .then(response => setResponse(response, res));
  }

  function getByIdRoute(req, res) {
    usersController.findById(req.params)
      .then(response => setResponse(response, res));
  }

  function createRoute(req, res) {
    usersController.create(req.body)
      .then(response => setResponse(response, res));
  }

  function updateRoute(req, res) {
    usersController.update(req.body, req.params)
      .then(response => setResponse(response, res));
  }

  function deleteRoute(req, res) {
    usersController.delete(req.params)
      .then(response => res.sendStatus(response.statusCode));
  }
};
