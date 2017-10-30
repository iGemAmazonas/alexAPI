describe('Models: Steps.', () => {
  const Steps = app.datasource.models.Steps;
  const Protocols = app.datasource.models.Protocols;

  before(() => app.datasource.sequelize.sync());
  beforeEach(() => Steps.destroy({ where: {} })
    .then(() => Protocols.destroy({ where: {} })));

  describe('Create a Step:', () => {
    it('should not create a Step if dont have required field number', () => {
      const testStep = {
        id: 1,
        description: 'Test Step Description',
      };
      return Steps.create(testStep)
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeValidationError');
          expect(error.message).to.be.eql('notNull Violation: number cannot be null');
        });
    });

    it('should not create a Step if dont have required field description', () => {
      const testStep = {
        id: 1,
        number: 'Test Step Number',
      };
      return Steps.create(testStep)
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeValidationError');
          expect(error.message).to.be.eql('notNull Violation: description cannot be null');
        });
    });

    it('should return a Step with defined model properties', () => {
      const testStep = {
        number: 'Test Step Number',
        description: 'Test Step Description',
      };
      return Steps.create(testStep)
        .then((response) => {
          expect(response).to.have.property('id');
          expect(response).to.have.property('number');
          expect(response).to.have.property('description');
          expect(response).to.have.property('createdAt');
          expect(response).to.have.property('updatedAt');
        });
    });

    it('should return a Step', () => {
      const testStep = {
        id: 1,
        number: 'Test Step Number',
        description: 'Test Step Description',
      };
      return Steps.create(testStep)
        .then((response) => {
          expect(response.id).to.be.eql(1);
          expect(response.number).to.be.eql('Test Step Number');
          expect(response.description).to.be.eql('Test Step Description');
          expect(response.createdAt).to.be.a('Date');
          expect(response.updatedAt).to.be.a('Date');
        });
    });

    it('should not create a Step with id equal to existing', () => {
      const testStep1 = {
        id: 1,
        number: 'Test Step 1 Number',
        description: 'Test Step 1 Description',
      };
      const testStep2 = {
        id: 1,
        number: 'Test Step 2 Number',
        description: 'Test Step 2 Description',
      };
      return Steps.create(testStep1)
        .then(() => Steps.create(testStep2))
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeUniqueConstraintError');
          expect(error.message).to.be.eql('Validation error');
        });
    });
  });

  describe('Association with Protocol:', () => {
    it('check if a step has add/get/set/has Protocols properties defined', () => {
      const testStep = {
        id: 1,
        number: 'Test Step Number',
        description: 'Test Step Description',
      };
      return Steps.create(testStep)
        .then((response) => {
          expect(response).to.have.property('ProtocolId');
          expect(response).to.not.have.property('addProtocol');
          expect(response).to.not.have.property('addProtocols');
          expect(response).to.have.property('getProtocol');
          expect(response).to.not.have.property('getProtocols');
          expect(response).to.have.property('setProtocol');
          expect(response).to.not.have.property('setProtocols');
          expect(response).to.not.have.property('hasProtocol');
          expect(response).to.not.have.property('hasProtocols');
          expect(response).to.not.have.property('ProtocolSteps');
          expect(response).to.not.have.property('ProtocolStep');
          expect(response).to.not.have.property('Protocols');
          expect(response).to.not.have.property('Protocol');
        });
    });

    it('check if Protocol was associated', () => {
      const testStep = {
        id: 1,
        number: 'Test Step Number',
        description: 'Test Step Description',
      };
      const testProtocol = {
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Steps.create(testStep)
        .then(step => Protocols.create(testProtocol)
          .then(protocol => step.setProtocol(protocol)
            .then(() => step.getProtocol()
              .then(res => expect(res).to.not.be.null))));
    });

    it('check if associated Protocol has all attributes', () => {
      const testStep = {
        id: 1,
        number: 'Test Step Number',
        description: 'Test Step Description',
      };
      const testProtocol = {
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Steps.create(testStep)
        .then(step => Protocols.create(testProtocol)
          .then(protocol => step.setProtocol(protocol)
            .then(() => step.getProtocol()
              .then((res) => {
                expect(res.id).to.be.eql(protocol.id);
                expect(res.title).to.be.eql(protocol.title);
                expect(res.description).to.be.eql(protocol.description);
              }))));
    });

    it('check adding step to protocol', () => {
      const testStep = {
        id: 1,
        number: 'Test Step Number',
        description: 'Test Step Description',
      };
      const testProtocol = {
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Steps.create(testStep)
        .then(step => Protocols.create(testProtocol)
          .then(protocol => protocol.addStep(step)
            .then(() => protocol.getSteps()
              .then((res) => {
                expect(res).to.be.an('array');
                expect(res.length).to.be.eql(1);
                expect(res[0].id).to.be.eql(step.id);
                expect(res[0].number).to.be.eql(step.number);
                expect(res[0].description).to.be.eql(step.description);
              }))));
    });
  });
});
