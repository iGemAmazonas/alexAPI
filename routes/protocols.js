import ProtocolsController from '../controllers/protocols';
import ProtocolStepsController from '../controllers/protocolSteps';
import ProtocolKeywordsController from '../controllers/protocolKeywords';
import ProtocolCommentsController from '../controllers/protocolComments';
import ProtocolMaterialsController from '../controllers/protocolMaterials';
import ProtocolEquipmentsController from '../controllers/protocolEquipments';
import ProtocolReferencesController from '../controllers/protocolReferences';

function setResponse(response, res) {
  res.status(response.statusCode);
  res.json(response.data);
}

export default(app) => {
  const Protocols = app.datasource.models.Protocols;
  const protocolsController = new ProtocolsController(Protocols);
  const protocolKeywordsController = new ProtocolKeywordsController();
  const protocolReferencesController = new ProtocolReferencesController();
  const protocolEquipmentsController = new ProtocolEquipmentsController();
  const protocolMaterialsController = new ProtocolMaterialsController();
  const protocolCommentsController = new ProtocolCommentsController();
  const protocolStepsController = new ProtocolStepsController();

  function getAllRoute(req, res) {
    protocolsController.findAllByFilters(req.params)
      .then(response => setResponse(response, res));
  }

  function getByIdRoute(req, res) {
    protocolsController.findById(req.params)
      .then(response => setResponse(response, res));
  }

  function createRoute(req, res) {
    req.body.CreatorId = req.user.id;
    protocolsController.create(req.body)
      .then(resProtocols => protocolMaterialsController.create(req.body, resProtocols)
        .then(resMaterials => protocolEquipmentsController.create(req.body, resMaterials)
          .then(resEquipments => protocolKeywordsController.create(req.body, resEquipments)
            .then(resKeywords => protocolReferencesController.create(req.body, resKeywords)
              .then(resReferences => setResponse(resReferences, res))))));
  }

  function updateRoute(req, res) {
    req.params.CreatorId = req.user.id;
    protocolsController.update(req.body, req.params)
      .then(response => setResponse(response, res));
  }

  function deleteRoute(req, res) {
    req.params.CreatorId = req.user.id;
    protocolsController.delete(req.params)
      .then(response => res.sendStatus(response.statusCode));
  }

  function createProtocolSteps(req, res) {
    req.params.CreatorId = req.user.id;
    protocolsController.findById(req.params)
      .then((response) => {
        protocolStepsController.create(req.body, response)
          .then(result => setResponse(result, res));
      });
  }

  function createProtocolComments(req, res) {
    req.params.CreatorId = req.user.id;
    protocolsController.findById(req.params)
      .then((response) => {
        protocolCommentsController.create(req.body, response)
          .then(result => setResponse(result, res));
      });
  }

  function createProtocolReferences(req, res) {
    req.params.CreatorId = req.user.id;
    protocolsController.findById(req.params)
      .then((response) => {
        protocolReferencesController.create(req.body, response)
          .then(result => setResponse(result, res));
      });
  }

  function createProtocolKeywords(req, res) {
    req.params.CreatorId = req.user.id;
    protocolsController.findById(req.params)
      .then((response) => {
        protocolKeywordsController.create(req.body, response)
          .then(result => setResponse(result, res));
      });
  }

  function createProtocolEquipments(req, res) {
    req.params.CreatorId = req.user.id;
    protocolsController.findById(req.params)
      .then((response) => {
        protocolEquipmentsController.create(req.body, response)
          .then(result => setResponse(result, res));
      });
  }

  function createProtocolMaterials(req, res) {
    req.params.CreatorId = req.user.id;
    protocolsController.findById(req.params)
      .then((response) => {
        protocolMaterialsController.create(req.body, response)
          .then(result => setResponse(result, res));
      });
  }

  app.route('/protocols')
    .get(getAllRoute)
    .post(app.auth.authenticate(), createRoute);

  app.route('/protocols/:id')
    .get(getByIdRoute)
    .put(app.auth.authenticate(), updateRoute)
    .delete(app.auth.authenticate(), deleteRoute);

  app.post('/protocols/:id/steps', app.auth.authenticate(), createProtocolSteps);
  app.post('/protocols/:id/comments', app.auth.authenticate(), createProtocolComments);
  app.post('/protocols/:id/keywords', app.auth.authenticate(), createProtocolKeywords);
  app.post('/protocols/:id/references', app.auth.authenticate(), createProtocolReferences);
  app.post('/protocols/:id/equipments', app.auth.authenticate(), createProtocolEquipments);
  app.post('/protocols/:id/materials', app.auth.authenticate(), createProtocolMaterials);
};
