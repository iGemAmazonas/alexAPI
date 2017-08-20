export default (sequelize, DataType) => {
  const Protocols = sequelize.define('Protocols', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoincrement: true,
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
    description: {
      type: DataType.STRING,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
    authors: {
      type: DataType.STRING,
    },
    steps: {
      type: DataType.TEXT,
    },
    keywords: {
      type: DataType.STRING,
    },
  });

  Protocols.associate = (models) => {
    models.Protocols.belongsTo(models.Users, { as: 'creator' });
    models.Users.hasMany(models.Protocols, { foreignKey: 'creator_id' });
  };

  return Protocols;
};
