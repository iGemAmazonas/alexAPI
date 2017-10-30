import CommentsController from '../controllers/comments';

function setResponse(response, res) {
  res.status(response.statusCode);
  res.json(response.data);
}

export default(app) => {
  const commentsController = new CommentsController(app.datasource.models.Comments);

  function getAllRoute(req, res) {
    commentsController.findAllByFilters(req.params)
      .then(response => setResponse(response, res));
  }

  function getByIdRoute(req, res) {
    commentsController.findById(req.params)
      .then(response => setResponse(response, res));
  }

  function createRoute(req, res) {
    commentsController.create(req.body)
      .then(response => setResponse(response, res));
  }

  function updateRoute(req, res) {
    commentsController.update(req.body, req.params)
      .then(response => setResponse(response, res));
  }

  function deleteRoute(req, res) {
    commentsController.delete(req.params)
      .then(response => res.sendStatus(response.statusCode));
  }

  app.route('/comments')
    .all(app.auth.authenticate())
    .get(getAllRoute)
    .post(createRoute);

  app.route('/comments/:id')
    .all(app.auth.authenticate())
    .get(getByIdRoute)
    .put(updateRoute)
    .delete(deleteRoute);
};
