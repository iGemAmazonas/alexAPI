import HttpStatus from 'http-status';
import jwt from 'jwt-simple';


describe('Routes: Protocols.', () => {
  const Protocols = app.datasource.models.Protocols;
  const Keywords = app.datasource.models.Keywords;
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;
  let token;

  const protocolList = [{
    id: 1,
    title: 'Test Protocol',
    description: 'Default Protocol Description',
    CreatorId: 1,
    Steps: ['Step 1'],
  }, {
    id: 2,
    title: 'Test Genomic 2',
    description: 'Test Protocol 2 Description',
    CreatorId: 1,
    Steps: ['Step 2'],
  }, {
    id: 3,
    title: 'Test Protocol 3',
    description: 'Test Genome 3 Description',
    CreatorId: 2,
    Steps: ['Step 3'],
  }];
  const keywordsList = [{
    id: 1,
    word: 'Keyword 1',
  }, {
    id: 2,
    word: 'Keyword 2',
  }];
  const testEquipment = [{
    id: 1,
    name: 'Equipment 1',
  }];
  const testMaterial = [{
    id: 1,
    name: 'Material 1',
  }];
  const testReference = [{
    id: 1,
    authors: 'Reference 1',
  }];
  const testComment = [{
    id: 1,
    text: 'Reference 1',
    CreatorId: 1,
  }];
  const userList = [{
    id: 1,
    name: 'John Doe',
    email: 'johndoe@email.com',
    password: '12345',
  }, {
    id: 2,
    name: 'Jane Doe',
    email: 'janedoe@email.com',
    password: '54321',
  }];

  before(() => app.datasource.sequelize.sync());
  beforeEach(() => Protocols.destroy({ where: {} })
    .then(() => Keywords.destroy({ where: {} })
      .then(() => Users.destroy({ where: {} })
        .then(() => Users.bulkCreate(userList)
          .then(() => Keywords.bulkCreate(keywordsList)
            .then(() => Protocols.bulkCreate(protocolList)
              .then(() => {
                token = jwt.encode({ id: 2 }, jwtSecret);
              })))))));


  describe('Route GET /protocols', () => {
    it('should return a list of all protocols', (done) => {
      request
        .get('/protocols')
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(HttpStatus.OK);
          expect(res.body.length).to.be.eql(3);
          expect(res.body[0].id).to.be.eql(protocolList[0].id);
          expect(res.body[0].title).to.be.eql(protocolList[0].title);
          expect(res.body[0].description).to.be.eql(protocolList[0].description);
          expect(res.body[0].creatorId).to.be.eql(protocolList[0].creatorId);
          expect(res.body[1].id).to.be.eql(protocolList[1].id);
          expect(res.body[1].title).to.be.eql(protocolList[1].title);
          expect(res.body[1].description).to.be.eql(protocolList[1].description);
          expect(res.body[1].creatorId).to.be.eql(protocolList[1].creatorId);
          expect(res.body[2].id).to.be.eql(protocolList[2].id);
          expect(res.body[2].title).to.be.eql(protocolList[2].title);
          expect(res.body[2].description).to.be.eql(protocolList[2].description);
          expect(res.body[2].creatorId).to.be.eql(protocolList[2].creatorId);
          done(err);
        });
    });

    it('should return a list of all protocols with filter', (done) => {
      request
        .get("/protocols?filter=genomic")
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(HttpStatus.OK);
          expect(res.body.length).to.be.eql(1);
          expect(res.body[0].id).to.be.eql(protocolList[1].id);
          expect(res.body[0].title).to.be.eql(protocolList[1].title);
          expect(res.body[0].description).to.be.eql(protocolList[1].description);
          expect(res.body[0].creatorId).to.be.eql(protocolList[1].creatorId);
          done(err);
        });
    });
  });

  describe('Route GET /protocols/{id}', () => {
    it('should return a protocol', (done) => {
      request
        .get('/protocols/1')
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(HttpStatus.OK);
          expect(res.body.id).to.be.eql(protocolList[0].id);
          expect(res.body.title).to.be.eql(protocolList[0].title);
          expect(res.body.description).to.be.eql(protocolList[0].description);
          expect(res.body.creatorId).to.be.eql(protocolList[0].creatorId);
          done(err);
        });
    });
  });

  describe('Route POST /protocols', () => {
    it('should give authorization error on create a protocol without credentials', (done) => {
      const newProtocol = {
        id: 4,
        title: 'New Protocol',
        description: 'New Protocol Description',
      };
      request
        .post('/protocols')
        .send(newProtocol)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(HttpStatus.UNAUTHORIZED);
          done(err);
        });
    });

    it('should create a protocol', (done) => {
      const newProtocol = {
        id: 4,
        title: 'New Protocol',
        description: 'New Protocol Description',
      };
      request
        .post('/protocols')
        .set('Authorization', `JWT ${token}`)
        .send(newProtocol)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(HttpStatus.CREATED);
          expect(res.body.id).to.be.eql(newProtocol.id);
          expect(res.body.title).to.be.eql(newProtocol.title);
          expect(res.body.description).to.be.eql(newProtocol.description);
          expect(res.body.creatorId).to.be.eql(newProtocol.creatorId);
          done(err);
        });
    });

    it('should create a protocol with keywords', (done) => {
      const newProtocol = {
        id: 4,
        title: 'New Protocol',
        description: 'New Protocol Description',
        Keywords: [1, 2],
      };

      request
      .post('/protocols')
      .set('Authorization', `JWT ${token}`)
      .send(newProtocol)
      .end((err, res) => {
        expect(res.statusCode).to.be.eql(HttpStatus.CREATED);
        expect(res.body.id).to.be.eql(newProtocol.id);
        expect(res.body.title).to.be.eql(newProtocol.title);
        expect(res.body.description).to.be.eql(newProtocol.description);
        expect(res.body.creatorId).to.be.eql(newProtocol.creatorId);
        expect(res.body.Keywords[0].KeywordId).to.be.eql(1);
        expect(res.body.Keywords[1].KeywordId).to.be.eql(2);
        done(err);
      });
    });

    /* it('should add keywords to protocol', (done) => {
      const newKeywords = [{
        id: 2,
        word: 'Keyword 1',
        color: '#000001',
      },{
        id: 3,
        word: 'Keyword 2',
        color: '#000002',
      }];
      const addKeywords = [ 2, 3 ];
      Keywords.bulkCreate(newKeywords)
        .then(() => {

          request
          .post('/protocols/1/keywords')
          .set('Authorization', `JWT ${token}`)
          .send(addKeywords)
          .end((err, res) => {
            console.log(res.body);
            console.log(res.body.Keywords);
            expect(res.body.id).to.be.eql(protocolList[0].id);
            expect(res.body.title).to.be.eql(protocolList[0].title);
            expect(res.body.description).to.be.eql(protocolList[0].description);
            expect(res.body.creatorId).to.be.eql(protocolList[0].creatorId);
            expect(res.body.Keywords[0].KeywordId).to.be.eql(1);
            expect(res.body.Keywords[1].KeywordId).to.be.eql(2);
            done(err);
          });
        });
    }); */
  });

  describe('Route PUT /protocols/{id}', () => {
    it('should update a protocol', (done) => {
      const updatedProtocol = {
        id: 3,
        title: 'Updated Protocol',
        description: 'Updated Protocol Description',
      };
      request
        .put('/protocols/3')
        .set('Authorization', `JWT ${token}`)
        .send(updatedProtocol)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(HttpStatus.OK);
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Route DELETE /protocols/{id}', () => {
    it('should delete a protocol', (done) => {
      request
        .delete('/protocols/3')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(HttpStatus.NO_CONTENT);
          done(err);
        });
    });
  });
});
