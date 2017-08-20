import ProtocolsController from '../controllers/protocols';


export default(app) => {
  const protocolsController = new ProtocolsController(app.datasource.models.Protocols);

  app.route('/protocols')
    .all(app.auth.authenticate())
    .get((req, res) => {
      protocolsController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      protocolsController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/protocols/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      protocolsController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      protocolsController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      protocolsController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
