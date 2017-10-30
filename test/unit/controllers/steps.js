import HttpStatus from 'http-status';
import StepsController from '../../../controllers/steps';

describe('Controllers: Steps.', () => {
  describe('Get all steps: getAll()', () => {
    it('should return a list of all steps', () => {
      const Steps = {
        findAll: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        description: 'Test Step',
      }];
      td.when(Steps.findAll({ where: {} })).thenResolve(expectedResponse);
      const stepsController = new StepsController(Steps);
      return stepsController.findAllByFilters({})
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const stepsController = new StepsController();
      return stepsController.findAllByFilters('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Get a step: getById()', () => {
    it('should return a step', () => {
      const Steps = {
        findOne: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        description: 'Test Step',
      }];
      td.when(Steps.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);
      const stepsController = new StepsController(Steps);
      return stepsController.findById({ id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const stepsController = new StepsController();
      return stepsController.findById('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Create a step: create()', () => {
    it('should create a step', () => {
      const Steps = {
        create: td.function(),
      };
      const requestBody = {
        description: 'Test Step',
      };
      const expectedResponse = [{
        id: 1,
        description: 'Test Step',
      }];
      td.when(Steps.create(requestBody, '')).thenResolve(expectedResponse);
      const stepsController = new StepsController(Steps);
      return stepsController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.CREATED);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const stepsController = new StepsController();
      return stepsController.create('', '')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Update a step: update()', () => {
    it('should update a step', () => {
      const Steps = {
        update: td.function(),
      };
      const requestBody = {
        id: 1,
        description: 'Test Step Updated',
      };
      const expectedResponse = [{
        id: 1,
        description: 'Test Step Updated',
      }];
      td.when(Steps.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);
      const stepsController = new StepsController(Steps);
      return stepsController.update(requestBody, { id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const stepsController = new StepsController();
      return stepsController.update('', '')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Delete a step: delete()', () => {
    it('should delete a step', () => {
      const Steps = {
        destroy: td.function(),
      };
      td.when(Steps.destroy({ where: { id: 1 } })).thenResolve({});
      const stepsController = new StepsController(Steps);
      return stepsController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(HttpStatus.NO_CONTENT));
    });

    it('should return BAD REQUEST error', () => {
      const stepsController = new StepsController();
      return stepsController.delete('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });
});
