/*

class TestHelper {

  const Protocols = app.datasource.models.Protocols;
  const Comments = app.datasource.models.Comments;
  const Keywords = app.datasource.models.Keywords;
  const Materials = app.datasource.models.Materials;
  const Equipments = app.datasource.models.Equipments;
  const References = app.datasource.models.References;
  const Steps = app.datasource.models.Steps;
  const Users = app.datasource.models.Users;

  const protocolList = [{
    id: 1,
    title: 'Test Protocol',
    description: 'Default Protocol Description',
    CreatorId: 1,
    Steps: [{
      id: 1,
      number: 1,
      description: 'Step 1',
    }],
    Keywords: [ 1 ],
    Materials: [ 1 ],
    Equipments: [ 1 ],
    References: [ 1 ],
    Comments: [ 1 ],
  }, {
    id: 2,
    title: 'Test Genomic 2',
    description: 'Test Protocol 2 Description',
    CreatorId: 1,
    Steps: [{
      id: 1,
      number: 1,
      description: 'Step 1',
    }],
    Keywords: [ 1 ],
    Materials: [ 1 ],
    Equipments: [ 1 ],
    References: [ 1 ],
    Comments: [ 1 ],
  }, {
    id: 3,
    title: 'Test Protocol 3',
    description: 'Test Genome 3 Description',
    CreatorId: 2,
    Steps: [{
      id: 1,
      number: 1,
      description: 'Step 1',
    }],
    Keywords: [ 1 ],
    Materials: [ 1 ],
    Equipments: [ 1 ],
    References: [ 1 ],
    Comments: [ 1 ],
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


  static cleanupDatabase() {
    return Protocols.destroy({ where: {} })
      .then(() => Keywords.destroy({ where: {} })
        .then(() => Equipments.destroy({ where: {} })
          .then(() => Materials.destroy({ where: {} })
            .then(() => References.destroy({ where: {} })
              .then(() => Comments.destroy({ where: {} })
                .then(() => Users.destroy({ where: {} })))))));
  }

  static createSimpleDatabase() {
    .then(() => Equipments.create(testEquipment)
      .then(() => Materials.create(testMaterial)
        .then(() => References.create(testReference)
          .then(() => Comments.create(testComment)
            .then(() => Users.bulkCreate(userList)
              .then(() => Keywords.bulkCreate(keywordsList)
                .then(() => request.post('/protocols', protocolList[0])
                  .then(() => request.post('/protocols', protocolList[1])
                    .then(() => request.post('/protocols', protocolList[2])
                      .then(() => token = jwt.encode({ id: 2 }, jwtSecret)
                    ))))))))));
  }
}*/
