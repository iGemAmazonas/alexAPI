describe('Models: Protocols', () => {
  const Protocols = app.datasource.models.Protocols;
  const Materials = app.datasource.models.Materials;
  const Reagents = app.datasource.models.Reagents;
  const Keywords = app.datasource.models.Keywords;
  const Articles = app.datasource.models.Articles;
  const Steps = app.datasource.models.Steps;
  const Users = app.datasource.models.Users;

  before(() => {
    return app.datasource.sequelize.sync();
  });
  beforeEach(() => {
    return Protocols.destroy({ where: {} })
      .then(() => Materials.destroy({ where: {} })
        .then(() => Reagents.destroy({ where: {} })
          .then(() => Keywords.destroy({ where: {} })
            .then(() => Articles.destroy({ where: {} })
              .then(() => Users.destroy({ where: {} })
                .then(() => Steps.destroy({ where: {} })))))));
  });

  describe('Create a Protocol:', () => {
    it('should not create a Protocol if dont have required field title', () => {
      const testProtocol = {
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
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Protocols.create(testProtocol)
        .then((response) => {
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
          expect(response).to.have.property('addReagent');
          expect(response).to.have.property('addReagents');
          expect(response).to.not.have.property('getReagent');
          expect(response).to.have.property('getReagents');
          expect(response).to.not.have.property('setReagent');
          expect(response).to.have.property('setReagents');
          expect(response).to.have.property('hasReagent');
          expect(response).to.have.property('hasReagents');
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
          expect(response).to.not.have.property('addArticle');
          expect(response).to.not.have.property('addArticles');
          expect(response).to.have.property('getArticle');
          expect(response).to.not.have.property('getArticles');
          expect(response).to.have.property('setArticle');
          expect(response).to.not.have.property('setArticles');
          expect(response).to.not.have.property('hasArticle');
          expect(response).to.not.have.property('hasArticles');
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
        Creator: {
          name: 'Test User',
          email: 'user1@email.com',
          password: 'test1',
        },
        Article: {
          authors: 'LENNINGHER',
        },
        Keywords: [{
          word: 'Keyword 1',
        },{
          word: 'Keyword 2',
        }],
        Materials: [{
          name: 'Material 1',
          description: 'Material Description 1',
          ProtocolMaterials: {quantity: 2},
        }],
      };
      console.log(JSON.stringify(testProtocol));
      var includes = { include: [{association: Protocols.Reagents}] };
      return Protocols.create(testProtocol, includes)
        .then((response) => {
          console.log(JSON.stringify(response));
          expect(response.id).to.be.eql(testProtocol.id);
          expect(response.title).to.be.eql(testProtocol.title);
          expect(response.description).to.be.eql(testProtocol.description);
          //expect(response.Creator.name).to.be.eql(testProtocol.Creator.name);
          //expect(response.Keywords).to.be.an('array');
          //expect(response.Article.authors).to.be.eql(testProtocol.Article.authors);
          expect(response.createdAt).to.be.a('Date');
          expect(response.updatedAt).to.be.a('Date');
        })
        .then(() => Reagents.findAll()
          .then((resp) => {
            console.log(JSON.stringify(resp));
          }));
    });
  });
});
