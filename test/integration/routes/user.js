describe('Routes: User', () => {
  const User = app.datasource.models.User;
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

  beforeEach((done) => {
    User
      .destroy({ where: {} })
      .then(() => User.bulkCreate(userList))
      .then(() => done());
  });
  afterEach((done) => {
    User
      .destroy({ where: {} })
      .then(() => done());
  });

  describe('Route GET /user', () => {
    it('should return a list of all users', (done) => {
      request
        .get('/user')
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

  describe('Route GET /user/{id}', () => {
    it('should return a user', (done) => {
      request
        .get('/user/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(userList[0].id);
          expect(res.body.name).to.be.eql(userList[0].name);
          expect(res.body.email).to.be.eql(userList[0].email);
          expect(res.body.password).to.be.eql(userList[0].password);
          done(err);
        });
    });
  });

  describe('Route POST /user', () => {
    it('should create a user', (done) => {
      const newUser = {
        id: 4,
        name: 'New User',
        email: 'newuser@email.com',
        password: 'newUserPass01',
      };
      request
        .post('/user')
        .send(newUser)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newUser.id);
          expect(res.body.name).to.be.eql(newUser.name);
          expect(res.body.email).to.be.eql(newUser.email);
          done(err);
        });
    });
  });

  describe('Route PUT /user/{id}', () => {
    it('should update a user', (done) => {
      const updatedUser = {
        id: 1,
        name: 'Updated User',
        email: 'updateduser@email.com',
        password: 'updatedtest',
      };
      request
        .put('/user/1')
        .send(updatedUser)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Route DELETE /user/{id}', () => {
    it('should delete a user', (done) => {
      request
        .delete('/user/1')
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
