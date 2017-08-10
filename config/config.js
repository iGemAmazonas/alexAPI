export default {
  database: 'alexDB',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: `${process.env.NODE_ENV}_alex-api.sqlite`,
    define: {
      underscored: true,
      // prevent sequelize from pluralizing table names
      freezeTableName: true,
    },
  },
  jwtSecret: 'Al3x4ndr1a',
  jwtSession: { session: false },
};
