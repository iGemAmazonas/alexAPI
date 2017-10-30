export default (sequelize, DataType) => {
  const Steps = sequelize.define('Steps', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: DataType.STRING,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
    description: {
      type: DataType.TEXT,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
  });

  Steps.associate = (models) => {
    // 1:N -> Creates an attribute CreatorId in table Steps
    // Define get/set Creator methods in a step instance
    // Define add/get/set/has Steps methods in an user instance
    models.Steps.belongsTo(models.Users, { as: 'Creator' });
    models.Users.hasMany(models.Steps, { foreignKey: 'CreatorId' });
    // 1:N -> Creates an attribute ProtocolId in table Steps
    // Define get/set Protocol methods in a step instance
    // Define add/get/set/has Steps methods in a protocol instance
    models.Steps.belongsTo(models.Protocols);
    models.Protocols.hasMany(models.Steps);
  };

  return Steps;
};
