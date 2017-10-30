import HttpStatus from 'http-status';
import MaterialsController from '../../../controllers/materials';

describe('Controllers: Materials.', () => {
  describe('Get all materials: getAll()', () => {
    it('should return a list of all materials', () => {
      const Materials = {
        findAll: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        name: 'Test Material',
      }];
      td.when(Materials.findAll({ where: {} })).thenResolve(expectedResponse);
      const materialsController = new MaterialsController(Materials);
      return materialsController.findAllByFilters({})
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const materialsController = new MaterialsController();
      return materialsController.findAllByFilters('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Get a material: getById()', () => {
    it('should return a material', () => {
      const Materials = {
        findOne: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        name: 'Test Material',
      }];
      td.when(Materials.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);
      const materialsController = new MaterialsController(Materials);
      return materialsController.findById({ id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const materialsController = new MaterialsController();
      return materialsController.findById('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Create a material: create()', () => {
    it('should create a material', () => {
      const Materials = {
        create: td.function(),
      };
      const requestBody = {
        name: 'Test Material',
      };
      const expectedResponse = [{
        id: 1,
        name: 'Test Material',
      }];
      td.when(Materials.create(requestBody, '')).thenResolve(expectedResponse);
      const materialsController = new MaterialsController(Materials);
      return materialsController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.CREATED);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const materialsController = new MaterialsController();
      return materialsController.create('', '')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Update a material: update()', () => {
    it('should update a material', () => {
      const Materials = {
        update: td.function(),
      };
      const requestBody = {
        id: 1,
        name: 'Test Material Updated',
      };
      const expectedResponse = [{
        id: 1,
        name: 'Test Material Updated',
      }];
      td.when(Materials.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);
      const materialsController = new MaterialsController(Materials);
      return materialsController.update(requestBody, { id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const materialsController = new MaterialsController();
      return materialsController.update('', '')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Delete a material: delete()', () => {
    it('should delete a material', () => {
      const Materials = {
        destroy: td.function(),
      };
      td.when(Materials.destroy({ where: { id: 1 } })).thenResolve({});
      const materialsController = new MaterialsController(Materials);
      return materialsController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(HttpStatus.NO_CONTENT));
    });

    it('should return BAD REQUEST error', () => {
      const materialsController = new MaterialsController();
      return materialsController.delete('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });
});
