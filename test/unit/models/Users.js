describe('Models: Users.', () => {
  const Users = app.datasource.models.Users;
  const Protocols = app.datasource.models.Protocols;

  before(() => app.datasource.sequelize.sync());
  beforeEach(() => Users.destroy({ where: {} })
    .then(() => Protocols.destroy({ where: {} })));

  describe('Create a User:', () => {
    it('should not create a User if dont have required field name', () => {
      const testUser = {
        id: 1,
        email: 'Test User Email',
        password: 'Test User Password',
      };
      return Users.create(testUser)
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeValidationError');
          expect(error.message).to.be.eql('notNull Violation: name cannot be null');
        });
    });

    it('should not create a User if dont have required field email', () => {
      const testUser = {
        id: 1,
        name: 'Test User Name',
        password: 'Test User Password',
      };
      return Users.create(testUser)
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeValidationError');
          expect(error.message).to.be.eql('notNull Violation: email cannot be null');
        });
    });

    it('should not create a User if dont have required field password', () => {
      const testUser = {
        id: 1,
        name: 'Test User Name',
        email: 'Test User Email',
      };
      return Users.create(testUser)
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeValidationError');
          expect(error.message).to.be.eql('notNull Violation: password cannot be null');
        });
    });

    it('should return a User with defined model properties', () => {
      const testUser = {
        name: 'Test User Name',
        email: 'Test User Email',
        password: 'Test User Password',
      };
      return Users.create(testUser)
        .then((response) => {
          expect(response).to.have.property('id');
          expect(response).to.have.property('name');
          expect(response).to.have.property('email');
          expect(response).to.have.property('password');
          expect(response).to.have.property('createdAt');
          expect(response).to.have.property('updatedAt');
        });
    });

    it('should return a User', () => {
      const testUser = {
        id: 1,
        name: 'Test User Name',
        email: 'Test User Email',
        password: 'TestUserPassword',
      };
      return Users.create(testUser)
        .then((response) => {
          expect(response.id).to.be.eql(1);
          expect(response.name).to.be.eql('Test User Name');
          expect(response.email).to.be.eql('Test User Email');
          expect(Users.isPassword(response.password, 'TestUserPassword')).to.be.eql(true);
          expect(response.createdAt).to.be.a('Date');
          expect(response.updatedAt).to.be.a('Date');
        });
    });

    it('should not create a User with id equal to existing', () => {
      const testUser1 = {
        id: 1,
        name: 'Test User Name',
        email: 'Test User Email',
        password: 'Test User Password',
      };
      const testUser2 = {
        id: 1,
        name: 'Test User Name 2',
        email: 'Test User Email 2',
        password: 'Test User Password 2',
      };
      return Users.create(testUser1)
        .then(() => Users.create(testUser2))
        .then(() => expect.to.fail('', '', 'Should throw exception'))
        .catch((error) => {
          expect(error.name).to.be.eql('SequelizeUniqueConstraintError');
          expect(error.message).to.be.eql('Validation error');
        });
    });
  });

  describe('Association with Protocol:', () => {
    it('check if a user has add/get/set/has Protocols properties defined', () => {
      const testUser = {
        id: 1,
        name: 'Test User Name',
        email: 'Test User Email',
        password: 'Test User Password',
      };
      return Users.create(testUser)
        .then((response) => {
          expect(response).to.not.have.property('ProtocolId');
          expect(response).to.have.property('addProtocol');
          expect(response).to.have.property('addProtocols');
          expect(response).to.not.have.property('getProtocol');
          expect(response).to.have.property('getProtocols');
          expect(response).to.not.have.property('setProtocol');
          expect(response).to.have.property('setProtocols');
          expect(response).to.have.property('hasProtocol');
          expect(response).to.have.property('hasProtocols');
          expect(response).to.not.have.property('ProtocolUsers');
          expect(response).to.not.have.property('ProtocolUser');
          expect(response).to.not.have.property('Protocols');
          expect(response).to.not.have.property('Protocol');
        });
    });

    it('check if Protocol was associated', () => {
      const testUser = {
        id: 1,
        name: 'Test User Name',
        email: 'Test User Email',
        password: 'Test User Password',
      };
      const testProtocol = {
        id: 1,
        name: 'Test User Name Updated',
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Users.create(testUser)
        .then(user => Protocols.create(testProtocol)
          .then(protocol => user.addProtocol(protocol)
            .then(() => user.hasProtocol(protocol)
              .then(res => expect(res).to.be.true))));
    });

    it('check if associated Protocol has all attributes', () => {
      const testUser = {
        id: 1,
        name: 'Test User Name',
        email: 'Test User Email',
        password: 'Test User Password',
      };
      const testProtocol = {
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Users.create(testUser)
        .then(user => Protocols.create(testProtocol)
          .then(protocol => user.setProtocols([protocol])
            .then(() => user.getProtocols()
              .then((res) => {
                expect(res).to.be.an('array');
                expect(res.length).to.be.eql(1);
                expect(res[0].id).to.be.eql(protocol.id);
                expect(res[0].title).to.be.eql(protocol.title);
                expect(res[0].description).to.be.eql(protocol.description);
              }))));
    });

    it('check adding user to protocol', () => {
      const testUser = {
        id: 1,
        name: 'Test User Name',
        email: 'Test User Email',
        password: 'Test User Password',
      };
      const testProtocol = {
        id: 1,
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Users.create(testUser)
        .then(user => Protocols.create(testProtocol)
          .then(protocol => protocol.setCreator(user)
            .then(() => protocol.getCreator()
              .then((res) => {
                expect(res.id).to.be.eql(user.id);
                expect(res.name).to.be.eql(user.name);
                expect(res.email).to.be.eql(user.email);
              }))));
    });
  });
});
