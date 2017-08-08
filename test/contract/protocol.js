describe('Routes Protocols', () => {
  const Protocol = app.datasource.models.Protocol;
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
    Protocol
      .destroy({ where: {} })
      .then(() => Protocol.bulkCreate(protocolList))
      .then(() => done());
  });
  afterEach((done) => {
    Protocol
      .destroy({ where: {} })
      .then(() => done());
  });

  describe('Route GET /protocol', () => {
    it('should return a list of all protocols', (done) => {
      const joiProtocolList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        title: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      }));
      request
        .get('/protocol')
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
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });
      request
        .get('/protocol/1')
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
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
