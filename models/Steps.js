export default (sequelize, DataType) => {
  const Steps = sequelize.define('Steps', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoincrement: true,
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
    models.Steps.belongsTo(models.Users, { as: 'creator' });
    models.Users.hasMany(models.Steps, { foreignKey: 'creatorId' });
    // 1:N
    models.Steps.belongsTo(models.Protocols, { as: 'protocol' });
    models.Protocols.hasMany(models.Steps, { foreignKey: 'protocolId' });
  };

  return Steps;
};
