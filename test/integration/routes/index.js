
describe('Routes: Index GET /.', () => {
  it('should return project name and version', (done) => {
    request
      .get('/')
      .end((err, res) => {
        expect(res.body.name).to.be.eql('AlexAPI');
        expect(res.body.version).to.be.eql('1.0');
        done(err);
      });
  });
});
