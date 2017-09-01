describe('Models: Reagents', () => {
  const Reagents = app.datasource.models.Reagents;
  const Protocols = app.datasource.models.Protocols;

  before(() => {
    return app.datasource.sequelize.sync();
  });
  beforeEach(() => {
    return Reagents.destroy({ where: {} })
      .then(() => Protocols.destroy({ where: {} }));
  });

  describe('Create a Reagent:', () => {
    it('should not create a Reagent if dont have required field name', () => {
      const testReagent = {
        description: 'Test Reagent Description',
      };
      return Reagents.create(testReagent)
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeValidationError');
          expect(error.message).to.be.eql('notNull Violation: name cannot be null');
        });
    });

    it('should not create a Reagent if dont have required field description', () => {
      const testReagent = {
        name: 'Test Reagent',
      };
      return Reagents.create(testReagent)
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeValidationError');
          expect(error.message).to.be.eql('notNull Violation: description cannot be null');
        });
    });

    it('should return a Reagent with defined model properties', () => {
      const testReagent = {
        name: 'Test Reagent',
        description: 'Test Reagent Description',
      };
      return Reagents.create(testReagent)
        .then((response) => {
          expect(response).to.have.property('id');
          expect(response).to.have.property('name');
          expect(response).to.have.property('description');
          expect(response).to.have.property('createdAt');
          expect(response).to.have.property('updatedAt');
        });
    });

    it('should return a Reagent', () => {
      const testReagent = {
        id: 1,
        name: 'Test Reagent',
        description: 'Test Reagent Description',
      };
      return Reagents.create(testReagent)
        .then((response) => {
          expect(response.id).to.be.eql(1);
          expect(response.name).to.be.eql('Test Reagent');
          expect(response.description).to.be.eql('Test Reagent Description');
          expect(response.createdAt).to.be.a('Date');
          expect(response.updatedAt).to.be.a('Date');
        });
    });

    it('should not create a Reagent with id equal to existing', () => {
      const testReagent1 = {
        id: 1,
        name: 'Test Reagent',
        description: 'Test Reagent 1 Description',
      };
      const testReagent2 = {
        id: 1,
        name: 'Test Reagent 2',
        description: 'Test Reagent 2 Description',
      };
      return Reagents.create(testReagent1)
        .then(() => Reagents.create(testReagent2))
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeUniqueConstraintError');
          expect(error.message).to.be.eql('Validation error');
        });
    });
  });

  describe('Association with Protocol:', () => {
    it('check if a reagent has add/get/set/has Protocols properties defined', () => {
      const testReagent = {
        name: 'Test Reagent',
        description: 'Test Reagent Description',
      };
      return Reagents.create(testReagent)
        .then((response) => {
          expect(response).to.have.property('addProtocol');
          expect(response).to.have.property('addProtocols');
          expect(response).to.not.have.property('getProtocol');
          expect(response).to.have.property('getProtocols');
          expect(response).to.not.have.property('setProtocol');
          expect(response).to.have.property('setProtocols');
          expect(response).to.have.property('hasProtocol');
          expect(response).to.have.property('hasProtocols');
          expect(response).to.not.have.property('ProtocolReagents');
          expect(response).to.not.have.property('ProtocolReagent');
          expect(response).to.not.have.property('Protocols');
          expect(response).to.not.have.property('Protocol');
        });
    });

    it('protocol association requires field quantity', () => {
      const testReagent = {
        name: 'Test Reagent',
        description: 'Test Reagent Description',
      };
      const testProtocol = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Reagents.create(testReagent)
        .then((reagent) => Protocols.create(testProtocol)
          .then(protocol => reagent.addProtocol(protocol)
            .catch((error) => {
              expect(error.name).to.be.eql('AggregateError');
              expect(error.message).to.be.eql('aggregate error');
            })));
    });

    it('protocol association requires field unit', () => {
      const testReagent = {
        name: 'Test Reagent',
        description: 'Test Reagent Description',
      };
      const testProtocol = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Reagents.create(testReagent)
        .then((reagent) => Protocols.create(testProtocol)
          .then(protocol => reagent.addProtocol(protocol, { through: { quantity: 1 } })
            .catch((error) => {
              expect(error.name).to.be.eql('AggregateError');
              expect(error.message).to.be.eql('aggregate error');
            })));
    });

    it('protocol association requires fields quantity and unit', () => {
      const testReagent = {
        name: 'Test Reagent',
        description: 'Test Reagent Description',
      };
      const testProtocol = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Reagents.create(testReagent)
        .then((reagent) => Protocols.create(testProtocol)
          .then(protocol => reagent.addProtocol(protocol, { through: { unit: 'g' } })
            .catch((error) => {
              expect(error.name).to.be.eql('AggregateError');
              expect(error.message).to.be.eql('aggregate error');
            })));
    });

    it('check if Protocol was associated', () => {
      const testReagent = {
        name: 'Test Reagent',
        description: 'Test Reagent Description',
      };
      const testProtocol = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Reagents.create(testReagent)
        .then((reagent) => Protocols.create(testProtocol)
          .then(protocol => reagent.addProtocol(protocol, { through: { quantity: 5, unit: 'uL' } })
            .then(() => reagent.hasProtocol(protocol)
              .then(res => expect(res).to.be.true))));
    });

    it('check if associated Protocol has all attributes', () => {
      const testReagent = {
        name: 'Test Reagent',
        description: 'Test Reagent Description',
      };
      const testProtocol = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Reagents.create(testReagent)
        .then((reagent) => Protocols.create(testProtocol)
          .then(protocol => reagent.addProtocols([protocol], { through: { quantity: 5, unit: 'uL' } })
            .then(() => reagent.getProtocols()
              .then((res) => {
                expect(res).to.be.an('array');
                expect(res.length).to.be.eql(1);
                expect(res[0].id).to.be.eql(protocol.id);
                expect(res[0].title).to.be.eql(protocol.title);
                expect(res[0].description).to.be.eql(protocol.description);
                expect(res[0].ProtocolReagents.quantity).to.be.eql(5);
                expect(res[0].ProtocolReagents.unit).to.be.eql('uL');
              }))));
    });

    it('check if associated Protocol has the association attributes', () => {
      const testReagent = {
        name: 'Test Reagent',
        description: 'Test Reagent Description',
      };
      const testProtocol = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Reagents.create(testReagent)
        .then(reagent => Protocols.create(testProtocol)
          .then(protocol => reagent.setProtocols([protocol], { through: { quantity: 2, unit: 'uL' } })
            .then(() => reagent.getProtocols()
              .then((res) => {
                expect(res).to.be.an('array');
                expect(res.length).to.be.eql(1);
                expect(res[0].id).to.be.eql(protocol.id);
                expect(res[0].title).to.be.eql(protocol.title);
                expect(res[0].description).to.be.eql(protocol.description);
                expect(res[0]).to.have.property('ProtocolReagents');
                expect(res[0].ProtocolReagents).to.have.property('quantity');
                expect(res[0].ProtocolReagents).to.have.property('unit');
                expect(res[0].ProtocolReagents.quantity).to.be.eql(2);
                expect(res[0].ProtocolReagents.unit).to.be.eql('uL');
              }))));
    });

    it('check adding material to protocol with association attributes', () => {
      const testReagent = {
        name: 'Test Reagent',
        description: 'Test Reagent Description',
      };
      const testProtocol = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Reagents.create(testReagent)
        .then(reagent => Protocols.create(testProtocol)
          .then(protocol => {
            reagent.ProtocolReagents = { quantity: 3.5, unit: 'g' };
            return protocol.addReagent(reagent)
              .then(() => protocol.getReagents()
                .then((res) => {
                  expect(res).to.be.an('array');
                  expect(res.length).to.be.eql(1);
                  expect(res[0].id).to.be.eql(reagent.id);
                  expect(res[0].name).to.be.eql(reagent.name);
                  expect(res[0].description).to.be.eql(reagent.description);
                  expect(res[0].ProtocolReagents.quantity).to.be.eql(3.5);
                  expect(res[0].ProtocolReagents.unit).to.be.eql('g');
                }));
          }));
    });
  });
});
