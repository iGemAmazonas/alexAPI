export default (sequelize, DataType) => {
  const Protocols = sequelize.define('Protocols', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
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

  Protocols.associate = (models) => {
    models.Protocols.Creator = models.Protocols.belongsTo(models.Users, { as: 'Creator' });
    models.Users.Protocols = models.Users.hasMany(models.Protocols, { foreignKey: 'CreatorId' });
  };

  return Protocols;
};
