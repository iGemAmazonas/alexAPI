import jwt from 'jwt-simple';

describe('Routes: Protocol', () => {
  const Protocol = app.datasource.models.Protocol;
  const User = app.datasource.models.User;
  const jwtSecret = app.config.jwtSecret;
  let token;

  const protocolList = [
    {
      id: 1,
      title: 'Test Protocol',
      description: 'Default Protocol Description',
    },
    {
      id: 2,
      title: 'Test Protocol 2',
      description: 'Test Protocol 2 Description',
    },
    {
      id: 3,
      title: 'Test Protocol 3',
      description: 'Test Protocol 3 Description',
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
      request
        .get('/protocol')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.length).to.be.eql(3);
          expect(res.body[0].id).to.be.eql(protocolList[0].id);
          expect(res.body[0].title).to.be.eql(protocolList[0].title);
          expect(res.body[0].description).to.be.eql(protocolList[0].description);
          expect(res.body[1].id).to.be.eql(protocolList[1].id);
          expect(res.body[1].title).to.be.eql(protocolList[1].title);
          expect(res.body[1].description).to.be.eql(protocolList[1].description);
          expect(res.body[2].id).to.be.eql(protocolList[2].id);
          expect(res.body[2].title).to.be.eql(protocolList[2].title);
          expect(res.body[2].description).to.be.eql(protocolList[2].description);
          done(err);
        });
    });
  });

  describe('Route GET /protocol/{id}', () => {
    it('should return a protocol', (done) => {
      request
        .get('/protocol/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(protocolList[0].id);
          expect(res.body.title).to.be.eql(protocolList[0].title);
          expect(res.body.description).to.be.eql(protocolList[0].description);
          done(err);
        });
    });
  });

  describe('Route POST /protocol', () => {
    it('should create a protocol', (done) => {
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
          expect(res.body.id).to.be.eql(newProtocol.id);
          expect(res.body.title).to.be.eql(newProtocol.title);
          expect(res.body.description).to.be.eql(newProtocol.description);
          done(err);
        });
    });
  });

  describe('Route PUT /protocol/{id}', () => {
    it('should update a protocol', (done) => {
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
          expect(res.body).to.be.eql([1]);
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
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
