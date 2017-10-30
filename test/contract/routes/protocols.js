import jwt from 'jwt-simple';
import HttpStatus from 'http-status';

describe('Contracts: Protocols.', () => {
  const Protocols = app.datasource.models.Protocols;
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;
  let token;

  const protocolList = [
    {
      id: 1,
      title: 'Test Protocol 1',
      description: 'Test Protocol 1 Description',
      CreatorId: 1,
    },
    {
      id: 2,
      title: 'Test Protocol 2',
      description: 'Test Protocol 2 Description',
      CreatorId: 1,
    },
    {
      id: 3,
      title: 'Test Protocol 3',
      description: 'Test Protocol 3 Description',
      CreatorId: 1,
    },
  ];

  before(() => app.datasource.sequelize.sync());
  beforeEach(() => Users.destroy({ where: {} })
      .then(() => Users.create({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '12345',
      }))
      .then(user => Protocols.destroy({ where: {} })
        .then(() => Protocols.bulkCreate(protocolList)
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
          }))));

  describe('Route GET /protocols', () => {
    it('should return a list of all protocols', (done) => {
      const joiProtocolList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        title: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
        CreatorId: Joi.number(),
      }));
      request
        .get('/protocols')
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
        CreatorId: Joi.number(),
        Keywords: Joi.array(),
        Materials: Joi.array(),
        Equipments: Joi.array(),
        Steps: Joi.array(),
        References: Joi.array(),
        Comments: Joi.array(),
      });
      request
        .get('/protocols/1')
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
        CreatorId: Joi.number(),
      });
      const newProtocol = {
        id: 4,
        title: 'New Protocol',
        description: 'New Protocol Description',
        CreatorId: 1,
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
        CreatorId: 1,
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
