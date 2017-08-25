describe('Models: Articles', () => {
  const Articles = app.datasource.models.Articles;
  const Protocols = app.datasource.models.Protocols;

  beforeEach((done) => {
    Articles.destroy({ where: {} })
      .then(() => done());
  });
  afterEach((done) => {
    Articles.destroy({ where: {} })
      .then(() => done());
  });

  describe('Create an Article:', () => {
    it('should not create an Article if dont have required field authors', () => {
      const testArticle = {
        id: 1,
      };
      return Articles.create(testArticle)
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeValidationError');
          expect(error.message).to.be.eql('notNull Violation: authors cannot be null');
        });
    });

    it('should return an Article with defined model properties', () => {
      const testArticle = {
        authors: 'Test Article Authors',
        title: 'Test Article Title',
      };
      return Articles.create(testArticle)
        .then((response) => {
          expect(response).to.have.property('id');
          expect(response).to.have.property('authors');
          expect(response).to.have.property('title');
          expect(response).to.have.property('protocolId');
        });
    });

    it('should return an Article with id only after the find method', () => {
      const testArticle = {
        authors: 'Test Article Authors',
      };
      return Articles.create(testArticle)
        .then((response) => {
          expect(response.id).to.be.eql(null);
          expect(response.authors).to.be.eql('Test Article Authors');
          expect(response.title).to.be.eql('Unknown');
        })
        .then(() => Articles.findAll()
          .then((res) => {
            expect(res).to.be.an('array');
            expect(res.length).to.be.eql(1);
            expect(res[0].id).to.be.eql(1);
            expect(res[0].authors).to.be.eql('Test Article Authors');
            expect(res[0].title).to.be.eql('Unknown');
          }));
    });

    it('should not create an Article with id equal to existing', () => {
      const testArticle1 = {
        authors: 'Test Article Authors',
        title: 'Test Article Title',
      };
      const testArticle2 = {
        id: 1,
        authors: 'Test Article Authors 2',
        title: 'Test Article Title 2',
      };
      return Articles.create(testArticle1)
        .then(() => Articles.create(testArticle2))
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeUniqueConstraintError');
          expect(error.message).to.be.eql('Validation error');
        });
    });
  });

  describe('Association with Protocol:', () => {
    it('check if an article has add/get/set/has Protocols properties defined', () => {
      const testArticle = {
        authors: 'Test Article Authors',
        title: 'Test Article Title',
      };
      return Articles.create(testArticle)
        .then(() => Articles.findById(1)
          .then((response) => {
            expect(response).to.not.have.property('addProtocol');
            expect(response).to.not.have.property('addProtocols');
            expect(response).to.have.property('getProtocol');
            expect(response).to.not.have.property('getProtocols');
            expect(response).to.have.property('setProtocol');
            expect(response).to.not.have.property('setProtocols');
            expect(response).to.not.have.property('hasProtocol');
            expect(response).to.not.have.property('hasProtocols');
            expect(response).to.not.have.property('Protocol');
            expect(response).to.not.have.property('Protocols');
          }));
    });

    it('check if associated Protocol has all attributes', () => {
      const testArticle = {
        authors: 'Test Article Authors',
        title: 'Test Article Title',
      };
      const testProtocol = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Articles.create(testArticle)
        .then(() => Protocols.create(testProtocol)
          .then(() => Articles.findById(1)
            .then(article => Protocols.findById(1)
              .then(protocol => article.setProtocol(protocol)
                .then(() => article.getProtocol()
                  .then((res) => {
                    expect(res.id).to.be.eql(1);
                    expect(res.title).to.be.eql(testProtocol.title);
                    expect(res.description).to.be.eql(testProtocol.description);
                  }))))));
    });

    it('check if associated article has all attributes', () => {
      const testArticle = {
        authors: 'Test Article Authors',
      };
      const testProtocol = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Articles.create(testArticle)
        .then(() => Protocols.create(testProtocol)
          .then(() => Articles.findById(1)
            .then(article => Protocols.findById(1)
              .then(protocol => article.setProtocol(protocol)
                .then(() => protocol.getArticle()
                  .then((res) => {
                    expect(res.id).to.be.eql(article.id);
                    expect(res.authors).to.be.eql(article.authors);
                    expect(res.title).to.be.eql('Unknown');
                  }))))));
    });
  });
});
