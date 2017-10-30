describe('Models: Equipments.', () => {
  const Equipments = app.datasource.models.Equipments;
  const Protocols = app.datasource.models.Protocols;

  before(() => app.datasource.sequelize.sync());
  beforeEach(() => Equipments.destroy({ where: {} })
    .then(() => Protocols.destroy({ where: {} })));

  describe('Create a Equipment:', () => {
    it('should not create a Equipment if dont have required field name', () => {
      const testEquipment = {
        id: 1,
        description: 'Test Equipment Description',
      };
      return Equipments.create(testEquipment)
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeValidationError');
          expect(error.message).to.be.eql('notNull Violation: name cannot be null');
        });
    });

    it('should return a Equipment with defined model properties', () => {
      const testEquipment = {
        name: 'Test Equipment',
        description: 'Test Equipment Description',
      };
      return Equipments.create(testEquipment)
        .then((response) => {
          expect(response).to.have.property('id');
          expect(response).to.have.property('name');
          expect(response).to.have.property('description');
          expect(response).to.have.property('createdAt');
          expect(response).to.have.property('updatedAt');
        });
    });

    it('should return a Equipment', () => {
      const testEquipment = {
        id: 1,
        name: 'Test Equipment',
        description: 'Test Equipment Description',
      };
      return Equipments.create(testEquipment)
        .then((response) => {
          expect(response.id).to.be.eql(1);
          expect(response.name).to.be.eql('Test Equipment');
          expect(response.description).to.be.eql('Test Equipment Description');
          expect(response.createdAt).to.be.a('Date');
          expect(response.updatedAt).to.be.a('Date');
        });
    });

    it('should not create a Equipment with id equal to existing', () => {
      const testEquipment1 = {
        id: 1,
        name: 'Test Equipment',
        description: 'Test Equipment 1 Description',
      };
      const testEquipment2 = {
        id: 1,
        name: 'Test Equipment 2',
        description: 'Test Equipment 2 Description',
      };
      return Equipments.create(testEquipment1)
        .then(() => Equipments.create(testEquipment2))
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeUniqueConstraintError');
          expect(error.message).to.be.eql('Validation error');
        });
    });
  });

  describe('Association with Protocol:', () => {
    it('check if a equipment has add/get/set/has Protocols properties defined', () => {
      const testEquipment = {
        id: 1,
        name: 'Test Equipment',
        description: 'Test Equipment Description',
      };
      return Equipments.create(testEquipment)
        .then((response) => {
          expect(response).to.have.property('addProtocol');
          expect(response).to.have.property('addProtocols');
          expect(response).to.not.have.property('getProtocol');
          expect(response).to.have.property('getProtocols');
          expect(response).to.not.have.property('setProtocol');
          expect(response).to.have.property('setProtocols');
          expect(response).to.have.property('hasProtocol');
          expect(response).to.have.property('hasProtocols');
          expect(response).to.not.have.property('ProtocolEquipments');
          expect(response).to.not.have.property('ProtocolEquipment');
          expect(response).to.not.have.property('Protocols');
          expect(response).to.not.have.property('Protocol');
        });
    });

    it('check if Protocol was associated', () => {
      const testEquipment = {
        id: 1,
        name: 'Test Equipment',
        description: 'Test Equipment Description',
      };
      const testProtocol = {
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Equipments.create(testEquipment)
        .then(equipment => Protocols.create(testProtocol)
          .then(protocol => equipment.addProtocol(protocol)
            .then(() => equipment.hasProtocol(protocol)
              .then(res => expect(res).to.be.true))));
    });

    it('check if associated Protocol has all attributes', () => {
      const testEquipment = {
        id: 1,
        name: 'Test Equipment',
        description: 'Test Equipment Description',
      };
      const testProtocol = {
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Equipments.create(testEquipment)
        .then(equipment => Protocols.create(testProtocol)
          .then(protocol => equipment.setProtocols([protocol])
            .then(() => equipment.getProtocols()
              .then((res) => {
                expect(res).to.be.an('array');
                expect(res.length).to.be.eql(1);
                expect(res[0].id).to.be.eql(protocol.id);
                expect(res[0].title).to.be.eql(protocol.title);
                expect(res[0].description).to.be.eql(protocol.description);
              }))));
    });
  });
});
