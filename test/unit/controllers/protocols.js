import HttpStatus from 'http-status';
import ProtocolsController from '../../../controllers/protocols';

describe('Controllers: Protocols.', () => {
  describe('Get all protocols: getAll()', () => {
    it('should return a list of all protocols', () => {
      const Protocols = {
        findAll: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      }];
      td.when(Protocols.findAll({ where: {} })).thenResolve(expectedResponse);
      const protocolsController = new ProtocolsController(Protocols);
      return protocolsController.findAllByFilters()
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const protocolsController = new ProtocolsController();
      return protocolsController.findAllByFilters('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Get a protocol: getById()', () => {
    it('should return a protocol', () => {
      const Protocols = {
        findOne: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      }];
      td.when(Protocols.findOne({ where: { id: 1 },
        include: ['Keywords', 'Materials', 'Equipments', 'Steps', 'References', 'Comments'] }))
        .thenResolve(expectedResponse);
      const protocolsController = new ProtocolsController(Protocols);
      return protocolsController.findById({ id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const protocolsController = new ProtocolsController();
      return protocolsController.findById('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Create a protocol: create()', () => {
    it('should create a protocol', () => {
      const Protocols = {
        create: td.function(),
      };
      const requestBody = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      const expectedResponse = [{
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      }];
      td.when(Protocols.create(requestBody, { include: ['Steps'] })).thenResolve(expectedResponse);
      const protocolsController = new ProtocolsController(Protocols);
      return protocolsController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.CREATED);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const protocolsController = new ProtocolsController();
      return protocolsController.create('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Update a protocol: update()', () => {
    it('should update a protocol', () => {
      const Protocols = {
        update: td.function(),
      };
      const requestBody = {
        id: 1,
        title: 'Test Protocol Updated',
        description: 'Test Protocol Description',
      };
      const expectedResponse = [{
        id: 1,
        title: 'Test Protocol Updated',
        description: 'Test Protocol Description',
      }];
      td.when(Protocols.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);
      const protocolsController = new ProtocolsController(Protocols);
      return protocolsController.update(requestBody, { id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const protocolsController = new ProtocolsController();
      return protocolsController.update('', '')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Delete a protocol: delete()', () => {
    it('should delete a protocol', () => {
      const Protocols = {
        destroy: td.function(),
      };
      td.when(Protocols.destroy({ where: { id: 1 }, include: ['Steps'] })).thenResolve({});
      const protocolsController = new ProtocolsController(Protocols);
      return protocolsController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(HttpStatus.NO_CONTENT));
    });

    it('should return BAD REQUEST error', () => {
      const protocolsController = new ProtocolsController();
      return protocolsController.delete('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });
});
