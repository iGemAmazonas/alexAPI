import ReferencesController from '../controllers/references';

function setResponse(response, res) {
  res.status(response.statusCode);
  res.json(response.data);
}

export default(app) => {
  const referencesController = new ReferencesController(app.datasource.models.References);

  function getAllRoute(req, res) {
    referencesController.findAllByFilters(req.params)
      .then(response => setResponse(response, res));
  }

  function getByIdRoute(req, res) {
    referencesController.findById(req.params)
      .then(response => setResponse(response, res));
  }

  function createRoute(req, res) {
    referencesController.create(req.body)
      .then(response => setResponse(response, res));
  }

  function updateRoute(req, res) {
    referencesController.update(req.body, req.params)
      .then(response => setResponse(response, res));
  }

  function deleteRoute(req, res) {
    referencesController.delete(req.params)
      .then(response => res.sendStatus(response.statusCode));
  }

  app.route('/references')
    .all(app.auth.authenticate())
    .get(getAllRoute)
    .post(createRoute);

  app.route('/references/:id')
    .all(app.auth.authenticate())
    .get(getByIdRoute)
    .put(updateRoute)
    .delete(deleteRoute);
};
