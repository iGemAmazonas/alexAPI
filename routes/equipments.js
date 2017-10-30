import EquipmentsController from '../controllers/equipments';

function setResponse(response, res) {
  res.status(response.statusCode);
  res.json(response.data);
}

export default(app) => {
  const equipmentsController = new EquipmentsController(app.datasource.models.Equipments);

  function getAllRoute(req, res) {
    equipmentsController.findAllByFilters(req.params)
      .then(response => setResponse(response, res));
  }

  function getByIdRoute(req, res) {
    equipmentsController.findById(req.params)
      .then(response => setResponse(response, res));
  }

  function createRoute(req, res) {
    equipmentsController.create(req.body)
      .then(response => setResponse(response, res));
  }

  function updateRoute(req, res) {
    equipmentsController.update(req.body, req.params)
      .then(response => setResponse(response, res));
  }

  function deleteRoute(req, res) {
    equipmentsController.delete(req.params)
      .then(response => res.sendStatus(response.statusCode));
  }

  app.route('/equipments')
    .all(app.auth.authenticate())
    .get(getAllRoute)
    .post(createRoute);

  app.route('/equipments/:id')
    .all(app.auth.authenticate())
    .get(getByIdRoute)
    .put(updateRoute)
    .delete(deleteRoute);
};
