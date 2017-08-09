import ProtocolController from '../controllers/protocol';


export default(app) => {
  const protocolController = new ProtocolController(app.datasource.models.Protocol);

  app.route('/protocol')
    //.all(app.auth.authenticate())
    .get((req, res) => {
      protocolController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      protocolController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/protocol/:id')
    //.all(app.auth.authenticate())
    .get((req, res) => {
      protocolController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      protocolController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      protocolController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
