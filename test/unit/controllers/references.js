import HttpStatus from 'http-status';
import ReferencesController from '../../../controllers/references';

describe('Controllers: References.', () => {
  describe('Get all references: getAll()', () => {
    it('should return a list of all references', () => {
      const References = {
        findAll: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        title: 'Test Reference',
        authors: 'Test Reference Authors',
      }];
      td.when(References.findAll({ where: {} })).thenResolve(expectedResponse);
      const referencesController = new ReferencesController(References);
      return referencesController.findAllByFilters({})
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const referencesController = new ReferencesController();
      return referencesController.findAllByFilters('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Get an reference: getById()', () => {
    it('should return an reference', () => {
      const References = {
        findOne: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        title: 'Test Reference',
        authors: 'Test Reference Authors',
      }];
      td.when(References.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);
      const referencesController = new ReferencesController(References);
      return referencesController.findById({ id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const referencesController = new ReferencesController();
      return referencesController.findById('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Create an reference: create()', () => {
    it('should create an reference', () => {
      const References = {
        create: td.function(),
      };
      const requestBody = {
        title: 'Test Reference',
        authors: 'Test Reference Authors',
      };
      const expectedResponse = [{
        id: 1,
        title: 'Test Reference',
        authors: 'Test Reference Authors',
      }];
      td.when(References.create(requestBody, '')).thenResolve(expectedResponse);
      const referencesController = new ReferencesController(References);
      return referencesController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.CREATED);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const referencesController = new ReferencesController();
      return referencesController.create('', '')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Update an reference: update()', () => {
    it('should update an reference', () => {
      const References = {
        update: td.function(),
      };
      const requestBody = {
        id: 1,
        title: 'Test Reference Updated',
        authors: 'Test Reference Authors',
      };
      const expectedResponse = [{
        id: 1,
        title: 'Test Reference Updated',
        authors: 'Test Reference Authors',
      }];
      td.when(References.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);
      const referencesController = new ReferencesController(References);
      return referencesController.update(requestBody, { id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const referencesController = new ReferencesController();
      return referencesController.update('', '')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Delete an reference: delete()', () => {
    it('should delete an reference', () => {
      const References = {
        destroy: td.function(),
      };
      td.when(References.destroy({ where: { id: 1 } })).thenResolve({});
      const referencesController = new ReferencesController(References);
      return referencesController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(HttpStatus.NO_CONTENT));
    });

    it('should return BAD REQUEST error', () => {
      const referencesController = new ReferencesController();
      return referencesController.delete('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });
});
