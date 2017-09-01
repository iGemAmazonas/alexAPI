describe('Models: Materials', () => {
  const Materials = app.datasource.models.Materials;
  const Protocols = app.datasource.models.Protocols;

  before(() => {
    return app.datasource.sequelize.sync();
  });
  beforeEach(() => {
    return Materials.destroy({ where: {} })
      .then(() => Protocols.destroy({ where: {} }));
  });

  describe('Create a Material:', () => {
    it('should not create a Material if dont have required field name', () => {
      const testMaterial = {
        description: 'Test Material Description',
      };
      return Materials.create(testMaterial)
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeValidationError');
          expect(error.message).to.be.eql('notNull Violation: name cannot be null');
        });
    });

    it('should not create a Material if dont have required field description', () => {
      const testMaterial = {
        name: 'Test Material',
      };
      return Materials.create(testMaterial)
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeValidationError');
          expect(error.message).to.be.eql('notNull Violation: description cannot be null');
        });
    });

    it('should return a Material with defined model properties', () => {
      const testMaterial = {
        name: 'Test Material',
        description: 'Test Material Description',
      };
      return Materials.create(testMaterial)
        .then((response) => {
          expect(response).to.have.property('id');
          expect(response).to.have.property('name');
          expect(response).to.have.property('description');
          expect(response).to.have.property('createdAt');
          expect(response).to.have.property('updatedAt');
        });
    });

    it('should return a Material', () => {
      const testMaterial = {
        id: 1,
        name: 'Test Material',
        description: 'Test Material Description',
      };
      return Materials.create(testMaterial)
        .then((response) => {
          expect(response.id).to.be.eql(1);
          expect(response.name).to.be.eql('Test Material');
          expect(response.description).to.be.eql('Test Material Description');
          expect(response.createdAt).to.be.a('Date');
          expect(response.updatedAt).to.be.a('Date');
        });
    });

    it('should not create a Material with id equal to existing', () => {
      const testMaterial1 = {
        id: 1,
        name: 'Test Material',
        description: 'Test Material 1 Description',
      };
      const testMaterial2 = {
        id: 1,
        name: 'Test Material 2',
        description: 'Test Material 2 Description',
      };
      return Materials.create(testMaterial1)
        .then(() => Materials.create(testMaterial2))
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeUniqueConstraintError');
          expect(error.message).to.be.eql('Validation error');
        });
    });
  });

  describe('Association with Protocol:', () => {
    it('check if a material has add/get/set/has Protocols properties defined', () => {
      const testMaterial = {
        name: 'Test Material',
        description: 'Test Material Description',
      };
      return Materials.create(testMaterial)
        .then((response) => {
          expect(response).to.have.property('addProtocol');
          expect(response).to.have.property('addProtocols');
          expect(response).to.not.have.property('getProtocol');
          expect(response).to.have.property('getProtocols');
          expect(response).to.not.have.property('setProtocol');
          expect(response).to.have.property('setProtocols');
          expect(response).to.have.property('hasProtocol');
          expect(response).to.have.property('hasProtocols');
          expect(response).to.not.have.property('ProtocolMaterials');
          expect(response).to.not.have.property('ProtocolMaterial');
          expect(response).to.not.have.property('Protocols');
          expect(response).to.not.have.property('Protocol');
        });
    });

    it('protocol association requires field quantity', () => {
      const testMaterial = {
        name: 'Test Material',
        description: 'Test Material Description',
      };
      const testProtocol = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Materials.create(testMaterial)
        .then(material => Protocols.create(testProtocol)
          .then(protocol => material.addProtocol(protocol)
            .catch((error) => {
              expect(error.name).to.be.eql('AggregateError');
              expect(error.message).to.be.eql('aggregate error');
            })));
    });

    it('check if Protocol was associated', () => {
      const testMaterial = {
        name: 'Test Material',
        description: 'Test Material Description',
      };
      const testProtocol = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Materials.create(testMaterial)
        .then((material) => Protocols.create(testProtocol)
          .then((protocol) => material.addProtocol(protocol, { through: { quantity: 0 } })
            .then(() => material.hasProtocol(protocol)
              .then(res => expect(res).to.be.true))));
    });

    it('check if associated Protocol has all attributes', () => {
      const testMaterial = {
        name: 'Test Material',
        description: 'Test Material Description',
      };
      const testProtocol = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Materials.create(testMaterial)
        .then((material) => Protocols.create(testProtocol)
          .then((protocol) => material.addProtocols([protocol], { through: { quantity: 1 } })
            .then(() => material.getProtocols()
              .then((res) => {
                expect(res).to.be.an('array');
                expect(res.length).to.be.eql(1);
                expect(res[0].id).to.be.eql(protocol.id);
                expect(res[0].title).to.be.eql(protocol.title);
                expect(res[0].description).to.be.eql(protocol.description);
              }))));
    });

    it('check if associated Protocol has the association attributes', () => {
      const testMaterial = {
        name: 'Test Material',
        description: 'Test Material Description',
      };
      const testProtocol = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Materials.create(testMaterial)
        .then((material) => Protocols.create(testProtocol)
          .then((protocol) => material.setProtocols([protocol], { through: { quantity: 2 } })
            .then(() => material.getProtocols()
              .then((res) => {
                expect(res).to.be.an('array');
                expect(res.length).to.be.eql(1);
                expect(res[0].id).to.be.eql(protocol.id);
                expect(res[0].title).to.be.eql(protocol.title);
                expect(res[0].description).to.be.eql(protocol.description);
                expect(res[0]).to.have.property('ProtocolMaterials');
                expect(res[0].ProtocolMaterials).to.have.property('quantity');
                expect(res[0].ProtocolMaterials.quantity).to.be.eql(2);
              }))));
    });

    it('check adding material to protocol with association attributes', () => {
      const testMaterial = {
        name: 'Test Material',
        description: 'Test Material Description',
      };
      const testProtocol = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Materials.create(testMaterial)
        .then((material) => Protocols.create(testProtocol)
          .then((protocol) => {
            material.ProtocolMaterials = { quantity: 3 };
            return protocol.addMaterial(material)
              .then(() => protocol.getMaterials()
                .then((res) => {
                  expect(res).to.be.an('array');
                  expect(res.length).to.be.eql(1);
                  expect(res[0].id).to.be.eql(material.id);
                  expect(res[0].name).to.be.eql(material.name);
                  expect(res[0].description).to.be.eql(material.description);
                  expect(res[0].ProtocolMaterials.quantity).to.be.eql(3);
                }));
            }));
    });
  });
});
