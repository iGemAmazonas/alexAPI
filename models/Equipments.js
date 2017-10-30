export default (sequelize, DataType) => {
  const Equipments = sequelize.define('Equipments', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
    description: {
      type: DataType.STRING,
      validade: {
        notEmpty: true,
      },
    },
  });

  Equipments.associate = (models) => {
    // N:M -> Creates join table with ProtocolId and EquipmentId
    // Define add/get/set/has Protocols methods in an equipment instance
    // Define add/get/set/has Equipments methods in a protocol instance
    models.Equipments.belongsToMany(models.Protocols, { through: 'ProtocolEquipments' });
    models.Protocols.belongsToMany(models.Equipments, { through: 'ProtocolEquipments' });
  };

  return Equipments;
};
