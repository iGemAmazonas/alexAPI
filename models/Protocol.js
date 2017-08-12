export default (sequelize, DataType) => {
  const Protocol = sequelize.define('Protocol', {
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
      type: DataType.STRING,
    },
    keywords: {
      type: DataType.STRING,
    },
  });

  Protocol.associate = (models) => {
    models.Protocol.belongsTo(models.User, { as: 'creator' });
    models.User.hasMany(models.Protocol, { as: 'protocols', foreignKey: 'creator_id' });
  };

  return Protocol;
};
