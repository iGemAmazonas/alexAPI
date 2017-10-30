import datasource from '../../../config/datasource';

describe('Datasource:', () => {
  const Users = app.datasource.models.Users;

  before(() => app.datasource.sequelize.sync());
  beforeEach(() => Users.destroy({ where: {} })
      .then(() => Users.create({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '12345',
      })));

  it('should return previously created database when make a new call to datasource(app)', () => {
    const newdatasource = datasource(app);
    const newUsers = newdatasource.models.Users;

    return newUsers.findAll()
      .then((response) => {
        expect(response.length).to.be.eql(1);
        expect(response[0].id).to.be.eql(1);
        expect(response[0].name).to.be.eql('John Doe');
        expect(response[0].email).to.be.eql('johndoe@email.com');
        expect(Users.isPassword(response[0].password, '12345')).to.be.eql(true);
        expect(response[0].createdAt).to.be.a('Date');
        expect(response[0].updatedAt).to.be.a('Date');
      });
  });
});
