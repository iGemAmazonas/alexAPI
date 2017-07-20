describe('Routes Protocols', () => {

  const Protocol = app.datasource.models.Protocol;
  const defaultProtocol = {
    id: 1,
    title: 'Default Protocol',
    description: 'Default Protocol Description'
  };

  beforeEach(done => {
    Protocol
      .destroy({where: {}})
      .then(() => Protocol.create(defaultProtocol))
      .then(() => done());
  });

  describe('Route GET /protocols', () => {
    it('should return a list of protocols', done => {

      request
        .get('/protocols')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultProtocol.id);
          expect(res.body[0].title).to.be.eql(defaultProtocol.title);
          expect(res.body[0].description).to.be.eql(defaultProtocol.description);

          done(err);
        });
    });
  });
});
