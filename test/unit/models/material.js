describe('Models: Material', () => {
  const Material = app.datasource.models.Material;

  beforeEach((done) => {
    Material.destroy({ where: {} })
      .then(() => done());
  });
  afterEach((done) => {
    Material.destroy({ where: {} })
      .then(() => done());
  });

  describe('Create a Material: create()', () => {
    it('should not create a Material if dont have required field name', () => {
      const testMaterial = {
        description: 'Test Material Description',
      };
      return Material.create(testMaterial)
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
      return Material.create(testMaterial)
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
      return Material.create(testMaterial)
        .then((response) => {
          expect(response).to.have.property('id');
          expect(response).to.have.property('name');
          expect(response).to.have.property('description');
          expect(response).to.have.property('created_at');
          expect(response).to.have.property('updated_at');
        });
    });

    it('should return a Material with id only after the find method', () => {
      const testMaterial = {
        name: 'Test Material',
        description: 'Test Material Description',
      };
      // THIS ONLY WORKS WITH RETURN! Because Mocha requires this to way for async calls
      return Material.create(testMaterial)
        .then((response) => {
          expect(response.id).to.be.eql(null);
          expect(response.name).to.be.eql('Test Material');
          expect(response.description).to.be.eql('Test Material Description');
          expect(response.created_at).to.be.a('Date');
          expect(response.updated_at).to.be.a('Date');
        })
        .then(() => Material.sync())
        .then(() => Material.findAll())
        .then((res) => {
          expect(res).to.be.an('array');
          expect(res.length).to.be.eql(1);
          expect(res[0].id).to.be.eql(1);
          expect(res[0].name).to.be.eql('Test Material');
          expect(res[0].description).to.be.eql('Test Material Description');
          expect(res[0].created_at).to.be.a('Date');
          expect(res[0].updated_at).to.be.a('Date');
        });
    });

    it('should not create a Material with id equal to existing', () => {
      const testMaterial1 = {
        name: 'Test Material',
        description: 'Test Material 1 Description',
      };
      const testMaterial2 = {
        id: 1,
        name: 'Test Material 2',
        description: 'Test Material 2 Description',
      };
      return Material.create(testMaterial1)
        .then(() => Material.create(testMaterial2))
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeUniqueConstraintError');
          expect(error.message).to.be.eql('Validation error');
        });
    });
  });
});
