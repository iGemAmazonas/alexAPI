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
    // 1:M -> Creates an attribute CreatorId in table Protocols
    // Define get/set Creator methods in a protocol instance
    // Define add/get/set/has Protocols methods in an user instance
    models.Protocols.belongsTo(models.Users, { as: 'Creator' });
    models.Users.hasMany(models.Protocols, { foreignKey: 'CreatorId' });
  };

  return Protocols;
};
