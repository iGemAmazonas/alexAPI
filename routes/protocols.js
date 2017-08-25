import ProtocolsController from '../controllers/protocols';

function setResponse(response, res) {
  res.status(response.statusCode);
  res.json(response.data);
}

export default(app) => {
  const protocolsController = new ProtocolsController(app.datasource.models.Protocols);

  function getAllRoute(req, res) {
    protocolsController.findAllByFilters(req.params)
      .then(response => setResponse(response, res));
  }

  function getByIdRoute(req, res) {
    protocolsController.findById(req.params)
      .then(response => setResponse(response, res));
  }

  function createRoute(req, res) {
    protocolsController.create(req.body)
      .then(response => setResponse(response, res));
  }

  function updateRoute(req, res) {
    protocolsController.update(req.body, req.params)
      .then(response => setResponse(response, res));
  }

  function deleteRoute(req, res) {
    protocolsController.delete(req.params)
      .then(response => res.sendStatus(response.statusCode));
  }

  app.route('/protocols')
    .get(getAllRoute)
    .post(createRoute);

  app.route('/protocols/:id')
    .get(getByIdRoute)
    .put(updateRoute)
    .delete(deleteRoute);
};
