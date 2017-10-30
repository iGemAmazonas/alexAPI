describe('Models: References.', () => {
  const References = app.datasource.models.References;
  const Protocols = app.datasource.models.Protocols;

  before(() => app.datasource.sequelize.sync());
  beforeEach(() => References.destroy({ where: {} })
    .then(() => Protocols.destroy({ where: {} })));

  describe('Create an Reference:', () => {
    it('should not create an Reference if dont have required field authors', () => {
      const testReference = {
        id: 1,
      };
      return References.create(testReference)
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeValidationError');
          expect(error.message).to.be.eql('notNull Violation: authors cannot be null');
        });
    });

    it('should return an Reference with defined model properties', () => {
      const testReference = {
        authors: 'Test Reference Authors',
        title: 'Test Reference Title',
      };
      return References.create(testReference)
        .then((response) => {
          expect(response).to.have.property('id');
          expect(response).to.have.property('authors');
          expect(response).to.have.property('title');
        });
    });

    it('should return an Reference with unknow title', () => {
      const testReference = {
        id: 1,
        authors: 'Test Reference Authors',
      };
      return References.create(testReference)
        .then((response) => {
          expect(response.id).to.be.eql(1);
          expect(response.authors).to.be.eql('Test Reference Authors');
          expect(response.title).to.be.eql('Unknown');
        });
    });

    it('should return an Reference', () => {
      const testReference = {
        id: 1,
        authors: 'Test Reference Authors',
        title: 'Test Reference Title',
      };
      return References.create(testReference)
        .then((response) => {
          expect(response.id).to.be.eql(1);
          expect(response.authors).to.be.eql('Test Reference Authors');
          expect(response.title).to.be.eql('Test Reference Title');
        });
    });

    it('should not create an Reference with id equal to existing', () => {
      const testReference1 = {
        id: 1,
        authors: 'Test Reference Authors',
        title: 'Test Reference Title',
      };
      const testReference2 = {
        id: 1,
        authors: 'Test Reference Authors 2',
        title: 'Test Reference Title 2',
      };
      return References.create(testReference1)
        .then(() => References.create(testReference2))
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeUniqueConstraintError');
          expect(error.message).to.be.eql('Validation error');
        });
    });
  });

  describe('Association with Protocol:', () => {
    it('check if an reference has add/get/set/has Protocols properties defined', () => {
      const testReference = {
        id: 1,
        authors: 'Test Reference Authors',
        title: 'Test Reference Title',
      };
      return References.create(testReference)
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

    it('should create and reference with associated Protocol', () => {
      const testReference = {
        id: 1,
        authors: 'Test Reference Authors',
        title: 'Test Reference Title',
        Protocols: [{
          id: 1,
          title: 'Test Protocol',
          description: 'Test Protocol Description',
        }],
      };
      return References.create(testReference, { include: ['Protocols'] })
        .then(reference => reference.getProtocols()
          .then((res) => {
            expect(res).to.be.an('array');
            expect(res.length).to.be.eql(1);
            expect(res[0].id).to.be.eql(testReference.Protocols[0].id);
            expect(res[0].title).to.be.eql(testReference.Protocols[0].title);
            expect(res[0].description).to.be.eql(testReference.Protocols[0].description);
            expect(res[0]).to.be.have.property('ProtocolReferences');
            expect(res[0].ProtocolReferences).to.not.eql(null);
          }));
    });

    it('should associate a Protocol to an reference', () => {
      const testReference = {
        id: 1,
        authors: 'Test Reference Authors',
        title: 'Test Reference Title',
      };
      const testProtocol = {
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return References.create(testReference)
        .then(reference => Protocols.create(testProtocol)
          .then(protocol => reference.addProtocol(protocol)
            .then(() => reference.getProtocols()
              .then((res) => {
                expect(res).to.be.an('array');
                expect(res.length).to.be.eql(1);
                expect(res[0].id).to.be.eql(protocol.id);
                expect(res[0].title).to.be.eql(protocol.title);
                expect(res[0].description).to.be.eql(protocol.description);
              }))));
    });

    it('check if associated protocol has the reference', () => {
      const testReference = {
        id: 1,
        authors: 'Test Reference Authors',
      };
      const testProtocol = {
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return References.create(testReference)
        .then(reference => Protocols.create(testProtocol)
          .then(protocol => reference.addProtocol(protocol)
            .then(() => protocol.getReferences()
              .then((res) => {
                expect(res).to.be.an('array');
                expect(res.length).to.be.eql(1);
                expect(res[0].id).to.be.eql(reference.id);
                expect(res[0].authors).to.be.eql(reference.authors);
                expect(res[0].title).to.be.eql(reference.title);
              }))));
    });
  });
});
