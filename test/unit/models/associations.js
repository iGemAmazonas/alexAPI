describe('Models: Associations', () => {
  /* const Material = app.datasource.models.Material;
  const Protocol = app.datasource.models.Protocol;

  beforeEach((done) => {
    Material.destroy({ where: {} })
      .then(() => Protocol.destroy({ where: {} }))
      .then(() => done());
  });
  afterEach((done) => {
    Material.destroy({ where: {} })
      .then(() => Protocol.destroy({ where: {} }))
      .then(() => done());
  });

  describe('Associate Material to Protocol: ()', () => {
    it('should associate a Material with a Protocol', () => {
      const testMaterial = {
        name: 'Test Material',
        description: 'Test Material Description',
      };
      const testProtocol = {
        title: 'Test Protocol',
        description: 'Test Protocol Description',
      };
      return Material.create(testMaterial)
        .then(() => Protocol.create(testProtocol))
        .then(() => Material.findById(1))
        .then(material => {
          console.log(material);
          Protocol.findById(1)
            .then(protocol => {
              console.log(protocol);
              protocol.addMaterial(material)
                .then(() => protocol.getMaterial())
                .then(returnedMaterial => {
                  console.log(returnedMaterial);
                  expect(returnedMaterial.id).to.be.eql(2);
                  expect(returnedMaterial.name).to.be.eql(testMaterial.name);
                  expect(returnedMaterial.description).to.be.eql(testMaterial.description);
                });
            });
        });
    });
  }); */

});
