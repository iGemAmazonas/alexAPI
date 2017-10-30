import HttpStatus from 'http-status';
import KeywordsController from '../../../controllers/keywords';

describe('Controllers: Keywords.', () => {
  describe('Get all keywords: getAll()', () => {
    it('should return a list of all keywords', () => {
      const Keywords = {
        findAll: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        word: 'Test Keyword',
      }];
      td.when(Keywords.findAll({ where: {} })).thenResolve(expectedResponse);
      const keywordsController = new KeywordsController(Keywords);
      return keywordsController.findAllByFilters({})
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const keywordsController = new KeywordsController();
      return keywordsController.findAllByFilters('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Get a keyword: getById()', () => {
    it('should return a keyword', () => {
      const Keywords = {
        findOne: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        word: 'Test Keyword',
      }];
      td.when(Keywords.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);
      const keywordsController = new KeywordsController(Keywords);
      return keywordsController.findById({ id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const keywordsController = new KeywordsController();
      return keywordsController.findById('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Create a keyword: create()', () => {
    it('should create a keyword', () => {
      const Keywords = {
        create: td.function(),
      };
      const requestBody = {
        word: 'Test Keyword',
      };
      const expectedResponse = [{
        id: 1,
        word: 'Test Keyword',
      }];
      td.when(Keywords.create(requestBody, '')).thenResolve(expectedResponse);
      const keywordsController = new KeywordsController(Keywords);
      return keywordsController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.CREATED);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const keywordsController = new KeywordsController();
      return keywordsController.create('', '')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Update a keyword: update()', () => {
    it('should update a keyword', () => {
      const Keywords = {
        update: td.function(),
      };
      const requestBody = {
        id: 1,
        word: 'Test Keyword Updated',
      };
      const expectedResponse = [{
        id: 1,
        word: 'Test Keyword Updated',
      }];
      td.when(Keywords.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);
      const keywordsController = new KeywordsController(Keywords);
      return keywordsController.update(requestBody, { id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const keywordsController = new KeywordsController();
      return keywordsController.update('', '')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Delete a keyword: delete()', () => {
    it('should delete a keyword', () => {
      const Keywords = {
        destroy: td.function(),
      };
      td.when(Keywords.destroy({ where: { id: 1 } })).thenResolve({});
      const keywordsController = new KeywordsController(Keywords);
      return keywordsController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(HttpStatus.NO_CONTENT));
    });

    it('should return BAD REQUEST error', () => {
      const keywordsController = new KeywordsController();
      return keywordsController.delete('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });
});
