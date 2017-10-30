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
    protocolsController.create(req.body)
      .then(resProtocols => protocolMaterialsController.create(req.body, resProtocols)
        .then(resMaterials => protocolEquipmentsController.create(req.body, resMaterials)
          .then(resEquipments => protocolKeywordsController.create(req.body, resEquipments)
            .then(resKeywords => protocolReferencesController.create(req.body, resKeywords)
              .then(resReferences => setResponse(resReferences, res))))));
  }

  function updateRoute(req, res) {
    protocolsController.update(req.body, req.params)
      .then(response => setResponse(response, res));
  }

  function deleteRoute(req, res) {
    protocolsController.delete(req.params)
      .then(response => res.sendStatus(response.statusCode));
  }

  function createProtocolSteps(req, res) {
    protocolsController.findById(req.params)
      .then((response) => {
        protocolStepsController.create(req.body, response)
          .then(result => setResponse(result, res));
      });
  }

  function createProtocolComments(req, res) {
    protocolsController.findById(req.params)
      .then((response) => {
        protocolCommentsController.create(req.body, response)
          .then(result => setResponse(result, res));
      });
  }

  function createProtocolReferences(req, res) {
    protocolsController.findById(req.params)
      .then((response) => {
        protocolReferencesController.create(req.body, response)
          .then(result => setResponse(result, res));
      });
  }

  function createProtocolKeywords(req, res) {
    protocolsController.findById(req.params)
      .then((response) => {
        protocolKeywordsController.create(req.body, response)
          .then(result => setResponse(result, res));
      });
  }

  function createProtocolEquipments(req, res) {
    protocolsController.findById(req.params)
      .then((response) => {
        protocolEquipmentsController.create(req.body, response)
          .then(result => setResponse(result, res));
      });
  }

  function createProtocolMaterials(req, res) {
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
    .all(app.auth.authenticate())
    .put(updateRoute)
    .delete(deleteRoute);

  app.post('/protocols/:id/steps', createProtocolSteps);
  app.post('/protocols/:id/comments', createProtocolComments);
  app.post('/protocols/:id/keywords', createProtocolKeywords);
  app.post('/protocols/:id/references', createProtocolReferences);
  app.post('/protocols/:id/equipments', createProtocolEquipments);
  app.post('/protocols/:id/materials', createProtocolMaterials);
};
