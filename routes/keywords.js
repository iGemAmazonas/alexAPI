import KeywordsController from '../controllers/keywords';

function setResponse(response, res) {
  res.status(response.statusCode);
  res.json(response.data);
}

export default(app) => {
  const keywordsController = new KeywordsController(app.datasource.models.Keywords);

  function getAllRoute(req, res) {
    keywordsController.findAllByFilters(req.params)
      .then(response => setResponse(response, res));
  }

  function getByIdRoute(req, res) {
    keywordsController.findById(req.params)
      .then(response => setResponse(response, res));
  }

  function createRoute(req, res) {
    keywordsController.create(req.body)
      .then(response => setResponse(response, res));
  }

  function updateRoute(req, res) {
    keywordsController.update(req.body, req.params)
      .then(response => setResponse(response, res));
  }

  function deleteRoute(req, res) {
    keywordsController.delete(req.params)
      .then(response => res.sendStatus(response.statusCode));
  }

  app.route('/keywords')
    .all(app.auth.authenticate())
    .get(getAllRoute)
    .post(createRoute);

  app.route('/keywords/:id')
    .all(app.auth.authenticate())
    .get(getByIdRoute)
    .put(updateRoute)
    .delete(deleteRoute);
};
