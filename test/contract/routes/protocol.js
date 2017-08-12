import jwt from 'jwt-simple';
import HttpStatus from 'http-status';

describe('Contracts: Protocol', () => {
  const Protocol = app.datasource.models.Protocol;
  const User = app.datasource.models.User;
  const jwtSecret = app.config.jwtSecret;
  let token;

  const protocolList = [
    {
      title: 'Test Protocol 1',
      description: 'Test Protocol 1 Description',
      authors: 'Test Protocol 1 Author',
      steps: 'Test Protocol 1 Steps',
      keywords: 'Test Protocol 1 Keywords',
      creator_id: 1,
    },
    {
      title: 'Test Protocol 2',
      description: 'Test Protocol 2 Description',
      authors: 'Test Protocol 2 Author',
      steps: 'Test Protocol 2 Steps',
      keywords: 'Test Protocol 2 Keywords',
      creator_id: 1,
    },
    {
      title: 'Test Protocol 3',
      description: 'Test Protocol 3 Description',
      authors: 'Test Protocol 3 Author',
      steps: 'Test Protocol 3 Steps',
      keywords: 'Test Protocol 3 Keywords',
      creator_id: 1,
    },
  ];

  beforeEach((done) => {
    User.destroy({ where: {} })
      .then(() => User.create({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '12345',
      }))
      .then((user) => {
        Protocol.destroy({ where: {} })
          .then(() => Protocol.bulkCreate(protocolList))
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });
  afterEach((done) => {
    User.destroy({ where: {} })
      .then(() => {
        Protocol.destroy({ where: {} })
          .then(() => done());
      });
  });

  describe('Route GET /protocol', () => {
    it('should return a list of all protocols', (done) => {
      const joiProtocolList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        title: Joi.string(),
        description: Joi.string(),
        authors: Joi.string(),
        steps: Joi.string(),
        keywords: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
        creator_id: Joi.number(),
      }));
      request
        .get('/protocol')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          joiAssert(res.body, joiProtocolList);
          done(err);
        });
    });
  });

  describe('Route GET /protocol/{id}', () => {
    it('should return a protocol', (done) => {
      const joiProtocol = Joi.object().keys({
        id: Joi.number(),
        title: Joi.string(),
        description: Joi.string(),
        authors: Joi.string(),
        steps: Joi.string(),
        keywords: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
        creator_id: Joi.number(),
      });
      request
        .get('/protocol/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          joiAssert(res.body, joiProtocol);
          done(err);
        });
    });
  });

  describe('Route POST /protocol', () => {
    it('should create a protocol', (done) => {
      const joiProtocol = Joi.object().keys({
        id: Joi.number(),
        title: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });
      const newProtocol = {
        id: 4,
        title: 'New Protocol',
        description: 'New Protocol Description',
      };
      request
        .post('/protocol')
        .set('Authorization', `JWT ${token}`)
        .send(newProtocol)
        .end((err, res) => {
          joiAssert(res.body, joiProtocol);
          done(err);
        });
    });
  });

  describe('Route PUT /protocol/{id}', () => {
    it('should update a protocol', (done) => {
      const joiUpdatedCount = Joi.array().items(1);
      const updatedProtocol = {
        id: 1,
        title: 'Updated Protocol',
        description: 'Updated Protocol Description',
      };
      request
        .put('/protocol/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedProtocol)
        .end((err, res) => {
          joiAssert(res.body, joiUpdatedCount);
          done(err);
        });
    });
  });

  describe('Route DELETE /protocol/{id}', () => {
    it('should delete a protocol', (done) => {
      request
        .delete('/protocol/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(HttpStatus.NO_CONTENT);
          done(err);
        });
    });
  });
});
