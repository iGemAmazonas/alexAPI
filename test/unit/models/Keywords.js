describe('Models: Keywords.', () => {
  const Keywords = app.datasource.models.Keywords;
  const Protocols = app.datasource.models.Protocols;

  before(() => app.datasource.sequelize.sync());
  beforeEach(() => Keywords.destroy({ where: {} })
    .then(() => Protocols.destroy({ where: {} })));

  describe('Create an Keyword:', () => {
    it('should not create an Keyword if dont have required field word', () => {
      const testKeyword = {
        id: 1,
      };
      return Keywords.create(testKeyword)
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeValidationError');
          expect(error.message).to.be.eql('notNull Violation: word cannot be null');
        });
    });

    it('should return an Keyword with defined model properties', () => {
      const testKeyword = {
        word: 'Test Keyword',
      };
      return Keywords.create(testKeyword)
        .then((response) => {
          expect(response).to.have.property('id');
          expect(response).to.have.property('word');
        });
    });

    it('should return an Keyword', () => {
      const testKeyword = {
        id: 1,
        word: 'Test Keyword',
      };
      return Keywords.create(testKeyword)
        .then((response) => {
          expect(response.id).to.be.eql(1);
          expect(response.word).to.be.eql('Test Keyword');
        });
    });

    it('should not create an Keyword with id equal to existing', () => {
      const testKeyword1 = {
        id: 1,
        word: 'Test Keyword 1',
      };
      const testKeyword2 = {
        id: 1,
        word: 'Test Keyword 2',
      };
      return Keywords.create(testKeyword1)
        .then(() => Keywords.create(testKeyword2))
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeUniqueConstraintError');
          expect(error.message).to.be.eql('Validation error');
        });
    });
  });

  describe('Association with Protocol:', () => {
    it('check if an keyword has add/get/set/has Protocols properties defined', () => {
      const testKeyword = {
        id: 1,
        word: 'Test Keyword',
      };
      return Keywords.create(testKeyword)
        .then((response) => {
          expect(response).to.have.property('addProtocol');
          expect(response).to.have.property('addProtocols');
          expect(response).to.not.have.property('getProtocol');
          expect(response).to.have.property('getProtocols');
          expect(response).to.not.have.property('setProtocol');
          expect(response).to.have.property('setProtocols');
          expect(response).to.have.property('hasProtocol');
          expect(response).to.have.property('hasProtocols');
          expect(response).to.not.have.property('Protocol');
          expect(response).to.not.have.property('Protocols');
        });
    });

    it('should create and keyword with associated Protocol', () => {
      const testKeyword = {
        id: 1,
        word: 'Test Keyword',
        Protocols: [{
          id: 1,
          title: 'Test Protocol',
          description: 'Test Protocol Description',
        }],
      };
      return Keywords.create(testKeyword, { include: ['Protocols'] })
        .then(keyword => keyword.getProtocols()
          .then((res) => {
            expect(res).to.be.an('array');
            expect(res.length).to.be.eql(1);
            expect(res[0].id).to.be.eql(testKeyword.Protocols[0].id);
            expect(res[0].title).to.be.eql(testKeyword.Protocols[0].title);
            expect(res[0].description).to.be.eql(testKeyword.Protocols[0].description);
            expect(res[0]).to.be.have.property('ProtocolKeywords');
            expect(res[0].ProtocolKeywords).to.not.eql(null);
          }));
    });

    it('should associate a Protocol to an keyword', () => {
      const testKeyword = {
        id: 1,
        word: 'Test Keyword',
      };
      const testProtocol = {
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Keywords.create(testKeyword)
        .then(keyword => Protocols.create(testProtocol)
          .then(protocol => keyword.addProtocol(protocol)
            .then(() => keyword.getProtocols()
              .then((res) => {
                expect(res).to.be.an('array');
                expect(res.length).to.be.eql(1);
                expect(res[0].id).to.be.eql(protocol.id);
                expect(res[0].title).to.be.eql(protocol.title);
                expect(res[0].description).to.be.eql(protocol.description);
              }))));
    });

    it('check if associated protocol has the keyword', () => {
      const testKeyword = {
        id: 1,
        word: 'Test Keyword Authors',
      };
      const testProtocol = {
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Keywords.create(testKeyword)
        .then(keyword => Protocols.create(testProtocol)
          .then(protocol => keyword.addProtocol(protocol)
            .then(() => protocol.getKeywords()
              .then((res) => {
                expect(res).to.be.an('array');
                expect(res.length).to.be.eql(1);
                expect(res[0].id).to.be.eql(keyword.id);
                expect(res[0].word).to.be.eql(keyword.word);
              }))));
    });
  });
});
