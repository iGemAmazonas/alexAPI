import HttpStatus from 'http-status';
import EquipmentsController from '../../../controllers/equipments';

describe('Controllers: Equipments.', () => {
  describe('Get all equipments: getAll()', () => {
    it('should return a list of all equipments', () => {
      const Equipments = {
        findAll: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        name: 'Test Equipment',
      }];
      td.when(Equipments.findAll({ where: {} })).thenResolve(expectedResponse);
      const equipmentsController = new EquipmentsController(Equipments);
      return equipmentsController.findAllByFilters({})
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const equipmentsController = new EquipmentsController();
      return equipmentsController.findAllByFilters('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Get a equipment: getById()', () => {
    it('should return a equipment', () => {
      const Equipments = {
        findOne: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        name: 'Test Equipment',
      }];
      td.when(Equipments.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);
      const equipmentsController = new EquipmentsController(Equipments);
      return equipmentsController.findById({ id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const equipmentsController = new EquipmentsController();
      return equipmentsController.findById('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Create a equipment: create()', () => {
    it('should create a equipment', () => {
      const Equipments = {
        create: td.function(),
      };
      const requestBody = {
        name: 'Test Equipment',
      };
      const expectedResponse = [{
        id: 1,
        name: 'Test Equipment',
      }];
      td.when(Equipments.create(requestBody, '')).thenResolve(expectedResponse);
      const equipmentsController = new EquipmentsController(Equipments);
      return equipmentsController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.CREATED);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const equipmentsController = new EquipmentsController();
      return equipmentsController.create('', '')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Update a equipment: update()', () => {
    it('should update a equipment', () => {
      const Equipments = {
        update: td.function(),
      };
      const requestBody = {
        id: 1,
        name: 'Test Equipment Updated',
      };
      const expectedResponse = [{
        id: 1,
        name: 'Test Equipment Updated',
      }];
      td.when(Equipments.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);
      const equipmentsController = new EquipmentsController(Equipments);
      return equipmentsController.update(requestBody, { id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const equipmentsController = new EquipmentsController();
      return equipmentsController.update('', '')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Delete a equipment: delete()', () => {
    it('should delete a equipment', () => {
      const Equipments = {
        destroy: td.function(),
      };
      td.when(Equipments.destroy({ where: { id: 1 } })).thenResolve({});
      const equipmentsController = new EquipmentsController(Equipments);
      return equipmentsController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(HttpStatus.NO_CONTENT));
    });

    it('should return BAD REQUEST error', () => {
      const equipmentsController = new EquipmentsController();
      return equipmentsController.delete('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });
});
