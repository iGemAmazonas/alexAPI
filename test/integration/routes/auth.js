import jwt from 'jwt-simple';
import HttpStatus from 'http-status';

describe('Routes: Auth.', () => {
  const Users = app.datasource.models.Users;
  const expectedToken = jwt.encode({ id: 1 }, app.config.jwtSecret);

  before(() => app.datasource.sequelize.sync());
  beforeEach(() => Users.destroy({ where: {} })
      .then(() => Users.create({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '12345',
      })));

  describe('Route POST /token', () => {
    it('should return a token to the current user if user data is correct', (done) => {
      const user = {
        email: 'johndoe@email.com',
        password: '12345',
      };
      request
        .post('/token')
        .send(user)
        .end((err, res) => {
          expect(res.body.token).to.be.eql(expectedToken);
          expect(res.status).to.be.eql(HttpStatus.OK);
          done(err);
        });
    });

    it('should return UNAUTHORIZED if password doesnt match', (done) => {
      const user = {
        email: 'johndoe@email.com',
        password: '54321',
      };
      request
        .post('/token')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.be.eql(HttpStatus.UNAUTHORIZED);
          done(err);
        });
    });

    it('should return UNAUTHORIZED if email doesnt exist in database', (done) => {
      const user = {
        email: 'john@email.com',
        password: '12345',
      };
      request
        .post('/token')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.be.eql(HttpStatus.UNAUTHORIZED);
          done(err);
        });
    });

    it('should return BAD REQUEST if dont send the email', (done) => {
      const user = {
        password: '12345',
      };
      request
        .post('/token')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.be.eql(HttpStatus.BAD_REQUEST);
          done(err);
        });
    });

    it('should return BAD REQUEST if dont send the password', (done) => {
      const user = {
        email: 'john@email.com',
      };
      request
        .post('/token')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.be.eql(HttpStatus.BAD_REQUEST);
          done(err);
        });
    });
  });
});
