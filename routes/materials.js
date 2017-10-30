import MaterialsController from '../controllers/materials';

function setResponse(response, res) {
  res.status(response.statusCode);
  res.json(response.data);
}

export default(app) => {
  const materialsController = new MaterialsController(app.datasource.models.Materials);

  function getAllRoute(req, res) {
    materialsController.findAllByFilters(req.params)
      .then(response => setResponse(response, res));
  }

  function getByIdRoute(req, res) {
    materialsController.findById(req.params)
      .then(response => setResponse(response, res));
  }

  function createRoute(req, res) {
    materialsController.create(req.body)
      .then(response => setResponse(response, res));
  }

  function updateRoute(req, res) {
    materialsController.update(req.body, req.params)
      .then(response => setResponse(response, res));
  }

  function deleteRoute(req, res) {
    materialsController.delete(req.params)
      .then(response => res.sendStatus(response.statusCode));
  }

  app.route('/materials')
    .all(app.auth.authenticate())
    .get(getAllRoute)
    .post(createRoute);

  app.route('/materials/:id')
    .all(app.auth.authenticate())
    .get(getByIdRoute)
    .put(updateRoute)
    .delete(deleteRoute);
};
