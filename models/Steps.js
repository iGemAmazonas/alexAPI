export default (sequelize, DataType) => {
  const Steps = sequelize.define('Steps', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    // 1:N -> A project has one creator and a user may have many projects
    models.Steps.Creator = models.Steps.belongsTo(models.Users, { as: 'Creator' });
    models.Users.Steps = models.Users.hasMany(Steps, { foreignKey: 'CreatorId' });
    // 1:N
    models.Steps.Protocol = models.Steps.belongsTo(models.Protocols);
    models.Protocols.Steps = models.Protocols.hasMany(models.Steps, { foreignKey: 'ProtocolId' });
  };

  return Steps;
};
