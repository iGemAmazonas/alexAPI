export default {
  database: 'alexDB',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'alex-api.sqlite',
    define: {
      underscored: true,
      // prevent sequelize from pluralizing table names
      freezeTableName: true,
    },
  },
};
