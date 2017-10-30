import HttpStatus from 'http-status';
import UsersController from '../../../controllers/users';

describe('Controllers: Users.', () => {
  describe('Get all users: getAll()', () => {
    it('should return a list of all users', () => {
      const Users = {
        findAll: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        name: 'Test User',
        password: 'Test User Password',
      }];
      td.when(Users.findAll({ where: {} })).thenResolve(expectedResponse);
      const usersController = new UsersController(Users);
      return usersController.findAllByFilters({})
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const usersController = new UsersController();
      return usersController.findAllByFilters('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Get an user: getById()', () => {
    it('should return an user', () => {
      const Users = {
        findOne: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        name: 'Test User',
        password: 'Test User Password',
      }];
      td.when(Users.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);
      const usersController = new UsersController(Users);
      return usersController.findById({ id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const usersController = new UsersController();
      return usersController.findById('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Create an user: create()', () => {
    it('should create an user', () => {
      const Users = {
        create: td.function(),
      };
      const requestBody = {
        name: 'Test User',
        password: 'Test User Password',
      };
      const expectedResponse = [{
        id: 1,
        name: 'Test User',
        password: 'Test User Password',
      }];
      td.when(Users.create(requestBody, '')).thenResolve(expectedResponse);
      const usersController = new UsersController(Users);
      return usersController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.CREATED);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const usersController = new UsersController();
      return usersController.create('', '')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Update an user: update()', () => {
    it('should update an user', () => {
      const Users = {
        update: td.function(),
      };
      const requestBody = {
        id: 1,
        name: 'Test User Updated',
        password: 'Test User Password',
      };
      const expectedResponse = [{
        id: 1,
        name: 'Test User Updated',
        password: 'Test User Password',
      }];
      td.when(Users.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);
      const usersController = new UsersController(Users);
      return usersController.update(requestBody, { id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.OK);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return BAD REQUEST error', () => {
      const usersController = new UsersController();
      return usersController.update('', '')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });

  describe('Delete an user: delete()', () => {
    it('should delete an user', () => {
      const Users = {
        destroy: td.function(),
      };
      td.when(Users.destroy({ where: { id: 1 } })).thenResolve({});
      const usersController = new UsersController(Users);
      return usersController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(HttpStatus.NO_CONTENT));
    });

    it('should return BAD REQUEST error', () => {
      const usersController = new UsersController();
      return usersController.delete('')
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
          expect(response.data.error).to.be.eql('Filters cannot be empty');
        });
    });
  });
});
