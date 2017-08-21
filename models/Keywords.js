export default (sequelize, DataType) => {
  const Keywords = sequelize.define('Keywords', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoincrement: true,
    },
    word: {
      type: DataType.STRING,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
  });

  Keywords.associate = (models) => {
    // N:M -> Creates join table with protocols_id and keywords_id
    // Define add/get/set/has Protocols methods in an keyword instance
    // Define add/get/set/has Keywords methods in a protocol instance
    models.Keywords.belongsToMany(models.Protocols, { through: 'ProtocolKeywords' });
    models.Protocols.belongsToMany(models.Keywords, { through: 'ProtocolKeywords' });
  };

  return Keywords;
};
