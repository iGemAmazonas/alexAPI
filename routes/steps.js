import StepsController from '../controllers/steps';

function setResponse(response, res) {
  res.status(response.statusCode);
  res.json(response.data);
}

export default(app) => {
  const stepsController = new StepsController(app.datasource.models.Steps);

  function getAllRoute(req, res) {
    stepsController.findAllByFilters(req.params)
      .then(response => setResponse(response, res));
  }

  function getByIdRoute(req, res) {
    stepsController.findById(req.params)
      .then(response => setResponse(response, res));
  }

  function createRoute(req, res) {
    stepsController.create(req.body)
      .then(response => setResponse(response, res));
  }

  function updateRoute(req, res) {
    stepsController.update(req.body, req.params)
      .then(response => setResponse(response, res));
  }

  function deleteRoute(req, res) {
    stepsController.delete(req.params)
      .then(response => res.sendStatus(response.statusCode));
  }

  app.route('/steps')
    .all(app.auth.authenticate())
    .get(getAllRoute)
    .post(createRoute);

  app.route('/steps/:id')
    .all(app.auth.authenticate())
    .get(getByIdRoute)
    .put(updateRoute)
    .delete(deleteRoute);
};
