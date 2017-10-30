describe('Routes: Users.', () => {
  const Users = app.datasource.models.Users;
  const userList = [
    {
      id: 1,
      name: 'Test User',
      email: 'user1@email.com',
      password: 'test1',
    },
    {
      id: 2,
      name: 'Test User 2',
      email: 'user2@email.com',
      password: 'test2',
    },
    {
      id: 3,
      name: 'Test User 3',
      email: 'user3@email.com',
      password: 'test3',
    },
  ];

  before(() => app.datasource.sequelize.sync());
  beforeEach((done) => {
    Users.destroy({ where: {} })
      .then(() => Users.bulkCreate(userList))
      .then(() => done());
  });

  describe('Route GET /users', () => {
    it('should return a list of all users', (done) => {
      request
        .get('/users')
        .end((err, res) => {
          expect(res.body.length).to.be.eql(3);
          expect(res.body[0].id).to.be.eql(userList[0].id);
          expect(res.body[0].name).to.be.eql(userList[0].name);
          expect(res.body[0].email).to.be.eql(userList[0].email);
          expect(res.body[0].password).to.be.eql(userList[0].password);
          expect(res.body[1].id).to.be.eql(userList[1].id);
          expect(res.body[1].name).to.be.eql(userList[1].name);
          expect(res.body[1].email).to.be.eql(userList[1].email);
          expect(res.body[1].password).to.be.eql(userList[1].password);
          expect(res.body[2].id).to.be.eql(userList[2].id);
          expect(res.body[2].name).to.be.eql(userList[2].name);
          expect(res.body[2].email).to.be.eql(userList[2].email);
          expect(res.body[2].password).to.be.eql(userList[2].password);
          done(err);
        });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('should return a user', (done) => {
      request
        .get('/users/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(userList[0].id);
          expect(res.body.name).to.be.eql(userList[0].name);
          expect(res.body.email).to.be.eql(userList[0].email);
          expect(res.body.password).to.be.eql(userList[0].password);
          done(err);
        });
    });
  });

  describe('Route POST /users', () => {
    it('should create a user', (done) => {
      const newUser = {
        id: 4,
        name: 'New User',
        email: 'newuser@email.com',
        password: 'newUserPass01',
      };
      request
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newUser.id);
          expect(res.body.name).to.be.eql(newUser.name);
          expect(res.body.email).to.be.eql(newUser.email);
          done(err);
        });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('should update a user', (done) => {
      const updatedUser = {
        id: 1,
        name: 'Updated User',
        email: 'updateduser@email.com',
        password: 'updatedtest',
      };
      request
        .put('/users/1')
        .send(updatedUser)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Route DELETE /users/{id}', () => {
    it('should delete a user', (done) => {
      request
        .delete('/users/1')
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
