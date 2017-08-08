import ProtocolController from '../../../controllers/protocol';

describe('Controllers: Protocol', () => {
  describe('Get all protocols: getAll()', () => {
    it('should return a list of all protocols', () => {
      const Protocol = {
        findAll: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-06T23:55:36.692Z',
      }];
      td.when(Protocol.findAll({})).thenResolve(expectedResponse);
      const protocolController = new ProtocolController(Protocol);
      return protocolController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get a protocol: getById()', () => {
    it('should return a protocol', () => {
      const Protocol = {
        findOne: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-06T23:55:36.692Z',
      }];
      td.when(Protocol.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);
      const protocolController = new ProtocolController(Protocol);
      return protocolController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a protocol: create()', () => {
    it('should create a protocol', () => {
      const Protocol = {
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
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-06T23:55:36.692Z',
      }];
      td.when(Protocol.create(requestBody)).thenResolve(expectedResponse);
      const protocolController = new ProtocolController(Protocol);
      return protocolController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a protocol: update()', () => {
    it('should update a protocol', () => {
      const Protocol = {
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
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-06T23:55:36.692Z',
      }];
      td.when(Protocol.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);
      const protocolController = new ProtocolController(Protocol);
      return protocolController.update(requestBody, { id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(200);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Delete a protocol: delete()', () => {
    it('should delete a protocol', () => {
      const Protocol = {
        destroy: td.function(),
      };
      td.when(Protocol.destroy({ where: { id: 1 } })).thenResolve({});
      const protocolController = new ProtocolController(Protocol);
      return protocolController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });
});
