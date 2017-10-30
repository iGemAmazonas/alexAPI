import HttpStatus from 'http-status';
import BaseController from '../../../controllers/bases';

describe('Controllers: Base.', () => {
  describe('Get all baseObjects: getAll()', () => {
    it('should return a list of all baseObjects', () => {
      const Base = {
        findAll: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        title: 'Test Base',
      }];
      td.when(Base.findAll({ where: {} })).thenResolve(expectedResponse);
      const baseController = new BaseController(Base);
      return baseController.findAllByFilters({ where: {} })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return UNPROCESSABLE ENTITY error', () => {
      const Base = {
        findAll: td.function(),
      };
      td.when(Base.findAll({ where: {} })).thenReject(new Error('Database error'));
      const baseController = new BaseController(Base);
      return baseController.findAllByFilters({ where: {} })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.UNPROCESSABLE_ENTITY);
          expect(response.data.error).to.be.eql('Database error');
        });
    });
  });

  describe('Get a baseObject: getById()', () => {
    it('should return a baseObject', () => {
      const Base = {
        findOne: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        title: 'Test Base',
      }];
      td.when(Base.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);
      const baseController = new BaseController(Base);
      return baseController.findById({ where: { id: 1 } })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return UNPROCESSABLE ENTITY error', () => {
      const Base = {
        findOne: td.function(),
      };
      td.when(Base.findOne({ where: { id: 1 } })).thenReject(new Error('Database error'));
      const baseController = new BaseController(Base);
      return baseController.findById({ where: { id: 1 } })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.UNPROCESSABLE_ENTITY);
          expect(response.data.error).to.be.eql('Database error');
        });
    });
  });

  describe('Create a baseObject: create()', () => {
    it('should create a baseObject', () => {
      const Base = {
        create: td.function(),
      };
      const requestBody = {
        title: 'Test Base',
      };
      const expectedResponse = [{
        id: 1,
        title: 'Test Base',
      }];
      td.when(Base.create(requestBody, '')).thenResolve(expectedResponse);
      const baseController = new BaseController(Base);
      return baseController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.CREATED);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return UNPROCESSABLE ENTITY error', () => {
      const Base = {
        create: td.function(),
      };
      const requestBody = {
        title: 'Test Base',
      };
      td.when(Base.create(requestBody, '')).thenReject(new Error('Database error'));
      const baseController = new BaseController(Base);
      return baseController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.UNPROCESSABLE_ENTITY);
          expect(response.data.error).to.be.eql('Database error');
        });
    });
  });

  describe('Update a baseObject: update()', () => {
    it('should update a baseObject', () => {
      const Base = {
        update: td.function(),
      };
      const requestBody = {
        id: 1,
        title: 'Test Base Updated',
      };
      const expectedResponse = [{
        id: 1,
        title: 'Test Base Updated',
      }];
      td.when(Base.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);
      const baseController = new BaseController(Base);
      return baseController.update(requestBody, { where: { id: 1 } })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return UNPROCESSABLE ENTITY error', () => {
      const Base = {
        update: td.function(),
      };
      const requestBody = {
        id: 1,
        title: 'Test Base Updated',
      };
      td.when(Base.update(requestBody, { where: { id: 1 } })).thenReject(new Error('Database error'));
      const baseController = new BaseController(Base);
      return baseController.update(requestBody, { where: { id: 1 } })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.UNPROCESSABLE_ENTITY);
          expect(response.data.error).to.be.eql('Database error');
        });
    });
  });

  describe('Delete a baseObject: delete()', () => {
    it('should delete a baseObject', () => {
      const Base = {
        destroy: td.function(),
      };
      td.when(Base.destroy({ where: { id: 1 } })).thenResolve({});
      const baseController = new BaseController(Base);
      return baseController.delete({ where: { id: 1 } })
        .then(response => expect(response.statusCode).to.be.eql(HttpStatus.NO_CONTENT));
    });

    it('should return UNPROCESSABLE ENTITY error', () => {
      const Base = {
        destroy: td.function(),
      };
      td.when(Base.destroy({ where: { id: 1 } })).thenReject(new Error('Database error'));
      const baseController = new BaseController(Base);
      return baseController.delete({ where: { id: 1 } })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.UNPROCESSABLE_ENTITY);
          expect(response.data.error).to.be.eql('Database error');
        });
    });
  });
});
