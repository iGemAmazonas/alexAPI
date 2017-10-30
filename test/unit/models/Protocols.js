describe('Models: Protocols.', () => {
  const Protocols = app.datasource.models.Protocols;
  const Materials = app.datasource.models.Materials;
  const Equipments = app.datasource.models.Equipments;
  const Keywords = app.datasource.models.Keywords;
  const References = app.datasource.models.References;
  const Steps = app.datasource.models.Steps;
  const Users = app.datasource.models.Users;

  before(() => app.datasource.sequelize.sync());
  beforeEach(() => Protocols.destroy({ where: {} })
    .then(() => Materials.destroy({ where: {} })
      .then(() => Equipments.destroy({ where: {} })
        .then(() => Keywords.destroy({ where: {} })
          .then(() => References.destroy({ where: {} })
            .then(() => Users.destroy({ where: {} })
              .then(() => Steps.destroy({ where: {} }))))))));

  describe('Create a Protocol:', () => {
    it('should not create a Protocol if dont have required field title', () => {
      const testProtocol = {
        id: 1,
        description: 'Test Protocol Description',
      };
      return Protocols.create(testProtocol)
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeValidationError');
          expect(error.message).to.be.eql('notNull Violation: title cannot be null');
        });
    });

    it('should not create a Protocol if dont have required field description', () => {
      const testProtocol = {
        id: 1,
        title: 'Test Protocol',
      };
      return Protocols.create(testProtocol)
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeValidationError');
          expect(error.message).to.be.eql('notNull Violation: description cannot be null');
        });
    });

    it('should return a Protocol with defined model properties', () => {
      const testProtocol = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Protocols.create(testProtocol)
        .then((response) => {
          expect(response).to.have.property('id');
          expect(response).to.have.property('title');
          expect(response).to.have.property('description');
          expect(response).to.have.property('createdAt');
          expect(response).to.have.property('updatedAt');
          expect(response).to.have.property('CreatorId');
        });
    });

    it('should return a Protocol', () => {
      const testProtocol = {
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Protocols.create(testProtocol)
        .then((response) => {
          expect(response.id).to.be.eql(1);
          expect(response.title).to.be.eql('Test Protocol');
          expect(response.description).to.be.eql('Test Protocol Description');
          expect(response.createdAt).to.be.a('Date');
          expect(response.updatedAt).to.be.a('Date');
        });
    });

    it('should not create a Protocol with id equal to existing', () => {
      const testProtocol1 = {
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol 1 Description',
      };
      const testProtocol2 = {
        id: 1,
        title: 'Test Protocol 2',
        description: 'Test Protocol 2 Description',
      };
      return Protocols.create(testProtocol1)
        .then(() => Protocols.create(testProtocol2))
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeUniqueConstraintError');
          expect(error.message).to.be.eql('Validation error');
        });
    });
  });

  describe('Protocol Associations:', () => {
    it('check if a protocol has add/get/set/has properties defined for all associations', () => {
      const testProtocol = {
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Protocols.create(testProtocol)
        .then((response) => {
          // USER -> CREATOR
          expect(response).to.not.have.property('addCreator');
          expect(response).to.not.have.property('addCreators');
          expect(response).to.have.property('getCreator');
          expect(response).to.not.have.property('getCreators');
          expect(response).to.have.property('setCreator');
          expect(response).to.not.have.property('setCreators');
          expect(response).to.not.have.property('hasCreator');
          expect(response).to.not.have.property('hasCreators');
          // MATERIALS
          expect(response).to.have.property('addMaterial');
          expect(response).to.have.property('addMaterials');
          expect(response).to.not.have.property('getMaterial');
          expect(response).to.have.property('getMaterials');
          expect(response).to.not.have.property('setMaterial');
          expect(response).to.have.property('setMaterials');
          expect(response).to.have.property('hasMaterial');
          expect(response).to.have.property('hasMaterials');
          // REAGENTS
          expect(response).to.have.property('addEquipment');
          expect(response).to.have.property('addEquipments');
          expect(response).to.not.have.property('getEquipment');
          expect(response).to.have.property('getEquipments');
          expect(response).to.not.have.property('setEquipment');
          expect(response).to.have.property('setEquipments');
          expect(response).to.have.property('hasEquipment');
          expect(response).to.have.property('hasEquipments');
          // STEPS
          expect(response).to.have.property('addStep');
          expect(response).to.have.property('addSteps');
          expect(response).to.not.have.property('getStep');
          expect(response).to.have.property('getSteps');
          expect(response).to.not.have.property('setStep');
          expect(response).to.have.property('setSteps');
          expect(response).to.have.property('hasStep');
          expect(response).to.have.property('hasSteps');
          // KEYWORDS
          expect(response).to.have.property('addKeyword');
          expect(response).to.have.property('addKeywords');
          expect(response).to.not.have.property('getKeyword');
          expect(response).to.have.property('getKeywords');
          expect(response).to.not.have.property('setKeyword');
          expect(response).to.have.property('setKeywords');
          expect(response).to.have.property('hasKeyword');
          expect(response).to.have.property('hasKeywords');
          // ARTICLE
          expect(response).to.have.property('addReference');
          expect(response).to.have.property('addReferences');
          expect(response).to.not.have.property('getReference');
          expect(response).to.have.property('getReferences');
          expect(response).to.not.have.property('setReference');
          expect(response).to.have.property('setReferences');
          expect(response).to.have.property('hasReference');
          expect(response).to.have.property('hasReferences');
          // COMMENTS
          expect(response).to.have.property('addComment');
          expect(response).to.have.property('addComments');
          expect(response).to.not.have.property('getComment');
          expect(response).to.have.property('getComments');
          expect(response).to.not.have.property('setComment');
          expect(response).to.have.property('setComments');
          expect(response).to.have.property('hasComment');
          expect(response).to.have.property('hasComments');
        });
    });

    it('should create a Protocol with all associated resources', () => {
      const testProtocol = {
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
        Steps: [{
          id: 1,
          number: 1,
          description: 'Firstly do...',
        }, {
          id: 2,
          number: 2,
          description: 'Then do...',
        }, {
          id: 3,
          number: 3,
          description: 'Finally do...',
        }],
      };
      return Protocols.create(testProtocol, { include: ['Steps'] })
        .then((response) => {
          expect(response.id).to.be.eql(testProtocol.id);
          expect(response.title).to.be.eql(testProtocol.title);
          expect(response.description).to.be.eql(testProtocol.description);
          expect(response.Steps[0].description).to.be.eql(testProtocol.Steps[0].description);
          expect(response.Steps[1].description).to.be.eql(testProtocol.Steps[1].description);
          expect(response.Steps[2].description).to.be.eql(testProtocol.Steps[2].description);
        });
    });
  });
});
