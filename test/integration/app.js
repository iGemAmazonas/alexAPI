describe('Routes Protocols', () => {
  const Protocol = app.datasource.models.Protocol;
  const protocolList = [
    {
      id: 1,
      title: 'Default Protocol',
      description: 'Default Protocol Description',
    },
    {
      id: 2,
      title: 'Protocol 2',
      description: 'Protocol 2 Description',
    },
    {
      id: 3,
      title: 'Protocol 3',
      description: 'Protocol 3 Description',
    },
  ];

  beforeEach((done) => {
    Protocol
      .destroy({ where: {} })
      .then(() => Protocol.bulkCreate(protocolList))
      .then(() => done());
  });

  describe('Route GET /protocol', () => {
    it('should return a list of all protocols', (done) => {
      request
        .get('/protocol')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(protocolList[0].id);
          expect(res.body[0].title).to.be.eql(protocolList[0].title);
          expect(res.body[0].description).to.be.eql(protocolList[0].description);

          done(err);
        });
    });
  });

  describe('Route GET /protocol/{id}', () => {
    it('should return a protocol', (done) => {
      request
        .get('/protocol/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(protocolList[0].id);
          expect(res.body.title).to.be.eql(protocolList[0].title);
          expect(res.body.description).to.be.eql(protocolList[0].description);

          done(err);
        });
    });
  });
/*
  describe('Route GET /protocols/{id}', () => {
    it('should return a protocol with matched filter opt', done => {

      request
        .get('/protocols/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(protocolList[0].id);
          expect(res.body.title).to.be.eql(protocolList[0].title);
          expect(res.body.description).to.be.eql(protocolList[0].description);

          done(err);
        });
    });
  });
*/
  describe('Route POST /protocol', () => {
    it('should create a protocol', (done) => {
      const newProtocol = {
        id: 4,
        title: 'New Protocol',
        description: 'New Protocol Description',
      };
      request
        .post('/protocol')
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
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
