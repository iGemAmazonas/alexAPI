import jwt from 'jwt-simple';
import HttpStatus from 'http-status';

describe('Contracts: Protocols', () => {
  const Protocols = app.datasource.models.Protocols;
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;
  let token;

  const protocolList = [
    {
      title: 'Test Protocol 1',
      description: 'Test Protocol 1 Description',
      creatorId: 1,
    },
    {
      title: 'Test Protocol 2',
      description: 'Test Protocol 2 Description',
      creatorId: 1,
    },
    {
      title: 'Test Protocol 3',
      description: 'Test Protocol 3 Description',
      creatorId: 1,
    },
  ];

  beforeEach((done) => {
    Users.destroy({ where: {} })
      .then(() => Users.create({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '12345',
      }))
      .then((user) => {
        Protocols.destroy({ where: {} })
          .then(() => Protocols.bulkCreate(protocolList))
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });
  afterEach((done) => {
    Users.destroy({ where: {} })
      .then(() => {
        Protocols.destroy({ where: {} })
          .then(() => done());
      });
  });

  describe('Route GET /protocols', () => {
    it('should return a list of all protocols', (done) => {
      const joiProtocolList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        title: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
        creatorId: Joi.number(),
      }));
      request
        .get('/protocols')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          joiAssert(res.body, joiProtocolList);
          done(err);
        });
    });
  });

  describe('Route GET /protocols/{id}', () => {
    it('should return a protocol', (done) => {
      const joiProtocol = Joi.object().keys({
        id: Joi.number(),
        title: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
        creatorId: Joi.number(),
      });
      request
        .get('/protocols/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          joiAssert(res.body, joiProtocol);
          done(err);
        });
    });
  });

  describe('Route POST /protocols', () => {
    it('should create a protocol', (done) => {
      const joiProtocol = Joi.object().keys({
        id: Joi.number(),
        title: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });
      const newProtocol = {
        id: 4,
        title: 'New Protocol',
        description: 'New Protocol Description',
      };
      request
        .post('/protocols')
        .set('Authorization', `JWT ${token}`)
        .send(newProtocol)
        .end((err, res) => {
          joiAssert(res.body, joiProtocol);
          done(err);
        });
    });
  });

  describe('Route PUT /protocols/{id}', () => {
    it('should update a protocol', (done) => {
      const joiUpdatedCount = Joi.array().items(1);
      const updatedProtocol = {
        id: 1,
        title: 'Updated Protocol',
        description: 'Updated Protocol Description',
      };
      request
        .put('/protocols/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedProtocol)
        .end((err, res) => {
          joiAssert(res.body, joiUpdatedCount);
          done(err);
        });
    });
  });

  describe('Route DELETE /protocols/{id}', () => {
    it('should delete a protocol', (done) => {
      request
        .delete('/protocols/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(HttpStatus.NO_CONTENT);
          done(err);
        });
    });
  });
});
