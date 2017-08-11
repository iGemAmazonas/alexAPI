export default {
  database: 'alexDB',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    // database filename will append 'prod' or 'test' depending on the enviroment
    storage: `${process.env.NODE_ENV}_alex-api.sqlite`,
    // prevent output queries to console
    logging: false,
    define: {
      // created table will use underscore instead of camelCase
      underscored: true,
      // prevent sequelize from pluralizing table names
      freezeTableName: true,
    },
  },
  // secret variable used to create the lib passport with JSON Web Token (jwt)
  jwtSecret: 'Al3x4ndr1a',
  // session definition to be used on authentication
  jwtSession: { session: false },
};
